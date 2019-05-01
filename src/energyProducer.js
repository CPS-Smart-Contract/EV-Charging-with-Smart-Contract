var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

document.getElementById("log-producerUsername").value = username[1];
document.getElementById("log-producerUsername").disabled = true;

var userWalletAddress = getWalletAddress(username[1]);
document.getElementById("field-producerWalletAddress").innerHTML = userWalletAddress;

getMyOfferHistory();
getEnteredUserSales();
setUserInfo(username[1],userWalletAddress);
var state = true;

var gasUsed = electricVehicleChargingEnergyTradeSystemContractAddress.addOffer.estimateGas(username[1], $("#log-producerPrice").val(), 0, 0, state, 0, 0, 0, { from: userWalletAddress, gas: 3000000 });
var gasPrice = 4.5; // Average Gwei Amount //Fast --> 25 Gwei  //Cheap --> 4.5 Gwei
var etherPayment = gasUsed * gasPrice / 1000000000;
console.log(etherPayment);
document.getElementById("text-gasUsage").innerHTML = "For Each Operation Estimated Ether Usage: " + etherPayment + " ETH ";


$("#button").click(function () {//Button click event
	// Use addOffer function of deployed smart contract in web3 Provider. Send parametres to add new offer. With gas limit 3000000
	// Profit rate is 0 because of this is Energy producer.
	electricVehicleChargingEnergyTradeSystemContractAddress.addOffer(username[1], $("#log-producerPrice").val(), 0, 0, state, 0, 0, 0, { from: userWalletAddress, gas: 3000000 });

	alert('Adding products is complete.');
	getUserBalanceInfo();
	getMyOfferHistory();
	getEnteredUserSales();
});

function getUserBalanceInfo() {
	web3.eth.getBalance(userWalletAddress, (err, balance) => {
		balance = this.web3.fromWei(balance, "ether") + " ETH";
		document.getElementById("field-getBalance").innerHTML = balance;
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