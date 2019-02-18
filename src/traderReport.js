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
    var myContractLoginRegister =  web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"string"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"},{"name":"_userType","type":"string"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"adminLogStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userType","type":"string"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"string"},{"name":"registerDate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"registeredUserLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"startIndex","type":"uint256"}],"name":"getUserLog","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
    var SContractLoginRegister = myContractLoginRegister.at('0xdbfe19980db15e43bf40e3a6581d6f3b7b39d488');

    var myContractTrade = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"_ownerType","type":"uint256"},{"name":"profitRate","type":"uint256"},{"name":"_state","type":"bool"}],"name":"addOffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_ownerType","type":"uint256"}],"name":"getCurrentUserTransactionLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"getCurrentUserAllTransactions","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getMinEnergyPriceAccordingToOwnerType","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"productInfoStruct","outputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"ownerType","type":"uint256"},{"name":"transactionTime","type":"uint256"},{"name":"state","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"wantedValueofProductInfoStruct","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getAnOwnerLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
    var SContractTrade = myContractTrade.at('0x4458f27b82de528687ed76783c7d4c5cce4db5ac');
    getAllOfferLog();
}
catch (e) {
    console.log(e);
}

function getAllOfferLog() {
    var _userType = 2;
    var length = SContractTrade.getAnOwnerLength(_userType);
    var index = 0;// First starting index is 0
    for (var i = 0; i < length; i++) {
        var result = SContractTrade.wantedValueofProductInfoStruct(index, _userType);//Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("table-allOffersTraderReport");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_name = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_time = row.insertCell(4);
       
        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    
        cell_i.innerHTML = i + 1;//Add Table
        cell_name.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table
        cell_state.innerHTML = result[4];//Add Table
        cell_time.innerHTML = formattedDate;// New index is return value of smart contract function.
        index = result[2];// New index is return value of smart contract function.
    }
};
var tableLenght = 0;
function getEnteredUserOfferLog() {
    for (var i = tableLenght; i >= 1; i--) {
        document.getElementById("table-enteredUserOffersTraderReport").deleteRow(i);
    }
    var _username = document.getElementById("log-Username").value;
    var _userType = 2;
    var length = SContractTrade.getCurrentUserTransactionLength(_username, _userType);
    tableLenght = length;
    var index = 0;// First starting index is 0
    for (var i = 0; i < length; i++) {
        var result = SContractTrade.getCurrentUserAllTransactions(_username, index, _userType);//Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("table-enteredUserOffersTraderReport");
        var row = table.insertRow(i + 1);
        
        var cell_i = row.insertCell(0);
        var cell_name = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_time = row.insertCell(4);
       
        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    
        cell_i.innerHTML = i + 1;//Add Table
        cell_name.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table
        cell_state.innerHTML = result[4];//Add Table
        cell_time.innerHTML = formattedDate;// New index is return value of smart contract function.
        index = result[2];// New index is return value of smart contract function.
    }
}; 

function objectToCsv(data) {
    const csvRows = [];

    //get the header
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(';'));

    // loop over the rows
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(';'));
    }
    return csvRows.join('\n');
}
function download(data, name) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
////////////////////////////////

function getAllOfferLogCSV() {
    var _userType = 2;
    var length = SContractTrade.getAnOwnerLength(_userType);
    var index = 0;// First starting index is 0
    const storage = [];
    storage.push(['#', 'Energy Trader', 'Price', 'State', 'Transaction Time']);

    for (var i = 0; i < length; i++) {
        var result = SContractTrade.wantedValueofProductInfoStruct(index, _userType);//Smart contract function. Find the next Energy Producer.
        index = result[2];// New index is return value of smart contract function.
        //CSV

        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

        storage.push([i + 1, result[0], result[1], result[4], formattedDate]);
    }
    //CSV
    const csvData = objectToCsv(storage);
    download(csvData, "TraderAllOffers.csv");
};