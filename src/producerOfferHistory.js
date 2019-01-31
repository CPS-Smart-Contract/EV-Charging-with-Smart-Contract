var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];//Default account defination
console.log(web3.eth.defaultAccount);

//Initialize contract with its ABI
var myContract = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "_ownerType", "type": "uint256" }], "name": "getCurrentUserTransactionLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "getCurrentUserAllTransactions", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "profitRate", "type": "uint256" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
var SContract = myContract.at('0xe427e5f200725d21e7c9ff03514a5ca1cf8c8709');
getExpenditure(); 

function getExpenditure() {
    var numberOfOffers = SContract.getCurrentUserTransactionLength(username[1], 0);// Get how many offers of Grid Operators.
    var i;
    var index = 0;// First starting index is 0
    for (i = 0; i < numberOfOffers; i++) {
        var result = SContract.getCurrentUserAllTransactions(username[1], index, 0);//Smart contract function. Find the next Grid operator.
        var table = document.getElementById("table-Expenditure");
        var row = table.insertRow(i+1);

        var cell_i = row.insertCell(0);
        var cell_username = row.insertCell(1);
        var cell_price = row.insertCell(2);

        cell_i.innerHTML = i+1;//Add Table
        cell_username.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table
        index = result[2];// New index is return value of smart function.
    }
};