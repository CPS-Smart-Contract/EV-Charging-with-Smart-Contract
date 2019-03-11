var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

/*if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
//Initialize contract with its ABI
var myContractTrade = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lengthOfProductInfoStruct","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"moneyExchangeInfoStruct","outputs":[{"name":"fromUserWalletAdress","type":"string"},{"name":"fromUserName","type":"string"},{"name":"toUserWalletAdress","type":"string"},{"name":"toUserName","type":"string"},{"name":"transactionCost","type":"uint256"},{"name":"transactionTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_ownerType","type":"uint256"}],"name":"getCurrentUserTransactionLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerName","type":"string"},{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"getCurrentUserAllTransactions","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getMinEnergyPriceAccordingToOwnerType","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"productInfoStruct","outputs":[{"name":"ownerName","type":"string"},{"name":"energyPrice","type":"uint256"},{"name":"ownerType","type":"uint256"},{"name":"transactionTime","type":"uint256"},{"name":"state","type":"bool"},{"name":"stationDistance","type":"uint256"},{"name":"stationExpectedWaitingTime","type":"uint256"},{"name":"stationConditionIndex","type":"uint256"},{"name":"ownerConditionID","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromUserWalletAdress","type":"string"},{"name":"_fromUserName","type":"string"},{"name":"_toUserWalletAdress","type":"string"},{"name":"_toUserName","type":"string"},{"name":"_transactionCost","type":"uint256"}],"name":"addMoneyExchangeTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"startIndex","type":"uint256"},{"name":"wantedOwnerType","type":"uint256"}],"name":"wantedValueofProductInfoStruct","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ownerName","type":"string"},{"name":"_energyPrice","type":"uint256"},{"name":"_profitRate","type":"uint256"},{"name":"_ownerType","type":"uint256"},{"name":"_state","type":"bool"},{"name":"_stationDistance","type":"uint256"},{"name":"_stationExpectedWaitingTime","type":"uint256"},{"name":"_stationConditionIndex","type":"uint256"},{"name":"_ownerConditionID","type":"uint256"}],"name":"addOffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"indexOfOffer","type":"uint256"},{"name":"_state","type":"bool"}],"name":"setOfferState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_ownerType","type":"uint256"}],"name":"getAnOwnerLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lengthOfMoneyExchangeInfoStruct","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var SContractTrade = myContractTrade.at('0x4458f27b82de528687ed76783c7d4c5cce4db5ac');

var userLoginRegister = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getLogID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getUserCondition","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"index","type":"uint256"}],"name":"getMatchUsers","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"}],"name":"getMatchUsersCounts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_socketType","type":"uint256"},{"name":"_chargeType","type":"uint256"},{"name":"_chargeMode","type":"uint256"},{"name":"_stationState","type":"bool"},{"name":"_countOfSameStationCondition","type":"uint256"}],"name":"setUserConditions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"adminLogStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userType","type":"uint256"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numCriteria","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"uint256"},{"name":"registerDate","type":"uint256"},{"name":"numStationCriteria","type":"uint256"},{"name":"quality","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getSelectedUserInformation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_quality","type":"uint256"}],"name":"setStationQuality","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"},{"name":"_userType","type":"uint256"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"startIndex","type":"uint256"}],"name":"getUserLog","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var userLoginRegisterContractAddress = userLoginRegister.at('0xdbfe19980db15e43bf40e3a6581d6f3b7b39d488');//Contract defination of smart deployed contract with its addres
*/
/*var userWalletAddress = getWalletAddress(username[1]);
//document.getElementById("field-evUserWalletAddress").innerHTML = userWalletAddress;
getUserBalanceInfo();
getTransactionCount();
 */ 

getMatchCondition();

