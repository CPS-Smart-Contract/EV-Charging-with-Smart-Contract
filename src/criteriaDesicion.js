var userID = userLoginRegisterContractAddress.getUserID(username[1]);
var length = userLoginRegisterContractAddress.getMatchUsersCounts(userID);
//console.log(length);
var matchedUsers = [];

var index = 0; // First starting index is 0
for (var i = 0; i < length; i++) {
  var resultMatchUsers = userLoginRegisterContractAddress.getMatchUsers(userID, index, { from: web3.eth.accounts[0], gas: 3000000 });
  index = resultMatchUsers[2];
  matchedUsers.push(resultMatchUsers);
}
var matchOfferIndex;
var matchedUsersOffers = [];
var sortPrice = [];
var sortDistance = [];
var sortTime = [];
var sortQuality = [];
var jIndex = 0;

for (var i = 0; i < matchedUsers.length; i++) {

  matchOfferIndex = 0;
  for (var j = 0; ; j++) {
    var resultMatchOffer = electricVehicleChargingEnergyTradeSystemContractAddress.getMatchOffer(matchedUsers[i][0], matchedUsers[i][3], matchOfferIndex);
    if (resultMatchOffer[4] == false) {
      break;
    }
    matchedUsersOffers.push(resultMatchOffer);
    matchedUsersOffers[jIndex].push(matchedUsers[i][1]);
    matchedUsersOffers[jIndex].push(matchedUsers[i][0]);

    sortPrice.push(resultMatchOffer[0]);
    sortDistance.push(resultMatchOffer[1]);
    sortTime.push(resultMatchOffer[2]);
    sortQuality.push(resultMatchOffer[5]);
    jIndex++;
    matchOfferIndex = resultMatchOffer[3];
  }
}
console.log(matchedUsersOffers);

sortPrice = sortPrice.sort();
sortDistance = sortDistance.sort();
sortTime = sortTime.sort();
sortQuality = sortQuality.sort();

//STEP 1: Normalize the Evaluation Matrix (Decision Matrix)
/*
    Price -> Non-beneficial criteria
    Distance -> Non-beneficial criteria
    Time -> Non-beneficial criteria
    Quality -> Beneficial criteria
*/
var maxPrice = Math.max.apply(null, sortPrice);
var minPrice = Math.min.apply(null, sortPrice);

var maxDistance = Math.max.apply(null, sortDistance);
var minDistance = Math.min.apply(null, sortDistance);

var maxTime = Math.max.apply(null, sortTime);
var minTime = Math.min.apply(null, sortTime);

var maxQuality = Math.max.apply(null, sortQuality);
var minQuality = Math.min.apply(null, sortQuality);

var decisionPrice = 0, decisionDistance = 0, decisionTime = 0, decisionQuality = 0;
var decisionMatrix = [];
for (var i = 0; i < matchedUsersOffers.length; i++) {

  if (maxPrice == minPrice)
    decisionPrice = ((maxPrice - matchedUsersOffers[i][0]) / (0.000001));
  else
    decisionPrice = ((maxPrice - matchedUsersOffers[i][0]) / (maxPrice - minPrice));

  if (maxDistance == minDistance)
    decisionDistance = ((maxDistance - matchedUsersOffers[i][1]) / (0.000001));
  else
    decisionDistance = ((maxDistance - matchedUsersOffers[i][1]) / (maxDistance - minDistance));

  if (maxTime == minTime)
    decisionTime = ((maxTime - matchedUsersOffers[i][2]) / (0.000001));
  else
    decisionTime = ((maxTime - matchedUsersOffers[i][2]) / (maxTime - minTime));

  if (maxQuality == minQuality)
    decisionQuality = ((matchedUsersOffers[i][5] - minQuality) / (0.000001));
  else
    decisionQuality = ((matchedUsersOffers[i][5] - minQuality) / (maxQuality - minQuality));

  decisionMatrix.push([decisionPrice, decisionDistance, decisionTime, decisionQuality]);
}

//STEP 2: Calculate the evaluative differences of i. alternative with respect to other alternatives.
var tmp = [];
var differencesMatrix = [];
var columnSize = 4; //Distance, Quality, Price, Time

