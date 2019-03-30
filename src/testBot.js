for (var i = 1; i < 41; i++) {
	var walletAddres = web3.eth.accounts[i];
	var userType;
	var userName;

	if (i === 1) { var index = 1; userType = 0; userName = "EnergyProducerBot"; }
	if (i === 11) { var index = 1; userType = 1; userName = "EnergyGridOperatorBot"; }
	else if (i === 21) { var index = 1; userType = 2; userName = "EnergyTraderBot"; }
	else if (i === 31) { var index = 1; userType = 3; userName = "EnergyStationBot"; }
	userLoginRegisterContractAddress.userRegister(walletAddres, userName + index, "1", userType, { from: web3.eth.accounts[i], gas: 3000000 });
	index++;
}
var EVUserIndex = 1;
for (var i = 41; i < 46; i++) {
	var walletAddres = web3.eth.accounts[i];
	var userType = 4;
	var userName = "EVUserBot";
	//function setUserConditions (uint userID,uint _socketType, uint _chargeType, uint _chargeMode, bool _stationState)

	userLoginRegisterContractAddress.userRegister(walletAddres, userName + EVUserIndex, "1", userType, { from: web3.eth.accounts[i], gas: 3000000 });
	var userID = userLoginRegisterContractAddress.getUserID(userName + EVUserIndex);
	var socketType = Math.floor(Math.random() * 5) + 1;
	var chargeType = Math.floor(Math.random() * 3) + 1;
	var chargeMode = Math.floor(Math.random() * 4) + 1;
	var stationState = true;
	userLoginRegisterContractAddress.setUserConditions(userID, socketType, chargeType, chargeMode, stationState, { from: web3.eth.accounts[i], gas: 3000000 });
	EVUserIndex++;
}
var request = 20;
for (let index = 0; index < 1; index++) {
	// Producer
	for (let k = 1; k < 11; k++) {
		var price = Math.floor(Math.random() * 1001) + 10;// Random energy price generating.
		electricVehicleChargingEnergyTradeSystemContractAddress.addOffer("EnergyProducerBot" + k, price, 0, 0, true, 0, 0, 0, { from: web3.eth.accounts[0], gas: 3000000 });
		console.log("EnergyProducerBot" + k + "	" + price);
	}

	// Grid
	var minEnergyProducerOffer = electricVehicleChargingEnergyTradeSystemContractAddress.getMinEnergyPriceAccordingToOwnerType(0);
	console.log(minEnergyProducerOffer);

	for (let k = 1; k < 11; k++) {
		var profitRate = Math.floor(Math.random() * 45) + 5; // Random profit rate generating.
		electricVehicleChargingEnergyTradeSystemContractAddress.addOffer("EnergyGridOperatorBot" + k, minEnergyProducerOffer[1], profitRate, 1, true, 0, 0, 0, { from: web3.eth.accounts[0], gas: 3000000 });
		console.log("EnergyGridOperatorBot" + k + "	" + profitRate);
	}
	// Trader
	var minEnergyGridOperatorOffer = electricVehicleChargingEnergyTradeSystemContractAddress.getMinEnergyPriceAccordingToOwnerType(1);
	console.log(minEnergyGridOperatorOffer);

	for (let k = 1; k < 11; k++) {
		var profitRate = Math.floor(Math.random() * 45) + 5; // Random profit rate generating.
		electricVehicleChargingEnergyTradeSystemContractAddress.addOffer("EnergyTraderBot" + k, minEnergyGridOperatorOffer[1], profitRate, 2, true, 0, 0, 0, { from: web3.eth.accounts[0], gas: 3000000 });
		console.log("EnergyTraderBot" + k + "	" + profitRate);
	}

	// Station
	var minEnergyTraderOffer = electricVehicleChargingEnergyTradeSystemContractAddress.getMinEnergyPriceAccordingToOwnerType(2);
	console.log(minEnergyTraderOffer);

	for (let k = 1; k < 11; k++) {
		for (let j = 0; j < 60; j++) {
			var _stationDistance = Math.floor(Math.random() * 201) + 1;
			var _stationExpectedWaitingTime = Math.floor(Math.random() * 121) + 0;

			var socketType = Math.floor(Math.random() * 5) + 1;
			var chargeType = Math.floor(Math.random() * 3) + 1;
			var chargeMode = Math.floor(Math.random() * 4) + 1;
			var userID = userLoginRegisterContractAddress.getUserID("EnergyStationBot" + k);

			var resultIsThereSameCondition = userLoginRegisterContractAddress.isThereSameCondition(userID, socketType, chargeType, chargeMode, true, { from: web3.eth.accounts[0], gas: 3000000 });
			if (!resultIsThereSameCondition[0]) {
				userLoginRegisterContractAddress.setUserConditions(userID, socketType, chargeType, chargeMode, true, { from: web3.eth.accounts[0], gas: 3000000 });
			}
			electricVehicleChargingEnergyTradeSystemContractAddress.addOffer("EnergyStationBot" + k, minEnergyTraderOffer[1], profitRate, 3, true, _stationDistance, _stationExpectedWaitingTime, resultIsThereSameCondition[1], { from: web3.eth.accounts[0], gas: 3000000 });
			console.log("EnergyStationBot" + k + "	" + profitRate);
		}
	}

	for (let i = 1; i < 6; i++) {
		//EV user
		userName = "EVUserBot" + i;
		var indexMaxRakingOffer = criteriaDesicion(userName);
		var maxRanKingOffer = electricVehicleChargingEnergyTradeSystemContractAddress.productInfoStruct.call(indexMaxRakingOffer);
		// From EV User Send Ether to Station
		console.log(maxRanKingOffer);
		var evUserID = userLoginRegisterContractAddress.getUserID.call(userName);
		var evUserWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(evUserID)[0];

		var stationID = userLoginRegisterContractAddress.getUserID.call(maxRanKingOffer[0]);
		var stationWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(stationID)[0];

		var amount = web3.toWei(maxRanKingOffer[1], "ether");
		web3.eth.sendTransaction({ from: evUserWalletAddress, to: stationWalletAddress, value: amount });
		electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(evUserWalletAddress, "EVUserBot" + i, stationWalletAddress, maxRanKingOffer[0], amount, { from: web3.eth.accounts[0], gas: 3000000 });
		electricVehicleChargingEnergyTradeSystemContractAddress.setOfferState(indexMaxRakingOffer, false);

		// From Station Send Ether to Trader
		var traderID = userLoginRegisterContractAddress.getUserID.call(minEnergyTraderOffer[0]);
		var traderWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(traderID)[0];
		console.log("Selected Trader Wallet	" + traderWalletAddress);

		var amount = web3.toWei(minEnergyTraderOffer[1], "ether");
		web3.eth.sendTransaction({ from: stationWalletAddress, to: traderWalletAddress, value: amount });
		electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(stationWalletAddress, maxRanKingOffer[0], traderWalletAddress, minEnergyTraderOffer[0], amount, { from: web3.eth.accounts[0], gas: 3000000 });
		electricVehicleChargingEnergyTradeSystemContractAddress.setOfferState(minEnergyTraderOffer[2], false);

		// From Trader Send Ether to Grid Operator
		var gridOperatorID = userLoginRegisterContractAddress.getUserID.call(minEnergyGridOperatorOffer[0]);
		var gridOperatorWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(gridOperatorID)[0];
		console.log("Selected Grid Operator Wallet	" + gridOperatorWalletAddress);

		var amount = web3.toWei(minEnergyGridOperatorOffer[1], "ether");
		web3.eth.sendTransaction({ from: traderWalletAddress, to: gridOperatorWalletAddress, value: amount });
		electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(traderWalletAddress, minEnergyTraderOffer[0], gridOperatorWalletAddress, minEnergyGridOperatorOffer[0], amount, { from: web3.eth.accounts[0], gas: 3000000 });
		electricVehicleChargingEnergyTradeSystemContractAddress.setOfferState(minEnergyGridOperatorOffer[2], false);

		// From Grid Operator Send Ether to Producer
		var producerID = userLoginRegisterContractAddress.getUserID.call(minEnergyProducerOffer[0]);
		var producerWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(producerID)[0];

		var amount = web3.toWei(minEnergyProducerOffer[1], "ether");
		web3.eth.sendTransaction({ from: gridOperatorWalletAddress, to: producerWalletAddress, value: amount });
		electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(gridOperatorWalletAddress, minEnergyGridOperatorOffer[0], producerWalletAddress, minEnergyProducerOffer[0], amount, { from: web3.eth.accounts[0], gas: 3000000 });
		electricVehicleChargingEnergyTradeSystemContractAddress.setOfferState(minEnergyProducerOffer[2], false);
	}
}