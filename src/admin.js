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
  var myContractLoginRegister = web3.eth.contract([{ "constant": false, "inputs": [], "name": "Time_call", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_userName", "type": "string" }, { "name": "_userPassworde", "type": "string" }], "name": "checkUserLogin", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "bool" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_userWalletAdress", "type": "string" }, { "name": "_userName", "type": "string" }, { "name": "_userPassworde", "type": "string" }, { "name": "_userType", "type": "string" }], "name": "userRegister", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userName", "type": "string" }], "name": "getUserLogLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "adminLogLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "adminLogStruct", "outputs": [{ "name": "userWalletAdress", "type": "string" }, { "name": "userName", "type": "string" }, { "name": "userType", "type": "string" }, { "name": "time", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "userInfoStruct", "outputs": [{ "name": "userWalletAdress", "type": "string" }, { "name": "userName", "type": "string" }, { "name": "userPassword", "type": "string" }, { "name": "userType", "type": "string" }, { "name": "registerDate", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "registeredUserLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userName", "type": "string" }, { "name": "startIndex", "type": "uint256" }], "name": "getUserLog", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
  var SContractLoginRegister = myContractLoginRegister.at('0xdbfe19980db15e43bf40e3a6581d6f3b7b39d488');
  getLog();
  var myContractTrade = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lengthOfProductInfoStruct","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"moneyExchangeInfoStruct","outputs":[{"name":"fromUserWalletAdress","type":"string"},{"name":"fromUserName","type":"string"},{"name":"toUserWalletAdress","type":"string"},{"name":"toUserName","type":"string"},{"name":"transactionCost","type":"uint256"},{"name":"transactionTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_ownerType","type":"uint256"}],"name":"getCurrentUserTransactionLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"getCurrentUserAllTransactions","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getMinEnergyPriceAccordingToOwnerType","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"productInfoStruct","outputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"ownerType","type":"uint256"},{"name":"transactionTime","type":"uint256"},{"name":"state","type":"bool"},{"name":"stationQuality","type":"uint256"},{"name":"stationDistance","type":"uint256"},{"name":"stationExpectedWaitingTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromUserWalletAdress","type":"string"},{"name":"_fromUserName","type":"string"},{"name":"_toUserWalletAdress","type":"string"},{"name":"_toUserName","type":"string"},{"name":"_transactionCost","type":"uint256"}],"name":"addMoneyExchangeTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_energyPrice","type":"uint256"},{"name":"_profitRate","type":"uint256"},{"name":"_ownerType","type":"uint256"},{"name":"_state","type":"bool"},{"name":"_stationQuality","type":"uint256"},{"name":"_stationDistance","type":"uint256"},{"name":"_stationExpectedWaitingTime","type":"uint256"}],"name":"addOffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"wantedValueofProductInfoStruct","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"indexOfOffer","type":"uint256"},{"name":"_state","type":"bool"}],"name":"setOfferState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getAnOwnerLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lengthOfMoneyExchangeInfoStruct","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
  var SContractTrade = myContractTrade.at('0x4458f27b82de528687ed76783c7d4c5cce4db5ac');
}
catch (e) {
  console.log(e);
}

//getEachUserTypeCount();
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
window.onload = function () { 

  var chart = new CanvasJS.Chart("chartContainer", {
    theme:"light2",
    title: {
      text: "User Count of Each Type"
    },

    axisY: {
      title: "User Count",
      suffix: ""
    },
    data: [{
      type: "column",
      yValueFormatString: "#,###",
      indexLabel: "{y}",
      dataPoints: [
        { label: "Producer", y: 0 },
        { label: "Grid Operator", y: 0 },
        { label: "Trader", y: 0 },
        { label: "Station", y: 0 }
      ]
    }]
  });

  function updateChart() {
    var boilerColor, deltaY, yVal;
    var dps = chart.options.data[0].dataPoints;
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
    //for (var i = 0; i < dps.length; i++) {
      //deltaY = Math.round(2 + Math.random() * (-2 - 2));
      //yVal = deltaY + dps[i].y > 0 ? dps[i].y + deltaY : 0;
      //boilerColor = yVal > 200 ? "#FF2500" : yVal >= 170 ? "#FF6000" : yVal < 170 ? "#6B8E23 " : null;
      //dps[i] = {label: "Boiler "+(i+1) , y: yVal, color: boilerColor};
      dps[0].y = producerLength;
      dps[1].y = gridOpLength;
      dps[2].y = traderLength;
      dps[3].y = stationLength;

    //}
    chart.options.data[0].dataPoints = dps;
    chart.render();
  };
  updateChart();
  //setInterval(function () { updateChart() }, 5000);
}