function getMatchCondition() {
	
	var userID = userLoginRegisterContractAddress.getUserID(username[1]); 
	var length = userLoginRegisterContractAddress.getMatchUsersCounts(userID);
	
	var matchedUsers=[];

    var index = 0;// First starting index is 0
    for (var i = 0; i < length; i++) {
        var resultMatchUsers = userLoginRegisterContractAddress.getMatchUsers(userID, index, { from: web3.eth.accounts[0], gas: 3000000 });
		//console.log(result);
		//console.log(result);
		index=resultMatchUsers[2];
		matchedUsers.push(resultMatchUsers);
	}

	console.log(matchedUsers);
	console.log(matchedUsers[0][3]);
	
	var matchOfferIndex;
	var matchedUsersOffers=[];
	for(var i=0; i<matchedUsers.length;i++){
		var resultMatchOfferCount=electricVehicleChargingEnergyTradeSystemContractAddress.getMatchOfferCount(/*matchedUsers[i][0],matchedUsers[i][3].c[0]*/"s",0, { from: web3.eth.accounts[0], gas: 3000000 });
		console.log(matchedUsers[0][3]);

		console.log(matchedUsers[i][3].c[0]);

		matchOfferIndex=0;
		for(var j=0; j< resultMatchOfferCount;j++){
			var resultMatchOffer=electricVehicleChargingEnergyTradeSystemContractAddress.getMatchOffer(matchedUsers[i][0],matchedUsers[i][3],matchOfferIndex);
			matchOfferIndex=resultMatchOffer[3];
			matchedUsersOffers.push(resultMatchOffer);
		}
	}


	/*function getMatchOffer(string _stationUserName,uint _stationConditionIndex,uint index) public view returns (uint,uint,uint,uint){ 
        
        uint length=getCurrentUserTransactionLength(_stationUserName,3);
        
        for(uint i=index;i<length;i++)// Browse all datas
        {
            if(keccak256(productInfoStruct[i].ownerName) ==keccak256(_stationUserName) && productInfoStruct[i].stationConditionIndex ==_stationConditionIndex && productInfoStruct[i].state==true)
            {
                return (productInfoStruct[i].energyPrice,productInfoStruct[i].stationDistance,productInfoStruct[i].stationExpectedWaitingTime,index);
            }
        }
        
    } 
    
    function getMatchOfferCount(string _stationUserName,uint _stationConditionIndex) public view returns (uint){ 
        uint length=getCurrentUserTransactionLength(_stationUserName,3);
        uint count=0;
        for(uint i=0;i<length;i++)// Browse all datas
        {
            if(keccak256(productInfoStruct[i].ownerName) ==keccak256(_stationUserName) && productInfoStruct[i].stationConditionIndex ==_stationConditionIndex && productInfoStruct[i].state==true)
            {
                count++;
            }
        }
        return count;
	}*/

/*
	var matchIndex=0;
	for(var i=0; i<matchedUsers.length;i++){
		for(var j=0;j<matchedUsers[i][4];j++){
			var resultStationMatchInfo=electricVehicleChargingEnergyTradeSystemContractAddress.getMatchOffer(matchedUsers[i][0],matchedUsers[i][4],matchIndex, { from: web3.eth.accounts[0], gas: 3000000 });
			console.log(resultStationMatchInfo);
			
			matchIndex=resultStationMatchInfo[3];
		}
	}
*/
};


/* 

    //Match station and EV user's.
    function getMatchUsers(uint userID,uint _socketType,uint _chargeType,uint _chargeMode,bool _stationState,uint index) public view returns (string,uint,uint){
       
        UserInfoStruct storage u=userInfoStruct[userID];
        for(uint i=index;i<userLength;i++)
        {
            for(uint j=0; j<numCriteria;j++)
            {
                if(userInfoStruct[i].userType==3 && userInfoStruct[i].conditions[j].socketType==_socketType && userInfoStruct[i].conditions[j].chargeMode==_chargeMode && userInfoStruct[i].conditions[j].chargeType==_chargeType && userInfoStruct[i].conditions[j].stationState==_stationState)
                {
                    return (userInfoStruct[i].userName, userInfoStruct[i].conditions[j].quality,i+1);
                } 
            }
            
        } 
    } 
*/
/*
$("#btnSearch").click(function () {
	var e = document.getElementById("field-plugType");
	var plugType = e.options[e.selectedIndex].value;
	var AC_DC;
	var distance = 0;

	if (document.getElementById("radioBtnAC").checked == true) AC_DC = 1;
	else AC_DC = 2;
	if (document.getElementById("checkDistance").checked == true) distance = 500;

	console.log(AC_DC);
	console.log(plugType);
	console.log(distance);
	//getOffersThatMatchSelectedFeatures(uint _ownerType,uint _distance,string _plugType, uint _alternative_DirectCurrent) 

	electricVehicleChargingEnergyTradeSystemContractAddress.getOffersThatMatchSelectedFeatures(3, distance, plugType, AC_DC, function (error, result) {
		if (!error) {
			$("#txtSelectedMatch").html('Best match is ' + result[1] + 'ETH. from "' + result[0] + '" ' + result[2] + ' meters away.');//Give output to user. 
			console.log(result);
		} else
			console.error(error);
	});
});*/

function getTransactionCount() {
	var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 0);
	document.getElementById("field-evUserCount").innerHTML = numberOfOffers;
}
/*
function getUserBalanceInfo() {
	web3.eth.getBalance(userWalletAddress, (err, balance) => {
		balance = this.web3.fromWei(balance, "ether") + " ETH";
		document.getElementById("field-evUserGetBalance").innerHTML = balance;
		console.log(balance);
	});
}

function getWalletAddress(_userName) {
	var length = userLoginRegisterContractAddress.registeredUserLength.call();
	let walletAddres;
	for (let i = 0; i < length; i++) {
		var result = userLoginRegisterContractAddress.userInfoStruct(i);
		if (result[1] === _userName) {
			walletAddres = result[0];
		}
	}
	return walletAddres;
} */