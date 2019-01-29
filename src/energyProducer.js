var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("pname").value = username[1];
document.getElementById("pname").disabled = true;

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];//Default account defination
//Initialize contract with its ABI
var myContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_ownerType","type":"uint256"}],"name":"getCurrentUserTransactionLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"getCurrentUserAllTransactions","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getMinEnergyPriceAccordingToOwnerType","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"productInfoStruct","outputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"ownerType","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"wantedValueofProductInfoStruct","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getAnOwnerLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"_ownerType","type":"uint256"},{"name":"profitRate","type":"uint256"}],"name":"addOffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var SContract = myContract.at('0xa140c7acb24b40669ab1fd6e1336e8e7e9323b65');
getExpenditure();
$("#button").click(function () {//Button click event
	// Use addOffer function of deployed smart contract in web3 Provider. Send parametres to add new offer. With gas limit 3000000
	// Profit rate is 0 because of this is Energy producer.
	SContract.addOffer($("#pname").val(), $("#pprice").val(), 0, 0, { from: web3.eth.accounts[0], gas: 3000000 });
});

function getExpenditure() {
	var numberOfOffers = SContract.getCurrentUserTransactionLength(username[1], 0);// Get how many offers of Grid Operators.
	var i;
	var index = 0;// First starting index is 0
	for (i = 0; i < numberOfOffers; i++) {
		var result = SContract.getCurrentUserAllTransactions(username[1], index, 0);//Smart contract function. Find the next Grid operator.
		var table = document.getElementById("tableExpenditure");
		var row = table.insertRow(1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = result[0];//Add Table
		cell2.innerHTML = result[1];//Add Table
		index = result[2];// New index is return value of smart function.
	}
};