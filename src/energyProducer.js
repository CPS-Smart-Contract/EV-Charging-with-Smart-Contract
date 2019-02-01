var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

document.getElementById("log-producerUsername").value = username[1];
document.getElementById("log-producerUsername").disabled = true;

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];//Default account defination
console.log(web3.eth.defaultAccount);
document.getElementById("field-producerWalletAddress").innerHTML = web3.eth.defaultAccount;

//Initialize contract with its ABI
var myContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"_ownerType","type":"uint256"},{"name":"profitRate","type":"uint256"},{"name":"_state","type":"bool"}],"name":"addOffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_ownerType","type":"uint256"}],"name":"getCurrentUserTransactionLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"getCurrentUserAllTransactions","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getMinEnergyPriceAccordingToOwnerType","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"productInfoStruct","outputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"ownerType","type":"uint256"},{"name":"transactionTime","type":"uint256"},{"name":"state","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"wantedValueofProductInfoStruct","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getAnOwnerLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var SContract = myContract.at('0x6352108d270ecb12c84b3fc8898c8adbdf62f7e4');

getUserBalanceInfo();
getTransactionCount();
getMyOfferHistory();

var state=true;

var gasUsed = SContract.addOffer.estimateGas(username[1], $("#log-producerPrice").val(), 0, 0,state, { from: web3.eth.accounts[0], gas: 3000000 });
var gasPrice = 4.5; // Average Gwei Amount //Fast --> 25 Gwei  //Cheap --> 4.5 Gwei
var etherPayment = gasUsed * gasPrice / 1000000000;
console.log(etherPayment);
document.getElementById("text-gasUsage").innerHTML = "For Each Operation Estimated Ether Usage: "+ etherPayment +" ETH ";

$("#button").click(function () {//Button click event
	// Use addOffer function of deployed smart contract in web3 Provider. Send parametres to add new offer. With gas limit 3000000
	// Profit rate is 0 because of this is Energy producer.
	SContract.addOffer(username[1], $("#log-producerPrice").val(), 0, 0,state, { from: web3.eth.accounts[0], gas: 3000000 });
	getUserBalanceInfo();
	getTransactionCount();
	getMyOfferHistory();
});

function getTransactionCount() {
	var numberOfOffers = SContract.getCurrentUserTransactionLength(username[1], 0);
	document.getElementById("field-producerCount").innerHTML = numberOfOffers;
}

function getUserBalanceInfo() {
	web3.eth.getBalance(web3.eth.defaultAccount, (err, balance) => {
		balance = this.web3.fromWei(balance, "ether") + " ETH";
		document.getElementById("field-producerGetBalance").innerHTML = balance;
		console.log(balance);
	});
}

var tableLenght;
function getMyOfferHistory() {
	for (var i = tableLenght; i >= 1; i--) {
		document.getElementById("table-Expenditure").deleteRow(i);
	}
	var numberOfOffers = SContract.getCurrentUserTransactionLength(username[1], 0);// Get how many offers of Grid Operators.
	tableLenght = numberOfOffers;
	var i;
	var index = 0;// First starting index is 0
	for (i = 0; i < numberOfOffers; i++) {
		var result = SContract.getCurrentUserAllTransactions(username[1], index, 0);//Smart contract function. Find the next Grid operator.
		var table = document.getElementById("table-Expenditure");
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
        cell_transactionTime.innerHTML=formattedDate;
        if (result[4] == true)
            cell_state.innerHTML = "Available";//Add Table
        else if (result[4] == false)
            cell_state.innerHTML = "Not Available";
		index = result[2];// New index is return value of smart function.
	}
};