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
  var myContractLoginRegister = web3.eth.contract([{ "constant": false, "inputs": [], "name": "Time_call", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_userName", "type": "string" }, { "name": "_userPassworde", "type": "string" }], "name": "checkUserLogin", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_userWalletAdress", "type": "string" }, { "name": "_userName", "type": "string" }, { "name": "_userPassworde", "type": "string" }, { "name": "_userType", "type": "string" }], "name": "userRegister", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userName", "type": "string" }], "name": "getUserLogLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "adminLogLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "adminLogStruct", "outputs": [{ "name": "userWalletAdress", "type": "string" }, { "name": "userName", "type": "string" }, { "name": "userType", "type": "string" }, { "name": "time", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "userInfoStruct", "outputs": [{ "name": "userWalletAdress", "type": "string" }, { "name": "userName", "type": "string" }, { "name": "userPassword", "type": "string" }, { "name": "userType", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "registeredUserLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userName", "type": "string" }, { "name": "startIndex", "type": "uint256" }], "name": "getUserLog", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
  var SContractLoginRegister = myContractLoginRegister.at('0xd2b46e98427fc3250042238cd4c5ba85d0e094d5');
  getLog();
  var myContractTrade = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "_ownerType", "type": "uint256" }], "name": "getCurrentUserTransactionLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "getCurrentUserAllTransactions", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "profitRate", "type": "uint256" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
  var SContractTrade = myContractTrade.at('0xa140c7acb24b40669ab1fd6e1336e8e7e9323b65');
}
catch (e) {
  console.log(e);
}

getEachUserTypeCount();
function getLog() {
  var username = "undefined";
  var numberOfLog = SContractLoginRegister.getUserLogLength(username);
  var i;
  var index = 0;// First starting index is 0
  var ii = numberOfLog;
  for (i = numberOfLog - 1; i > 0; i++) {
    var result = SContractLoginRegister.getUserLog(username, index);//Smart contract function. Find the next Grid operator.
    var table = document.getElementById("table-userLastLogin");
    var row = table.insertRow(1);

    var cell_i = row.insertCell(0);
    var cell_wallet = row.insertCell(1);
    var cell_userName = row.insertCell(2);
    var cell_userType = row.insertCell(3);
    var cell_time = row.insertCell(4);
    var date = new Date(result[3] * 1000);
    var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

    cell_i.innerHTML = ii;//Add Table
    cell_wallet.innerHTML = result[0];//Add Table
    cell_userName.innerHTML = result[1];//Add Table
    cell_userType.innerHTML = result[2];//Add Table
    cell_time.innerHTML = formattedDate;//Add Table
    index = result[4];// New index is return value of smart function.
    ii--;
  }
};
function getEachUserTypeCount() {
  var lengthOfUsers = SContractLoginRegister.registeredUserLength.call();
  var producerLength = 0;
  var gridOpLength = 0;
  var traderLength = 0;
  var stationLength = 0;
  for (var i = 0; i < lengthOfUsers; i++) {
    var result = SContractLoginRegister.userInfoStruct(i);
    if (result[3] == "EnergyProducer") producerLength++;
    else if (result[3] == "EnergyGridOperator") gridOpLength++;
    else if (result[3] == "EnergyTrader") traderLength++;
    else if (result[3] == "EnergyStation") stationLength++;
  }
  document.getElementById("field-usersProducerCount").innerHTML = producerLength;
  document.getElementById("field-usersGridOpCount").innerHTML = gridOpLength;
  document.getElementById("field-usersTraderCount").innerHTML = traderLength;
  document.getElementById("field-usersStationCount").innerHTML = stationLength;
} 
