
var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

try {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
  }
  // Default account defination
  web3.eth.defaultAccount = web3.eth.accounts[0];
  // Initialize contract with its ABI
  var myContractLoginRegister = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getLogID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_socketType","type":"uint256"},{"name":"_chargeType","type":"uint256"},{"name":"_chargeMode","type":"uint256"},{"name":"_stationState","type":"bool"},{"name":"_quality","type":"uint256"}],"name":"setUserConditions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"adminLogStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userType","type":"uint256"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"_socketType","type":"uint256"},{"name":"_chargeType","type":"uint256"},{"name":"_chargeMode","type":"uint256"},{"name":"_stationState","type":"bool"},{"name":"index","type":"uint256"}],"name":"getMatchUsers","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numCriteria","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"uint256"},{"name":"registerDate","type":"uint256"},{"name":"numStationCriteria","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getSelectedUserInformation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_quality","type":"uint256"}],"name":"setStationQuality","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"},{"name":"_userType","type":"uint256"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"startIndex","type":"uint256"}],"name":"getUserLog","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
  var SContractLoginRegister = myContractLoginRegister.at('0xdbfe19980db15e43bf40e3a6581d6f3b7b39d488');
  getLog();
  var myContractTrade = web3.eth.contract([{ "constant": false, "inputs": [], "name": "Time_call", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "lengthOfProductInfoStruct", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "moneyExchangeInfoStruct", "outputs": [{ "name": "fromUserWalletAdress", "type": "string" }, { "name": "fromUserName", "type": "string" }, { "name": "toUserWalletAdress", "type": "string" }, { "name": "toUserName", "type": "string" }, { "name": "transactionCost", "type": "uint256" }, { "name": "transactionTime", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "_ownerType", "type": "uint256" }], "name": "getCurrentUserTransactionLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "getCurrentUserAllTransactions", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }, { "name": "transactionTime", "type": "uint256" }, { "name": "state", "type": "bool" }, { "name": "stationQuality", "type": "uint256" }, { "name": "stationDistance", "type": "uint256" }, { "name": "stationExpectedWaitingTime", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_fromUserWalletAdress", "type": "string" }, { "name": "_fromUserName", "type": "string" }, { "name": "_toUserWalletAdress", "type": "string" }, { "name": "_toUserName", "type": "string" }, { "name": "_transactionCost", "type": "uint256" }], "name": "addMoneyExchangeTransaction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "_energyPrice", "type": "uint256" }, { "name": "_profitRate", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "_state", "type": "bool" }, { "name": "_stationQuality", "type": "uint256" }, { "name": "_stationDistance", "type": "uint256" }, { "name": "_stationExpectedWaitingTime", "type": "uint256" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "indexOfOffer", "type": "uint256" }, { "name": "_state", "type": "bool" }], "name": "setOfferState", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lengthOfMoneyExchangeInfoStruct", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
  var SContractTrade = myContractTrade.at('0x4458f27b82de528687ed76783c7d4c5cce4db5ac');
}
catch (e) {
  console.log(e);
}
prometheeMethod();

function prometheeMethod() {

  var userID = SContractLoginRegister.getUserID(username[1]);



  var userConditionsLength = SContractLoginRegister.numCriteria.call();
  var i;
  var ind = 0;
  var stationInfo = [];
  for (i = 0; i < userConditionsLength; i++) {
    var resultCurrentUser = SContractLoginRegister.getSelectedUserInformation(userID,ind);
    ind = resultCurrentUser[6];
    ind++;
    
  } 



  console.log(resultCurrentUser[0] + " " + resultCurrentUser[1] + "  " + resultCurrentUser[2] + "  " + resultCurrentUser[3] + "  " + resultCurrentUser[4]);

  var length = SContractLoginRegister.registeredUserLength.call();
  var i;
  var index = 0;
  var stationInfo = [];
  for (i = 0; i < length; i++) {
    var resultMatch = SContractLoginRegister.getMatchUsers(resultCurrentUser[0], resultCurrentUser[1], resultCurrentUser[2], resultCurrentUser[3], index);//Smart contract function. Find the next Grid operator. 

    if (resultMatch[0] == "")
      break;

    console.log(resultMatch[0]); //station name
    console.log(resultMatch[1]); //station quality
    console.log(resultMatch[2]); //station struct index
    index = resultMatch[2];
    index++;

    var resultStationTransactions = SContract.getCurrentUserAllTransactions(username[1], index, 1);

    //stationInfo.push(resultMatch);  
    // console.log(stationInfo);
  }









}

