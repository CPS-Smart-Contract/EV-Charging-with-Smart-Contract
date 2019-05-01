if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// Set the provider you want from Web3.providers.
	web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
}
// Default account defination.
web3.eth.defaultAccount = web3.eth.accounts[0];

document.getElementById("field-userWalletAddress").value = web3.eth.accounts[0];
//document.getElementById("field-userWalletAddress").disabled = true;
console.log(web3.eth.defaultAccount);

var userTypeField = document.getElementById("field-userType");
var socketTypeField = document.getElementById("field-socketType");
var chargeTypeField = document.getElementById("field-chargeType");
var chargeModeField = document.getElementById("field-chargeMode");

function selectedType() {
	var userType = userTypeField.options[userTypeField.selectedIndex].value;
	var socketType = socketTypeField.options[socketTypeField.selectedIndex].value;
	var chargeType = chargeTypeField.options[chargeTypeField.selectedIndex].value;
	var chargeMode = chargeModeField.options[chargeModeField.selectedIndex].value;

	if (userType == 4) {
		document.getElementById("field-socketType").hidden = false;
		document.getElementById("field-chargeType").hidden = false;
		document.getElementById("field-chargeMode").hidden = false;

		document.getElementById("field-socketType").style.display = "inline";
		document.getElementById("field-chargeType").style.display = "inline";
		document.getElementById("field-chargeMode").style.display = "inline";
	} else {
		document.getElementById("field-socketType").style.display = "none";
		document.getElementById("field-chargeType").style.display = "none";
		document.getElementById("field-chargeMode").style.display = "none";
	}
}
function userRegister() {
	try {
		var _userWalletAddress = document.getElementById('field-userWalletAddress').value;
		var _userName = document.getElementById('field-userName').value;
		var _userPassword = document.getElementById('field-password').value;
		var _confirmPassword = document.getElementById('field-confirmPassword').value;

		var userType = userTypeField.options[userTypeField.selectedIndex].value;
		var socketType = socketTypeField.options[socketTypeField.selectedIndex].value;
		var chargeType = chargeTypeField.options[chargeTypeField.selectedIndex].value;
		var chargeMode = chargeModeField.options[chargeModeField.selectedIndex].value;

		console.log(userType);
		console.log(socketType);
		console.log(chargeType);
		console.log(chargeMode);
		// Html select tag definition for selected user type.

		var userType = userTypeField.options[userTypeField.selectedIndex].value;
		// If user wallet address is empty, focus this field.
		if (_userWalletAddress == "") {
			alert('please enter user wallet address');
			document.myregister.input_userWalletAddress.focus();
		}
		// If user name is empty, focus this field.
		else if (_userName == "") {
			alert('please enter username');
			document.myregister.input_userName.focus();
		}
		// If user password is empty, focus this field.
		else if (_userPassword == "") {
			alert('please enter password');
			document.myregister.input_userPassword.focus();
		}
		else if (_userPassword != _confirmPassword) {
			alert('Password not match');
			document.myregister.input_userPassword.focus();
		}
		else {
			// Initialize contract with its ABI.
			//var myContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getLogID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getUserCondition","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"index","type":"uint256"}],"name":"getMatchUsers","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"}],"name":"getMatchUsersCounts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_socketType","type":"uint256"},{"name":"_chargeType","type":"uint256"},{"name":"_chargeMode","type":"uint256"},{"name":"_stationState","type":"bool"},{"name":"_countOfSameStationCondition","type":"uint256"}],"name":"setUserConditions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"adminLogStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userType","type":"uint256"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numCriteria","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"uint256"},{"name":"registerDate","type":"uint256"},{"name":"numStationCriteria","type":"uint256"},{"name":"quality","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userID","type":"uint256"},{"name":"startIndex","type":"uint256"}],"name":"getSelectedUserInformation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"_quality","type":"uint256"}],"name":"setStationQuality","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassword","type":"string"},{"name":"_userType","type":"uint256"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"startIndex","type":"uint256"}],"name":"getUserLog","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
			// Contract defination of smart deployed contract with its address.
			//var userLoginRegisterContractAddress = myContract.at('0xdbfe19980db15e43bf40e3a6581d6f3b7b39d488');
			// Contract userRegister function access with user information.

			var _stationState = true;

			userLoginRegisterContractAddress.checkUserLogin.call(_userName, _userPassword, (error, result) => {
				if (error) {
					return console.log(error);
				} else {
					console.log(result[2]);
					console.log(result[1]);
					if (result[1] == true) {
						alert('Invalid User');
					} else {
						userLoginRegisterContractAddress.userRegister.sendTransaction(_userWalletAddress, _userName, _userPassword, userType, { from: web3.eth.accounts[0], gas: 3000000 }, (error, result) => {
							if (error) {
								return console.log(error);
							}
							else {
								console.log("txhash: " + result);
								alert('Registration Success');
								document.getElementById('field-userName').value = "";
								document.getElementById('field-password').value = "";
								document.getElementById('field-confirmPassword').value = "";
							}
						});

						if (userType == 4) {
							var userID = userLoginRegisterContractAddress.getUserID(_userName);
							userLoginRegisterContractAddress.setUserConditions(userID, socketType, chargeType, chargeMode, true, { from: web3.eth.accounts[0], gas: 3000000 });

						}

					}
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
}