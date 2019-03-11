/*if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// Set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
// Default account defination

// Initialize contract with its ABI
var userLoginRegister =web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getLogID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getUserCondition","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"index","type":"uint256"}],"name":"getMatchUsers","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"}],"name":"getMatchUsersCounts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"adminLogStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userType","type":"uint256"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numCriteria","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"uint256"},{"name":"registerDate","type":"uint256"},{"name":"numStationCriteria","type":"uint256"},{"name":"quality","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getSelectedUserInformation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_quality","type":"uint256"}],"name":"setStationQuality","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"},{"name":"_userType","type":"uint256"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"startIndex","type":"uint256"}],"name":"getUserLog","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_socketType","type":"uint256"},{"name":"_chargeType","type":"uint256"},{"name":"_chargeMode","type":"uint256"},{"name":"_stationState","type":"bool"}],"name":"setUserConditions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
//Contract defination of smart deployed contract with its addres
var userLoginRegisterContract = userLoginRegister.at('0xdbfe19980db15e43bf40e3a6581d6f3b7b39d488');

var energyTradingSystem =  web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lengthOfProductInfoStruct","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"moneyExchangeInfoStruct","outputs":[{"name":"fromUserWalletAdress","type":"string"},{"name":"fromUserName","type":"string"},{"name":"toUserWalletAdress","type":"string"},{"name":"toUserName","type":"string"},{"name":"transactionCost","type":"uint256"},{"name":"transactionTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_ownerType","type":"uint256"}],"name":"getCurrentUserTransactionLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"getCurrentUserAllTransactions","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getMinEnergyPriceAccordingToOwnerType","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_energyPrice","type":"uint256"},{"name":"_profitRate","type":"uint256"},{"name":"_ownerType","type":"uint256"},{"name":"_state","type":"bool"},{"name":"_stationDistance","type":"uint256"},{"name":"_stationExpectedWaitingTime","type":"uint256"}],"name":"addOffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"productInfoStruct","outputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"ownerType","type":"uint256"},{"name":"transactionTime","type":"uint256"},{"name":"state","type":"bool"},{"name":"stationDistance","type":"uint256"},{"name":"stationExpectedWaitingTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromUserWalletAdress","type":"string"},{"name":"_fromUserName","type":"string"},{"name":"_toUserWalletAdress","type":"string"},{"name":"_toUserName","type":"string"},{"name":"_transactionCost","type":"uint256"}],"name":"addMoneyExchangeTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"wantedValueofProductInfoStruct","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"indexOfOffer","type":"uint256"},{"name":"_state","type":"bool"}],"name":"setOfferState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getAnOwnerLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lengthOfMoneyExchangeInfoStruct","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var energyTradingSystemContract = energyTradingSystem.at('0x4458f27b82de528687ed76783c7d4c5cce4db5ac');
*/
// User Add
//web3.eth.defaultAccount = web3.eth.accounts[0];
//userLoginRegisterContractAddress.userRegister(web3.eth.defaultAccount, "e", "1", 4, { from: web3.eth.accounts[0], gas: 3000000 });
for (var i = 1; i < 5; i++) {
	var walletAddres = web3.eth.accounts[i];
	var userType;
	var userName;

	if (i === 1) { var index = 1; userType = 0; userName = "p"; }
	if (i === 2) { var index = 1; userType = 1; userName = "g"; }
	else if (i === 3) { var index = 1; userType = 2; userName = "t"; }
	else if (i === 4) { var index = 1; userType = 3; userName = "s"; }
	userLoginRegisterContractAddress.userRegister(walletAddres, userName, "1", userType, { from: web3.eth.accounts[0], gas: 3000000 });
	index++;
}
/*
var request = 20;
for (let index = 0; index <1; index++) {
	// Producer
	for (let k = 1; k < 11; k++) {
		var price = Math.floor(Math.random() * 1001) + 10;// Random energy price generating.
		electricVehicleChargingEnergyTradeSystemContractAddress.addOffer("EnergyProducerBot" + k, price, 0, 0, true,0,"",0, { from: web3.eth.accounts[0], gas: 3000000 });
		console.log("EnergyProducerBot" + k+ "	" + price);
	} 

	// Grid
	var minEnergyProducerOffer = electricVehicleChargingEnergyTradeSystemContractAddress.getMinEnergyPriceAccordingToOwnerType(0);
	console.log(minEnergyProducerOffer);
	
	for (let k = 1; k < 11; k++) {
		var profitRate = Math.floor(Math.random() * 45) + 5; // Random profit rate generating.
		electricVehicleChargingEnergyTradeSystemContractAddress.addOffer("EnergyGridOperatorBot" + k, minEnergyProducerOffer[1], 1, profitRate, true,0," ",0, { from: web3.eth.accounts[0], gas: 3000000 });
		console.log("EnergyGridOperatorBot" + k + "	" + profitRate);
	}
	// Trader
	var minEnergyGridOperatorOffer = electricVehicleChargingEnergyTradeSystemContractAddress.getMinEnergyPriceAccordingToOwnerType(1);
	console.log(minEnergyGridOperatorOffer);
	
	for (let k = 1; k < 11; k++) {
		var profitRate = Math.floor(Math.random() * 45) + 5; // Random profit rate generating.
		electricVehicleChargingEnergyTradeSystemContractAddress.addOffer("EnergyTraderBot" + k, minEnergyGridOperatorOffer[1], 2, profitRate, true,0," ",0, { from: web3.eth.accounts[0], gas: 3000000 });
		console.log("EnergyTraderBot" + k+ "	" + profitRate);
	}
	// Station
	var minEnergyTraderOffer = electricVehicleChargingEnergyTradeSystemContractAddress.getMinEnergyPriceAccordingToOwnerType(2);
	console.log(minEnergyTraderOffer);
	
	for (let k = 1; k < 11; k++) {
		var profitRate = Math.floor(Math.random() * 45) + 5; // Random profit rate generating.
		electricVehicleChargingEnergyTradeSystemContractAddress.addOffer("EnergyStationBot" + k, minEnergyTraderOffer[1], 3, profitRate, true,0," ",0, { from: web3.eth.accounts[0], gas: 3000000 });
		console.log("EnergyStationBot" + k+ "	" + profitRate);
	}
	// EV User
	console.log("EV User Wallet	"+web3.eth.defaultAccount);
	var minEnergyStationOffer = electricVehicleChargingEnergyTradeSystemContractAddress.getMinEnergyPriceAccordingToOwnerType(3);
	// From EV User Send Ether to Station
	console.log(minEnergyStationOffer);
	var evUserWalletAddress = web3.eth.defaultAccount;
	var stationWalletAddress = getWalletAddress(minEnergyStationOffer[0]);
	var amount = web3.toWei(minEnergyStationOffer[1], "ether");
	web3.eth.sendTransaction({ from: evUserWalletAddress, to: stationWalletAddress, value: amount });
	electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(evUserWalletAddress, "EVUserBot", stationWalletAddress, minEnergyStationOffer[0], amount, { from: web3.eth.accounts[0], gas: 3000000 });

	// From Station Send Ether to Trader
	var traderWalletAddress = getWalletAddress(minEnergyTraderOffer[0]);
	console.log("Selected Trader Wallet	"+traderWalletAddress);
	var amount = web3.toWei(minEnergyTraderOffer[1], "ether");
	web3.eth.sendTransaction({ from: stationWalletAddress, to: traderWalletAddress, value: amount });
	electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(stationWalletAddress, minEnergyStationOffer[0], traderWalletAddress, minEnergyTraderOffer[0], amount, { from: web3.eth.accounts[0], gas: 3000000 });

	// From Trader Send Ether to Grid Operator
	var gridOperatorWalletAddress = getWalletAddress(minEnergyGridOperatorOffer[0]);
	console.log("Selected Grid Operator Wallet	"+gridOperatorWalletAddress);
	var amount = web3.toWei(minEnergyGridOperatorOffer[1], "ether");
	web3.eth.sendTransaction({ from: traderWalletAddress, to: gridOperatorWalletAddress, value: amount });
	electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(traderWalletAddress, minEnergyTraderOffer[0], gridOperatorWalletAddress, minEnergyGridOperatorOffer[0], amount, { from: web3.eth.accounts[0], gas: 3000000 });

	// From Grid Operator Send Ether to Producer
	var producerWalletAddress = getWalletAddress(minEnergyProducerOffer[0]);
	console.log("Selected Producer Wallet	"+producerWalletAddress);
	var amount = web3.toWei(minEnergyProducerOffer[1], "ether");
	web3.eth.sendTransaction({ from: gridOperatorWalletAddress, to: producerWalletAddress, value: amount });
	electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(gridOperatorWalletAddress, minEnergyGridOperatorOffer[0], producerWalletAddress, minEnergyProducerOffer[0], amount, { from: web3.eth.accounts[0], gas: 3000000 });

	var lengthOfAllOffers = electricVehicleChargingEnergyTradeSystemContractAddress.lengthOfProductInfoStruct.call();
	for (let i = 0; i < lengthOfAllOffers; i++) {
		electricVehicleChargingEnergyTradeSystemContractAddress.setOfferState(i, false);
	}
}*/
function getWalletAddress(_userName) {
	var length = userLoginRegisterContractAddress.registeredUserLength.call();
	let walletAddres;
	for (let i = 0; i < length; i++) {
		var result = userLoginRegisterContractAddress.userInfoStruct(i);
		if (result[1] === _userName) {
			walletAddres = result[0]
		}
	}
	return walletAddres;
}
