var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];
//document.getElementById("curruser").value =  username[1];
//document.getElementById("curruser").disabled = true;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
//contract ABI
var myContract = web3.eth.contract([{ "constant": false, "inputs": [], "name": "Time_call", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "lengthOfProductInfoStruct", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "moneyExchangeInfoStruct", "outputs": [{ "name": "fromUserWalletAdress", "type": "string" }, { "name": "fromUserName", "type": "string" }, { "name": "toUserWalletAdress", "type": "string" }, { "name": "toUserName", "type": "string" }, { "name": "transactionCost", "type": "uint256" }, { "name": "transactionTime", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "_ownerType", "type": "uint256" }], "name": "getCurrentUserTransactionLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "getCurrentUserAllTransactions", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }, { "name": "transactionTime", "type": "uint256" }, { "name": "state", "type": "bool" }, { "name": "stationQuality", "type": "uint256" }, { "name": "stationDistance", "type": "uint256" }, { "name": "stationExpectedWaitingTime", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_fromUserWalletAdress", "type": "string" }, { "name": "_fromUserName", "type": "string" }, { "name": "_toUserWalletAdress", "type": "string" }, { "name": "_toUserName", "type": "string" }, { "name": "_transactionCost", "type": "uint256" }], "name": "addMoneyExchangeTransaction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "_energyPrice", "type": "uint256" }, { "name": "_profitRate", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "_state", "type": "bool" }, { "name": "_stationQuality", "type": "uint256" }, { "name": "_stationDistance", "type": "uint256" }, { "name": "_stationExpectedWaitingTime", "type": "uint256" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "indexOfOffer", "type": "uint256" }, { "name": "_state", "type": "bool" }], "name": "setOfferState", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lengthOfMoneyExchangeInfoStruct", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
//Contract defination of deployed smart contract with its address.
var SContract = myContract.at('0x4458f27b82de528687ed76783c7d4c5cce4db5ac');

var userLoginRegister = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getLogID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"_socketType","type":"uint256"},{"name":"_chargeType","type":"uint256"},{"name":"_chargeMode","type":"uint256"},{"name":"_stationState","type":"bool"},{"name":"index","type":"uint256"},{"name":"indexj","type":"uint256"}],"name":"getMatchUsers","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getUserCondition","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_socketType","type":"uint256"},{"name":"_chargeType","type":"uint256"},{"name":"_chargeMode","type":"uint256"},{"name":"_stationState","type":"bool"},{"name":"_quality","type":"uint256"}],"name":"setUserConditions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"adminLogStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userType","type":"uint256"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numCriteria","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"uint256"},{"name":"registerDate","type":"uint256"},{"name":"numStationCriteria","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getSelectedUserInformation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_quality","type":"uint256"}],"name":"setStationQuality","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"},{"name":"_userType","type":"uint256"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"startIndex","type":"uint256"}],"name":"getUserLog","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
//Contract defination of smart deployed contract with its address
var userLoginRegisterContract = userLoginRegister.at('0xdbfe19980db15e43bf40e3a6581d6f3b7b39d488');

var userWalletAddress = getWalletAddress(username[1]);
document.getElementById("field-stationWalletAddress").innerHTML = userWalletAddress;

//getMyOfferHistory();
/*web3.eth.defaultAccount = web3.eth.accounts[0];//Default account defination
console.log(web3.eth.defaultAccount); */
getUserBalanceInfo();
getTransactionCount();
getEnteredUserSales();
getEnteredUserPurchases();

var _stationQuality = 0;
var _stationDistance = Math.floor(Math.random() * 101) + 10;;
var _stationExpectedWaitingTime = Math.floor(Math.random() * 101) + 10;

