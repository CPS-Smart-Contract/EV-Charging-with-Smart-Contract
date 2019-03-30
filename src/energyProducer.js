var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

document.getElementById("log-producerUsername").value = username[1];
document.getElementById("log-producerUsername").disabled = true;
/*
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];//Default account defination
console.log(web3.eth.defaultAccount);
//Initialize contract with its ABI
var myContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lengthOfProductInfoStruct","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"moneyExchangeInfoStruct","outputs":[{"name":"fromUserWalletAdress","type":"string"},{"name":"fromUserName","type":"string"},{"name":"toUserWalletAdress","type":"string"},{"name":"toUserName","type":"string"},{"name":"transactionCost","type":"uint256"},{"name":"transactionTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_ownerType","type":"uint256"}],"name":"getCurrentUserTransactionLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"getCurrentUserAllTransactions","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getMinEnergyPriceAccordingToOwnerType","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"productInfoStruct","outputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"ownerType","type":"uint256"},{"name":"transactionTime","type":"uint256"},{"name":"state","type":"bool"},{"name":"stationDistance","type":"uint256"},{"name":"stationExpectedWaitingTime","type":"uint256"},{"name":"stationConditionIndex","type":"uint256"},{"name":"ownerConditionID","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromUserWalletAdress","type":"string"},{"name":"_fromUserName","type":"string"},{"name":"_toUserWalletAdress","type":"string"},{"name":"_toUserName","type":"string"},{"name":"_transactionCost","type":"uint256"}],"name":"addMoneyExchangeTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"wantedValueofProductInfoStruct","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_energyPrice","type":"uint256"},{"name":"_profitRate","type":"uint256"},{"name":"_ownerType","type":"uint256"},{"name":"_state","type":"bool"},{"name":"_stationDistance","type":"uint256"},{"name":"_stationExpectedWaitingTime","type":"uint256"},{"name":"_stationConditionIndex","type":"uint256"},{"name":"_ownerConditionID","type":"uint256"}],"name":"addOffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"indexOfOffer","type":"uint256"},{"name":"_state","type":"bool"}],"name":"setOfferState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getAnOwnerLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lengthOfMoneyExchangeInfoStruct","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var electricVehicleChargingEnergyTradeSystemContractAddress = myContract.at('0x4458f27b82de528687ed76783c7d4c5cce4db5ac');

var userLoginRegister =web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getLogID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getUserCondition","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"index","type":"uint256"}],"name":"getMatchUsers","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"}],"name":"getMatchUsersCounts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_socketType","type":"uint256"},{"name":"_chargeType","type":"uint256"},{"name":"_chargeMode","type":"uint256"},{"name":"_stationState","type":"bool"},{"name":"_countOfSameStationCondition","type":"uint256"}],"name":"setUserConditions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"adminLogStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userType","type":"uint256"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numCriteria","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"uint256"},{"name":"registerDate","type":"uint256"},{"name":"numStationCriteria","type":"uint256"},{"name":"quality","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getSelectedUserInformation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_quality","type":"uint256"}],"name":"setStationQuality","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"},{"name":"_userType","type":"uint256"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"startIndex","type":"uint256"}],"name":"getUserLog","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
//Contract defination of smart deployed contract with its addres
var userLoginRegisterContract = userLoginRegister.at('0xdbfe19980db15e43bf40e3a6581d6f3b7b39d488');
*/

var userWalletAddress = getWalletAddress(username[1]);
document.getElementById("field-producerWalletAddress").innerHTML = userWalletAddress;

getUserBalanceInfo();
getTransactionCount();
getMyOfferHistory();
getEnteredUserSales();

var state = true;
   
var gasUsed = electricVehicleChargingEnergyTradeSystemContractAddress.addOffer.estimateGas(username[1], $("#log-producerPrice").val(), 0, 0, state,0,0,0, { from: userWalletAddress, gas: 3000000 });
var gasPrice = 4.5; // Average Gwei Amount //Fast --> 25 Gwei  //Cheap --> 4.5 Gwei
var etherPayment = gasUsed * gasPrice / 1000000000;
console.log(etherPayment);
document.getElementById("text-gasUsage").innerHTML = "For Each Operation Estimated Ether Usage: " + etherPayment + " ETH ";

$("#button").click(function () {//Button click event
	// Use addOffer function of deployed smart contract in web3 Provider. Send parametres to add new offer. With gas limit 3000000
	// Profit rate is 0 because of this is Energy producer.
	electricVehicleChargingEnergyTradeSystemContractAddress.addOffer(username[1], $("#log-producerPrice").val(), 0, 0, state,0,0,0, { from: userWalletAddress, gas: 3000000 });
	getUserBalanceInfo();
	getTransactionCount();
	getMyOfferHistory();
	getEnteredUserSales();
});

function getTransactionCount() {
	var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 0);
	document.getElementById("field-producerCount").innerHTML = numberOfOffers;
}

function getUserBalanceInfo() {
	web3.eth.getBalance(userWalletAddress, (err, balance) => {
		balance = this.web3.fromWei(balance, "ether") + " ETH";
		document.getElementById("field-producerGetBalance").innerHTML = balance;
		console.log(balance);
	});
}

function getWalletAddress(_userName) {
	var length = userLoginRegisterContractAddress.userLength.call();
	let walletAddres;
	for (let i = 0; i < length; i++) {
		var result = userLoginRegisterContractAddress.userInfoStruct(i);
		if (result[1] === _userName) {
			walletAddres = result[0]
		}
	}
	return walletAddres;
}

var tableLenght;
function getMyOfferHistory() {
	for (var i = tableLenght; i >= 1; i--) {
		document.getElementById("table-Expenditure").deleteRow(i);
	}
	var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 0);// Get how many offers of Grid Operators.
	tableLenght = numberOfOffers;
	var i;
	var index = 0;// First starting index is 0
	for (i = 0; i < numberOfOffers; i++) {

		var result = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserAllTransactions(username[1], index, 0);//Smart contract function. Find the next Grid operator.
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
		cell_transactionTime.innerHTML = formattedDate;
		if (result[4] == true)
			cell_state.innerHTML = "Available";//Add Table
		else if (result[4] == false)
			cell_state.innerHTML = "Not Available";
		index = result[2];// New index is return value of smart function.
	}
};

var tblLenght;
function getEnteredUserSales() {
	for (var i = tblLenght; i >= 1; i--) {
		document.getElementById("table-enteredUserSalesInfo").deleteRow(i);
	}
	var length = electricVehicleChargingEnergyTradeSystemContractAddress.lengthOfMoneyExchangeInfoStruct.call();
	tblLenght = length;
	var _username = document.getElementById("log-producerUsername").value;
	var index = 0;
	for (var i = 0; i < length; i++) {
		var result = electricVehicleChargingEnergyTradeSystemContractAddress.moneyExchangeInfoStruct(i);

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