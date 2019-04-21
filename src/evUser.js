var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

var maxRankingIndex = criteriaDesicion(username[1]);
getRecommendationOffers(maxRankingIndex);

function getRecommendationOffers(maxRankingIndex) {

  var table = document.getElementById("table-Recommendation");
  var row = table.insertRow(1);

  var cell_i = row.insertCell(0);
  var cell_username = row.insertCell(1);
  var cell_price = row.insertCell(2);
  var cell_distance = row.insertCell(3);
  var cell_time = row.insertCell(4);
  var cell_quality = row.insertCell(5);


  var matchedUsersOffers = electricVehicleChargingEnergyTradeSystemContractAddress.productInfoStruct.call(maxRankingIndex);
  var userID=userLoginRegisterContractAddress.getUserID(matchedUsersOffers[0]);
  var userQuality=userLoginRegisterContractAddress.getStationQuality(userID);

  cell_i.innerHTML = 1;
  cell_username.innerHTML = matchedUsersOffers[0];
  cell_price.innerHTML = matchedUsersOffers[1];
  cell_distance.innerHTML = matchedUsersOffers[5];
  cell_time.innerHTML = matchedUsersOffers[6];
  cell_quality.innerHTML = userQuality;
  console.log(matchedUsersOffers);
};
function getTransactionCount() {
  var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 0);
  document.getElementById("field-evUserCount").innerHTML = numberOfOffers;
} 