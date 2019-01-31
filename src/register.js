function userRegister() {
	try {
		var _userWalletAddress = document.getElementById('field-userWalletAddress').value;
		var _userName = document.getElementById('field-userName').value;
		var _userPassword = document.getElementById('field-password').value;
		var _confirmPassword = document.getElementById('field-confirmPassword').value;
		// Html select tag definition for selected user type.
		var e = document.getElementById("field-userType");
		var userType = e.options[e.selectedIndex].value;

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
			if (typeof web3 !== 'undefined') {
				web3 = new Web3(web3.currentProvider);
			} else {
				// Set the provider you want from Web3.providers.
				web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
			}
			// Default account defination.
			web3.eth.defaultAccount = web3.eth.accounts[0];
			// Initialize contract with its ABI.
			var myContract =  web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"},{"name":"_userType","type":"string"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"adminLogStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userType","type":"string"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"registeredUserLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"startIndex","type":"uint256"}],"name":"getUserLog","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
			// Contract defination of smart deployed contract with its address.
			var SContract = myContract.at('0x2fcf23c70cb134438c0c65b89200d95135bf009e');
			// Contract userRegister function access with user information.
			SContract.checkUserLogin.call(_userName, _userPassword, (error, result) => {
				if (error) {
					return console.log(error);
				} else {
					console.log(result[1]);
					if (result[1] == true) {
						alert('Invalid User');
					} else {
						SContract.userRegister.sendTransaction(_userWalletAddress, _userName, _userPassword, userType, { from: web3.eth.accounts[0], gas: 3000000 }, (error, result) => {
							if (error) {
								return console.log(error);
							}
							else {
								console.log("txhash: " + result);
								alert('Registration Success');
								document.getElementById('field-userWalletAddress').value = "";
								document.getElementById('field-userName').value = "";
								document.getElementById('field-password').value = "";
								document.getElementById('field-confirmPassword').value = "";
							}
						});
					}
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
}