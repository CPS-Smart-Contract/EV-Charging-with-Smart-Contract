function validationcheck() {
			var username = document.getElementById("field-username").value;
			var password = document.getElementById("field-psw").value;

			// if html user name field is empty, focus this field.
			if (username == "") {
				console.log('please enter username');
			}
			// if html user password field is empty, focus this field. 
			else if (password == "") {
				console.log('please enter password');
			} else {
				if (typeof web3 !== 'undefined') {
					web3 = new Web3(web3.currentProvider);
				} else {
					// Set the provider you want from Web3.providers
					web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
				}
				// Default account defination
				web3.eth.defaultAccount = web3.eth.accounts[0];
				// Initialize contract with its ABI
				var myContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"Time_call","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"},{"name":"_userType","type":"string"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"}],"name":"getUserLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminLogLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"adminLogStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userType","type":"string"},{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"registeredUserLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"startIndex","type":"uint256"}],"name":"getUserLog","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
				var SContract = myContract.at('0xd2b46e98427fc3250042238cd4c5ba85d0e094d5');

				SContract.checkUserLogin.sendTransaction(username, password, { from: web3.eth.accounts[0], gas: 3000000 }, (error, result) => {
					if (error) {
						return console.log(error);
					}
					else {
						console.error(result);
						SContract.checkUserLogin.call(username, password, { from: web3.eth.accounts[0], gas: 3000000 }, function (error, result) {
							if (!error) {
								// If status value is true, user direct related page.
								if (result[1] == true) {
									var actionName = result[0] + ".html";
									if (actionName != "") {
										console.log(actionName);
										document.getElementById("form_id").action = actionName;
										document.getElementById("form_id").submit();
									} else {
										alert("Please set form action");
									}
								}
								else {
									// If status value is false, return error.
									console.log(result[0]);
								}
							}
							else {
								console.error(error);
							}
						});
					}
				});
			}
		}