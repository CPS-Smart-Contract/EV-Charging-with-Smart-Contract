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

    var myContractTrade = web3.eth.contract([{ "constant": false, "inputs": [], "name": "Time_call", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "profitRate", "type": "uint256" }, { "name": "_state", "type": "bool" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "lengthOfProductInfoStruct", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "moneyExchangeInfoStruct", "outputs": [{ "name": "fromUserWalletAdress", "type": "string" }, { "name": "fromUserName", "type": "string" }, { "name": "toUserWalletAdress", "type": "string" }, { "name": "toUserName", "type": "string" }, { "name": "transactionCost", "type": "uint256" }, { "name": "transactionTime", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "_ownerType", "type": "uint256" }], "name": "getCurrentUserTransactionLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "getCurrentUserAllTransactions", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }, { "name": "transactionTime", "type": "uint256" }, { "name": "state", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_fromUserWalletAdress", "type": "string" }, { "name": "_fromUserName", "type": "string" }, { "name": "_toUserWalletAdress", "type": "string" }, { "name": "_toUserName", "type": "string" }, { "name": "_transactionCost", "type": "uint256" }], "name": "addMoneyExchangeTransaction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "indexOfOffer", "type": "uint256" }, { "name": "_state", "type": "bool" }], "name": "setOfferState", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lengthOfMoneyExchangeInfoStruct", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
    var SContractTrade = myContractTrade.at('0x4458f27b82de528687ed76783c7d4c5cce4db5ac');

    getAllMoneyExchange(); 
}
catch (e) {
    console.log(e);
}

function getAllMoneyExchange() {

    var length = SContractTrade.lengthOfMoneyExchangeInfoStruct.call();

    for (var i = 0; i < length; i++) {

        var result = SContractTrade.moneyExchangeInfoStruct(i);
        var table = document.getElementById("table-allMoneyExchangeReport");
        var row = table.insertRow(i + 1);

        var cell_i=row.insertCell(0);
        var cell_from= row.insertCell(1);
        var cell_to = row.insertCell(2);
        var cell_cost = row.insertCell(3);
        var cell_time = row.insertCell(4);

        var date = new Date(result[5] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    

        cell_i.innerHTML = i + 1;//Add Table
        cell_from.innerHTML = result[1];//Add Table
        cell_to.innerHTML = result[3];//Add Table
        cell_cost.innerHTML = result[4]/1000000000000000000;// wei to ETH
        cell_time.innerHTML = formattedDate;//Add Table
    
        //fromwallet-> result[0]
        //towallet -> result[2]
    }
}
////////////////////////////////
function getAllMoneyExchange() {

    var length = SContractTrade.lengthOfMoneyExchangeInfoStruct.call();

    for (var i = 0; i < length; i++) {

        var result = SContractTrade.moneyExchangeInfoStruct(i);
        var table = document.getElementById("table-allMoneyExchangeReport");
        var row = table.insertRow(i + 1);

        var cell_i=row.insertCell(0);
        var cell_from= row.insertCell(1);
        var cell_to = row.insertCell(2);
        var cell_cost = row.insertCell(3);
        var cell_time = row.insertCell(4);

        var date = new Date(result[5] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    

        cell_i.innerHTML = i + 1;//Add Table
        cell_from.innerHTML = result[1];//Add Table
        cell_to.innerHTML = result[3];//Add Table
        cell_cost.innerHTML = result[4]/1000000000000000000;// wei to ETH
        cell_time.innerHTML = formattedDate;//Add Table
    
        //fromwallet-> result[0]
        //towallet -> result[2]
    }
}
///////////////////////////////
var tableLenght;
function getEnteredUserMoneyExchange(){
    for (var i = tableLenght; i >= 1; i--) {
        document.getElementById("table-enteredUserMoneyExchangeReport").deleteRow(i);
    }
    var length = SContractTrade.lengthOfMoneyExchangeInfoStruct.call();
    tableLenght = length;
    var _username = document.getElementById("log-Username").value;
    var index=0;
    for (var i = 0; i < length; i++) {
        var result = SContractTrade.moneyExchangeInfoStruct(i);

        var table = document.getElementById("table-enteredUserMoneyExchangeReport");
        var row = table.insertRow(i + 1);

        if(result[1]==_username ||result[3]==_username){
            index++;
            var cell_i=row.insertCell(0);
            var cell_from= row.insertCell(1);
            var cell_to = row.insertCell(2);
            var cell_cost = row.insertCell(3);
            var cell_time = row.insertCell(4);
    
            var date = new Date(result[5] * 1000);
            var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        
    
            cell_i.innerHTML =index;//Add Table
            cell_from.innerHTML = result[1];//Add Table
            cell_to.innerHTML = result[3];//Add Table
            cell_cost.innerHTML = result[4]/1000000000000000000;// wei to ETH
            cell_time.innerHTML = formattedDate;//Add Table
        }
    }
}