var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];



getMatchCondition();

function getMatchCondition() {

    var userID = userLoginRegisterContractAddress.getUserID(username[1]);
    var length = userLoginRegisterContractAddress.getMatchUsersCounts(userID);
    //console.log(length);
    var matchedUsers = [];

    var index = 0; // First starting index is 0
    for (var i = 0; i < length; i++) {
        var resultMatchUsers = userLoginRegisterContractAddress.getMatchUsers(userID, index, { from: web3.eth.accounts[0], gas: 3000000 });
        //console.log(result);
        //console.log(result);
        index = resultMatchUsers[2];
        matchedUsers.push(resultMatchUsers);
    }

    //console.log(matchedUsers);
    //console.log(matchedUsers[0][3]);

    var matchOfferIndex;
    var matchedUsersOffers = [];
    for (var i = 0; i < matchedUsers.length; i++) {
        //var resultMatchOfferCount = electricVehicleChargingEnergyTradeSystemContractAddress.getMatchOfferCount1(matchedUsers[i][0], matchedUsers[i][3].c[0], { from: web3.eth.accounts[0], gas: 3000000 });
        console.log(matchedUsers[0][3]); //Condition id

        //console.log(matchedUsers[i][3].c[0]);
        //console.log(resultMatchOfferCount); // Offer count
        matchOfferIndex = 0;
        for (var j = 0;; j++) {
            var resultMatchOffer = electricVehicleChargingEnergyTradeSystemContractAddress.getMatchOffer(matchedUsers[i][0], matchedUsers[i][3], matchOfferIndex);
            if (resultMatchOffer[4] == false) {
                break;
            }
            matchedUsersOffers.push(resultMatchOffer);
            matchOfferIndex = resultMatchOffer[3];
        }
    }
    console.log(matchedUsersOffers);

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