var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
//document.getElementById("tname").value = username[1];
//document.getElementById("tname").disabled = true;
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
// Default account defination 

web3.eth.defaultAccount = web3.eth.accounts[0];//Default account defination
console.log(web3.eth.defaultAccount);
document.getElementById("field-traderWalletAddress").innerHTML = web3.eth.defaultAccount;

// Initialize contract with its ABI
var myContract = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "_ownerType", "type": "uint256" }], "name": "getCurrentUserTransactionLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerName", "type": "string" }, { "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "getCurrentUserAllTransactions", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "profitRate", "type": "uint256" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
//Contract defination of smart deployed contract with its addres
var SContract = myContract.at('0xe427e5f200725d21e7c9ff03514a5ca1cf8c8709');
var selectedOfferprofitRate;
var selectedOfferPrice;

getUserBalanceInfo();
getMyOfferHistory();
getTransactionCount();

var gasUsed = SContract.addOffer.estimateGas(username[1], selectedOfferPrice, 2, selectedOfferprofitRate, { from: web3.eth.accounts[0], gas: 3000000 });
var gasPrice = 4.5; // Average Gwei Amount //Fast --> 25 Gwei  //Cheap --> 4.5 Gwei
var etherPayment = gasUsed * gasPrice / 1000000000;
console.log(etherPayment);
document.getElementById("text-gasUsage").innerHTML = "For Each Operation Estimated Ether Usage: "+ etherPayment +" ETH ";

/* Use getMinEnergyPriceAccordingToOwnerType funtion of smart contract to get best value of all
offers. In this page ownerType parametre is 1. Because, Traders need Grid operators's offers. */
SContract.getMinEnergyPriceAccordingToOwnerType(1, function (error, result) {
    if (!error) {
        $("#station").html('Best Price is ' + result[1] + '$. from ' + result[0]);//Give output to user.
        // This javascript function is to create a table and show all offers.
        getGridOffers();
        console.log(result);
    }
    else
        console.error(error);
});


function getTransactionCount() {
    var numberOfOffers = SContract.getCurrentUserTransactionLength(username[1], 2);
    document.getElementById("field-traderCount").innerHTML = numberOfOffers;
}

function getUserBalanceInfo() {
    web3.eth.getBalance(web3.eth.defaultAccount, (err, balance) => {
        balance = this.web3.fromWei(balance, "ether") + " ETH"
        document.getElementById("field-traderGetBalance").innerHTML = balance;
        console.log(balance);
    });
}

function getGridOffers() {
    var numberOfOffers = SContract.getAnOwnerLength(1);// Get how many offers of Grid Operators.
    var i;
    var index = 0;// First starting index is 0
    for (i = 0; i < numberOfOffers; i++) {
        var result = SContract.wantedValueofProductInfoStruct(index, 1);//Smart contract function. Find the next Grid operator.
        var table = document.getElementById("table-gridOpOffers");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_username = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_input = row.insertCell(3);
        var cell_button = row.insertCell(4);

        cell_i.innerHTML = i + 1;//Add Table
        cell_username.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table

        cell_input.innerHTML = "<tr><td><input class='form-control' placeholder='Enter profit rate' type='number' id='cell_profitRate" + (i + 1) + "'></input></td></tr>";
        cell_button.innerHTML = "<tr><td><button id='cell_setPrice" + i + "' type='button' class='btn btn-primary btn-rounded btn-fw' value=" + (i + 1) + " onClick='gridSetPrice(value);'>Set Price</button></td></tr>";
        console.log("<tr><td><button id='cell_setPrice" + i + "' type='button' class='btn btn-primary btn-rounded btn-fw' value=" + i + " onClick='gridSetPrice(value);'>Set Price</button></td></tr>");
        index = result[2];
    }
}

function gridSetPrice(i) {
    var table = document.getElementById("table-gridOpOffers");
    selectedOfferprofitRate = $("#cell_profitRate" + i).val();
    selectedOfferPrice = table.rows[i].cells[2].innerHTML;
    SContract.addOffer(username[1], selectedOfferPrice, 2, selectedOfferprofitRate, { from: web3.eth.accounts[0], gas: 3000000 });
    getUserBalanceInfo();
    getTransactionCount();
    getMyOfferHistory();
}

var tableLenght;
function getMyOfferHistory() {
    for (var i = tableLenght; i >= 1; i--) {
        document.getElementById("table-traderMyOfferHistory").deleteRow(i);
    }
    var numberOfOffers = SContract.getCurrentUserTransactionLength(username[1], 2);// Get how many offers of Grid Operators.
    tableLenght = numberOfOffers;
    var i;
    var index = 0;// First starting index is 0
    for (i = 0; i < numberOfOffers; i++) {
        var result = SContract.getCurrentUserAllTransactions(username[1], index, 2);//Smart contract function. Find the next Grid operator.
        var table = document.getElementById("table-traderMyOfferHistory");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_username = row.insertCell(1);
        var cell_price = row.insertCell(2);

        cell_i.innerHTML = i + 1;//Add Table
        cell_username.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table

        index = result[2];// New index is return value of smart function.
    }
}

