
var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("grdOpName").value = username[1];
document.getElementById("grdOpName").disabled = true;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
// Default account defination.
web3.eth.defaultAccount = web3.eth.accounts[0];
// Initialize contract with its ABI
var myContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_ownerType","type":"uint256"}],"name":"getCurrentUserTransactionLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"getCurrentUserAllTransactions","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getMinEnergyPriceAccordingToOwnerType","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"productInfoStruct","outputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"ownerType","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"wantedValueofProductInfoStruct","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getAnOwnerLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"_ownerType","type":"uint256"},{"name":"profitRate","type":"uint256"}],"name":"addOffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);

//Contract defination of deployed smart contract with its addres.
var SContract = myContract.at('0xa140c7acb24b40669ab1fd6e1336e8e7e9323b65');
getExpenditure();
$("#button").click(function () {//Button click event
    //Use addOffer function of deployed smart contract in web3 Provider. Send parametres to add new offer.
    SContract.addOffer($("#grdOpName").val(), $("#grdOpPrice").val(), 1, $("#grdOpPrfRate").val(), { from: web3.eth.accounts[0], gas: 3000000 });
});
console.log(SContract);
/* Use getMinEnergyPriceAccordingToOwnerType funtion of smart contract to get best value of all
offers. In this page ownerType parametre is o. Because, Grid operators need Energy Producers's offers. */
SContract.getMinEnergyPriceAccordingToOwnerType(0, function (error, result) {
    if (!error) {
        $("#station").html('Best Price is ' + result[1] + '$. from ' + result[0]);//Give output to user.
        getIncome();
        console.log(result);
    }
    else
        console.error(error);
});

function getIncome() {
    var length = SContract.getAnOwnerLength(0);
    var i;
    var index = 0;// First starting index is 0
    for (i = 0; i < length; i++) {
        var result = SContract.wantedValueofProductInfoStruct(index, 0);//Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("tableIncome");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = result[0];//Add Table
        cell2.innerHTML = result[1];//Add Table
        index = result[2];// New index is return value of smart contract function.
    }
};
function getExpenditure() {
    var numberOfOffers = SContract.getCurrentUserTransactionLength(username[1], 1);// Get how many offers of Grid Operators.
    var i;
    var index = 0;// First starting index is 0
    for (i = 0; i < numberOfOffers; i++) {
        var result = SContract.getCurrentUserAllTransactions(username[1], index, 1);//Smart contract function. Find the next Grid operator.
        var table = document.getElementById("tableExpenditure");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = result[0];//Add Table
        cell2.innerHTML = result[1];//Add Table
        index = result[2];// New index is return value of smart function.
    }
};