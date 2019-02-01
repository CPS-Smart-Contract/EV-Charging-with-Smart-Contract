if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// Set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
// Default account defination
web3.eth.defaultAccount = web3.eth.accounts[0];
// Initialize contract with its ABI
var myContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"_ownerType","type":"uint256"},{"name":"profitRate","type":"uint256"},{"name":"_state","type":"bool"}],"name":"addOffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_ownerType","type":"uint256"}],"name":"getCurrentUserTransactionLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"getCurrentUserAllTransactions","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getMinEnergyPriceAccordingToOwnerType","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"productInfoStruct","outputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"ownerType","type":"uint256"},{"name":"transactionTime","type":"uint256"},{"name":"state","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"wantedValueofProductInfoStruct","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getAnOwnerLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
//Contract defination of smart deployed contract with its addres
var SContract = myContract.at('0x6352108d270ecb12c84b3fc8898c8adbdf62f7e4');
var state=true;
for (var i = 0; i < 100; i++) {
	var price = Math.floor(Math.random() * 1001) + 10;// Random energy price generating.
	var profitRate = Math.floor(Math.random() * 101) + 10; // Random profit rate generating.
	
	// Use addOffer function of deployed smart contract in web3 Provider. Send parametres to add new offer.
	SContract.addOffer("EnergyProducerBot" + i, price, 0, 0,state, { from: web3.eth.accounts[0], gas: 3000000 });
	SContract.addOffer("EnergyGridOperatorBot" + i, price, 1, profitRate,state, { from: web3.eth.accounts[0], gas: 3000000 });
	SContract.addOffer("EnergyTraderBot" + i, price, 2, profitRate,state, { from: web3.eth.accounts[0], gas: 3000000 });
	console.log(i);
}
//Use addOffer function of deployed smart contract in web3 Provider. Send parametres to add new offer.
console.log(SContract);