for (var i = 0; i < matchedUsersOffers.length; i++) {
  for (var j = 0; j < matchedUsersOffers.length; j++) {
    for (var k = 0; k < columnSize; k++) {

      if (i == j)
        break;
      else {
        console.log(i + "-" + j);
        tmp.push(decisionMatrix[i][k] - decisionMatrix[j][k]);
        if (k == 3) {
          differencesMatrix.push(tmp);
        }
      }
    }
    tmp = [];
  }
}

//STEP 3: Calculate the preference function P(a,b)
/*
    P(a,b)=0 if R_aj=<R_bj
    P(a,b)=(R_aj-R_bj) if R_aj>R_bj
*/
for (var i = 0; i < differencesMatrix.length; i++) {
  for (var j = 0; j < columnSize; j++) {
    if (differencesMatrix[i][j] <= 0)
      differencesMatrix[i][j] = 0
  }
}

//STEP 4: Calculate the aggregated preference.
var weightPrice = 0.2, weightDistance = 0.4, weightTime = 0.3, weightQuality = 0.1;
for (var i = 0; i < differencesMatrix.length; i++) {
  differencesMatrix[i][0] *= weightPrice;
  differencesMatrix[i][1] *= weightDistance;
  differencesMatrix[i][2] *= weightTime;
  differencesMatrix[i][3] *= weightQuality;
}

var aggregatedMatrix = new Array(matchedUsersOffers.length);
for (i = 0; i < matchedUsersOffers.length; i++) {
  aggregatedMatrix[i] = new Array(matchedUsersOffers.length);
  for (j = 0; j < matchedUsersOffers.length; j++) {
    aggregatedMatrix[i][j] = 0;
  }
}

var sumRow = 0;
var index = 0;
for (var i = 0; i < matchedUsersOffers.length; i++) {
  for (var j = 0; j < matchedUsersOffers.length; j++) {
    for (var k = 0; k < columnSize; k++) {
      if (index == differencesMatrix.length)
        break;
      sumRow += differencesMatrix[index][k];
      if (i == j) {
        break;
      }
      if (k == columnSize - 1) {
        aggregatedMatrix[i][j] = sumRow;
        index++;
      }
    }
    sumRow = 0;
  }
}

//STEP 5: Determine the leaving and entering outranking flows.
var sumRowAgg = 0, sumColumnAgg = 0;
var sumRowArray = [];
var sumColumnArray = [];
for (var i = 0; i < matchedUsersOffers.length; i++) {
  for (var k = 0; k < matchedUsersOffers.length; k++) {
    sumRowAgg += aggregatedMatrix[i][k];
    sumColumnAgg += aggregatedMatrix[k][i];
    if (k == matchedUsersOffers.length - 1) {
      sumRowArray.push(sumRowAgg / (matchedUsersOffers.length - 1));
      sumColumnArray.push(sumColumnAgg / (matchedUsersOffers.length - 1));
    }
  }
  sumRowAgg = 0;
  sumColumnAgg = 0;
}

//STEP 6: Calculate the net outranking for each alternative.
var outrankingArray = [];
for (var i = 0; i < matchedUsersOffers.length; i++) {
  outrankingArray.push(sumRowArray[i] - sumColumnArray[i]);
}

//STEP 7: Determining the ranking of all considered alternatives depending on the values of P(a).
var maxRanking = 0;
var maxRankingIndex = 0;

for (var i = 0; i < outrankingArray.length; i++) {
  if (maxRanking < outrankingArray[i]) {
    maxRanking = outrankingArray[i];
    maxRankingIndex = i;
  }
}
getRecommendationOffers(maxRankingIndex);

//console.log(matchedUsersOffers[maxRankingIndex]); 
function getRecommendationOffers(maxRankingIndex) {

  var table = document.getElementById("table-Recommendation");
  var row = table.insertRow(1);

  var cell_i = row.insertCell(0);
  var cell_username = row.insertCell(1);
  var cell_price = row.insertCell(2);
  var cell_distance = row.insertCell(3);
  var cell_time = row.insertCell(4);
  var cell_quality = row.insertCell(5);

  cell_i.innerHTML = 1;
  cell_username.innerHTML = matchedUsersOffers[maxRankingIndex][6];
  cell_price.innerHTML = matchedUsersOffers[maxRankingIndex][0];
  cell_distance.innerHTML = matchedUsersOffers[maxRankingIndex][1];
  cell_time.innerHTML = matchedUsersOffers[maxRankingIndex][2];
  cell_quality.innerHTML = matchedUsersOffers[maxRankingIndex][5];
};