var state = true;
var selectedOfferprofitRate;
var selectedOfferPrice;
var gasUsed = SContract.addOffer.estimateGas(username[1], selectedOfferPrice, 2, selectedOfferprofitRate, state, _stationQuality, _stationDistance, _stationExpectedWaitingTime, { from: web3.eth.accounts[0], gas: 3000000 });
var gasPrice = 4.5; // Average Gwei Amount //Fast --> 25 Gwei  //Cheap --> 4.5 Gwei
var etherPayment = gasUsed * gasPrice / 1000000000;
console.log(etherPayment);
document.getElementById("text-gasUsage").innerHTML = "For Each Operation Estimated Ether Usage: " + etherPayment + " ETH ";

function setCondition() {
    var socketTypeField = document.getElementById("field-socketType");
    var chargeTypeField = document.getElementById("field-chargeType");
    var chargeModeField = document.getElementById("field-chargeMode");
    var socketType = socketTypeField.options[socketTypeField.selectedIndex].value;
    var chargeType = chargeTypeField.options[chargeTypeField.selectedIndex].value;
    var chargeMode = chargeModeField.options[chargeModeField.selectedIndex].value;
    
    var userID = userLoginRegisterContract.getUserID(username[1]); 
    userLoginRegisterContract.setUserConditions(userID, socketType, chargeType, chargeMode, true, 0, { from: web3.eth.accounts[0], gas: 3000000 });
} 

/* Use getMinEnergyPriceAccordingToOwnerType funtion of smart contract to get best value of all
offers. In this page ownerType parametre is o. Because, Stations need Energy Trader's offers. */
SContract.getMinEnergyPriceAccordingToOwnerType(2, function (error, result) {
    if (!error) {
        $("#station").html('Best Price is ' + result[1] + 'ETH. from ' + result[0]);//Give output to user.
        getTraderOffers();
        console.log(result);
    } else
        console.error(error);
});

function getWalletAddress(_userName) {
    var length = userLoginRegisterContract.registeredUserLength.call();
    let walletAddres;
    for (let i = 0; i < length; i++) {
        var result = userLoginRegisterContract.userInfoStruct(i);
        if (result[1] === _userName) {
            walletAddres = result[0]
        }
    }
    return walletAddres;
}
function getTransactionCount() {
    var numberOfOffers = SContract.getCurrentUserTransactionLength(username[1], 3);
    document.getElementById("field-stationCount").innerHTML = numberOfOffers;
}

function getUserBalanceInfo() {
    web3.eth.getBalance(userWalletAddress, (err, balance) => {
        balance = this.web3.fromWei(balance, "ether") + " ETH"
        document.getElementById("field-stationGetBalance").innerHTML = balance;
        console.log(balance);
    });
}

function getTraderOffers() {
    var length = SContract.getAnOwnerLength(2);
    var i;
    var index = 0;// First starting index is 0
    for (i = 0; i < length; i++) {
        var result = SContract.wantedValueofProductInfoStruct(index, 2);//Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("table-TraderOffers");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_username = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_input = row.insertCell(4);
        var cell_button = row.insertCell(5);

        cell_i.innerHTML = i + 1;//Add Table
        cell_username.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table

        if (result[4] == true)
            cell_state.innerHTML = "Available";//Add Table
        else if (result[4] == false)
            cell_state.innerHTML = "Not Available";

        cell_input.innerHTML = "<tr><td><input class='form-control' placeholder='Enter profit rate' type='number' id='cell_profitRate" + (i + 1) + "'></input></td></tr>";
        cell_button.innerHTML = "<tr><td><button id='cell_setPrice" + i + "' type='button' class='btn btn-primary btn-rounded btn-fw' value=" + (i + 1) + " onClick='gridSetPrice(value);'>Set Price</button></td></tr>";
        //console.log("<tr><td><button id='cell_setPrice" + i + "' type='button' class='btn btn-primary btn-rounded btn-fw' value=" + i + " onClick='gridSetPrice(value);'>Set Price</button></td></tr>");
        index = result[2];// New index is return value of smart contract function.
        /*
        $("#cell_setPrice" + i).click(function(){
            cell_button.innerHTML ="<button type='button' class='btn btn-success btn-rounded btn-fw'>Success</button>"
        });*/
    }
};

