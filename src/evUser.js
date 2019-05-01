var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

var maxRankingIndex = criteriaDesicion(username[1]);
var selectedOfferInfo = [];
var evUserID = userLoginRegisterContractAddress.getUserID.call(username[1]);
var evUserWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(evUserID)[0];
document.getElementById("field-evUserWalletAddress").innerHTML = evUserWalletAddress;
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
  var cell_buy = row.insertCell(6);

  var matchedUsersOffers = electricVehicleChargingEnergyTradeSystemContractAddress.productInfoStruct.call(maxRankingIndex);
  var userID = userLoginRegisterContractAddress.getUserID(matchedUsersOffers[0]);
  var userQuality = userLoginRegisterContractAddress.getStationQuality(userID);

  var i = 0; //şuan için 1 teklif sunuluyor

  cell_i.innerHTML = i + 1;
  cell_username.innerHTML = matchedUsersOffers[0];
  cell_price.innerHTML = matchedUsersOffers[1];
  cell_distance.innerHTML = matchedUsersOffers[5];
  cell_time.innerHTML = matchedUsersOffers[6];
  cell_quality.innerHTML = userQuality;
  var state = matchedUsersOffers[4];

  selectedOfferInfo.push(matchedUsersOffers);
  cell_buy.innerHTML = "<tr><td><button id='cell_buy" + i + "' type='button' class='btn btn-primary btn-rounded btn-fw' value=" + (i + 1) + " onClick='evUserBuyOffer(value);'>Buy</button></td></tr>";

  if (state == false) {
    document.getElementById("cell_buy" + i).disabled = true;
    document.getElementById("cell_buy" + i).innerHTML = "Not Available";
  }
};

function evUserBuyOffer(i) {

  var table = document.getElementById("table-Recommendation");
  var selectedOfferIndex = electricVehicleChargingEnergyTradeSystemContractAddress.getIndexOffer(
    selectedOfferInfo[i - 1][0],
    selectedOfferInfo[i - 1][1],
    3,
    selectedOfferInfo[i - 1][3],
  );
  /*var evUserID = userLoginRegisterContractAddress.getUserID.call(username[1]);
  evUserWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(evUserID)[0];*/
  var stationID = userLoginRegisterContractAddress.getUserID.call(selectedOfferInfo[i - 1][0]);
  var stationWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(stationID)[0];

  var amount = web3.toWei(selectedOfferInfo[i - 1][1], "ether");
  electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(evUserWalletAddress, username[1], stationWalletAddress, selectedOfferInfo[i - 1][0], amount, { from: web3.eth.accounts[0], gas: 3000000 });
  electricVehicleChargingEnergyTradeSystemContractAddress.setOfferState(selectedOfferIndex, false);

  web3.eth.sendTransaction({ from: evUserWalletAddress, to: stationWalletAddress, value: amount });
  alert('Purchase was completed.');
  document.getElementById("cell_buy" + (i - 1)).disabled = true;
  document.getElementById("cell_buy" + (i - 1)).innerHTML = "Charging..";
}
 
window.onload = function () {

  getUserBalanceInfo();
  getTransactionCount();
  function getUserBalanceInfo() {
    web3.eth.getBalance(evUserWalletAddress, (err, balance) => {
      balance = this.web3.fromWei(balance, "ether") + " ETH"
      document.getElementById("field-getBalance").innerHTML = balance; 
    });
  }
  function getTransactionCount() {
    var numberOfOffers =web3.eth.getTransactionCount(evUserWalletAddress); //electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 4);
    document.getElementById("field-transactionCount").innerHTML = numberOfOffers;
  }

  setInterval(function () { getUserBalanceInfo(); getTransactionCount();  }, 3000);
}