function gridSetPrice(i) {
    var table = document.getElementById("table-TraderOffers");
    selectedOfferprofitRate = $("#cell_profitRate" + i).val();
    selectedOfferPrice = table.rows[i].cells[2].innerHTML;
    SContract.addOffer(username[1], selectedOfferPrice, 2, selectedOfferprofitRate, state, _stationQuality, _stationDistance, _stationExpectedWaitingTime, _stationQuality, _stationDistance, _stationExpectedWaitingTime, { from: web3.eth.accounts[0], gas: 3000000 });
    getUserBalanceInfo();
    getTransactionCount();
    getMyOfferHistory();
}

var tableLenght;
function getMyOfferHistory() {
    for (var i = tableLenght; i >= 1; i--) {
        document.getElementById("table-StationOfferHistory").deleteRow(i);
    }
    var numberOfOffers = SContract.getCurrentUserTransactionLength(username[1], 2);// Get how many offers of Grid Operators.
    tableLenght = numberOfOffers;
    var i;
    var index = 0;// First starting index is 0
    for (i = 0; i < numberOfOffers; i++) {
        var result = SContract.getCurrentUserAllTransactions(username[1], index, 2);//Smart contract function. Find the next Grid operator.
        var table = document.getElementById("table-StationOfferHistory");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_username = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_transactionTime = row.insertCell(4);

        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

        cell_i.innerHTML = i + 1;//Add Table
        cell_username.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table
        cell_transactionTime.innerHTML = formattedDate;
        if (result[4] == true)
            cell_state.innerHTML = "Available";//Add Table
        else if (result[4] == false)
            cell_state.innerHTML = "Not Available";

        index = result[2];// New index is return value of smart function.
    }
}

var tblLenght;
function getEnteredUserSales() {
    for (var i = tblLenght; i >= 1; i--) {
        document.getElementById("table-enteredUserSalesInfo").deleteRow(i);
    }
    var length = SContract.lengthOfMoneyExchangeInfoStruct.call();
    tblLenght = length;
    var _username = username[1];
    var index = 0;
    for (var i = 0; i < length; i++) {
        var result = SContract.moneyExchangeInfoStruct(i);

        var table = document.getElementById("table-enteredUserSalesInfo");
        var row = table.insertRow(i + 1);

        if (result[3] == _username) {
            index++;
            var cell_i = row.insertCell(0);
            var cell_from = row.insertCell(1);
            var cell_to = row.insertCell(2);
            var cell_cost = row.insertCell(3);
            var cell_time = row.insertCell(4);

            var date = new Date(result[5] * 1000);
            var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

            cell_i.innerHTML = index;//Add Table
            cell_from.innerHTML = result[1];//Add Table
            cell_to.innerHTML = result[3];//Add Table
            cell_cost.innerHTML = result[4] / 1000000000000000000;// wei to ETH
            cell_time.innerHTML = formattedDate;//Add Table
        }
    }
}

var tbLenght;
function getEnteredUserPurchases() {
    for (var i = tbLenght; i >= 1; i--) {
        document.getElementById("table-enteredUserPurchasesInfo").deleteRow(i);
    }
    var length = SContract.lengthOfMoneyExchangeInfoStruct.call();
    tbLenght = length;
    var _username = username[1];
    var index = 0;
    for (var i = 0; i < length; i++) {
        var result = SContract.moneyExchangeInfoStruct(i);

        var table = document.getElementById("table-enteredUserPurchasesInfo");
        var row = table.insertRow(i + 1);

        if (result[1] == _username) {
            index++;
            var cell_i = row.insertCell(0);
            var cell_from = row.insertCell(1);
            var cell_to = row.insertCell(2);
            var cell_cost = row.insertCell(3);
            var cell_time = row.insertCell(4);

            var date = new Date(result[5] * 1000);
            var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

            cell_i.innerHTML = index;//Add Table
            cell_from.innerHTML = result[1];//Add Table
            cell_to.innerHTML = result[3];//Add Table
            cell_cost.innerHTML = result[4] / 1000000000000000000;// wei to ETH
            cell_time.innerHTML = formattedDate;//Add Table
        }
    }
}

