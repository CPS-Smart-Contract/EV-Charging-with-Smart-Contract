var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

var userWalletAddress = getWalletAddress(username[1]);
document.getElementById("field-stationWalletAddress").innerHTML = userWalletAddress;

getUserBalanceInfo();
getTransactionCount();
getEnteredUserSales();
getEnteredUserPurchases();
getMyOfferHistory();

var _stationQuality = 0;
var _stationDistance = Math.floor(Math.random() * 101) + 10;;
var _stationExpectedWaitingTime = Math.floor(Math.random() * 101) + 10;

var state = true;

var userID = userLoginRegisterContractAddress.getUserID(username[1]);
var selectedOfferprofitRate;
var selectedOfferPrice;
var gasUsed = electricVehicleChargingEnergyTradeSystemContractAddress.addOffer.estimateGas(username[1], selectedOfferPrice, selectedOfferprofitRate, 3, state, _stationDistance, _stationExpectedWaitingTime, 0, { from: web3.eth.accounts[0], gas: 3000000 });
var gasPrice = 4.5; // Average Gwei Amount //Fast --> 25 Gwei  //Cheap --> 4.5 Gwei
var etherPayment = gasUsed * gasPrice / 1000000000;
console.log(etherPayment);
document.getElementById("text-gasUsage").innerHTML = "For Each Operation Estimated Ether Usage: " + etherPayment + " ETH ";

/* Use getMinEnergyPriceAccordingToOwnerType funtion of smart contract to get best value of all
offers. In this page ownerType parametre is o. Because, Stations need Energy Trader's offers. */
electricVehicleChargingEnergyTradeSystemContractAddress.getMinEnergyPriceAccordingToOwnerType(2, function (error, result) {
    if (!error) {
        $("#station").html('Best Price is ' + result[1] + 'ETH. from ' + result[0]); //Give output to user.
        getTraderOffers();
        console.log(result);
    } else
        console.error(error);
});

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

function getTransactionCount() {
    var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 3);
    document.getElementById("field-stationCount").innerHTML = numberOfOffers;
}

function getUserBalanceInfo() {
    web3.eth.getBalance(userWalletAddress, (err, balance) => {
        balance = this.web3.fromWei(balance, "ether") + " ETH"
        document.getElementById("field-stationGetBalance").innerHTML = balance;
        console.log(balance);
    });
}

function getTraderOffers() {
    var length = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(2);
    var i;
    var index = 0; // First starting index is 0
    for (i = 0; i < length; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(index, 2); //Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("table-TraderOffers");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_username = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_input = row.insertCell(4);
        var cell_socketType = row.insertCell(5);
        var cell_chargeType = row.insertCell(6);
        var cell_chargeMode = row.insertCell(7);
        var cell_button = row.insertCell(8);

        cell_i.innerHTML = i + 1; //Add Table
        cell_username.innerHTML = result[0]; //Add Table
        cell_price.innerHTML = result[1]; //Add Table

        if (result[4] == true)
            cell_state.innerHTML = "Available"; //Add Table
        else if (result[4] == false)
            cell_state.innerHTML = "Not Available";

        cell_input.innerHTML = "<tr><td><input class='form-control' placeholder='Enter profit rate' type='number' id='cell_profitRate" + (i + 1) + "'></input></td></tr>";
        cell_socketType.innerHTML = "<tr><td><select id='field-socketType" + (i + 1) + "' class='form-control'><option value='1'>Type-1 (SAE 1772)</option><option value='2'>Type-2 (IEC 62196)</option><option value='3'>Type-3 (EVPA)</option><option value='4'>Type-4 (CHAdeMo)</option><option value='5'>Combo</option></select></td></tr>";
        cell_chargeType.innerHTML = "<tr><td><select id='field-chargeType" + (i + 1) + "' class='form-control'><option value='1'>Slow Charge</option><option value='2'>Normal Charge</option><option value='3'>Quick Charge</option></select></td></tr>";
        cell_chargeMode.innerHTML = "<tr><td><select id='field-chargeMode" + (i + 1) + "' class='form-control'><option value='1'>Mode 1</option><option value='2'>Mode 2</option><option value='3'>Mode 3</option><option value='4'>Mode 4</option></select></td></tr>";
        cell_button.innerHTML = "<tr><td><button id='cell_setPrice" + i + "' type='button' class='btn btn-primary btn-rounded btn-fw' value=" + (i + 1) + " onClick='gridSetPrice(value);'>Set Price</button></td></tr>";

        //console.log("<tr><td><button id='cell_setPrice" + i + "' type='button' class='btn btn-primary btn-rounded btn-fw' value=" + i + " onClick='gridSetPrice(value);'>Set Price</button></td></tr>");
        index = result[2]; // New index is return value of smart contract function.
    }
};
// This function to add new offers to productInfoStruct. 

function gridSetPrice(i) {
    var table = document.getElementById("table-TraderOffers");
    selectedOfferprofitRate = $("#cell_profitRate" + i).val();
    console.log($("#field-socketType" + i).val());
    console.log($("#field-chargeType" + i).val());
    console.log($("#field-chargeMode" + i).val());
    selectedOfferPrice = table.rows[i].cells[2].innerHTML;

    var _stationDistance = Math.floor(Math.random() * 201) + 1;
    var _stationExpectedWaitingTime = Math.floor(Math.random() * 121) + 0;

    var resultIsThereSameCondition = userLoginRegisterContractAddress.isThereSameCondition(userID, $("#field-socketType" + i).val(), $("#field-chargeType" + i).val(), $("#field-chargeMode" + i).val(), true, { from: web3.eth.accounts[0], gas: 3000000 });
    if (!resultIsThereSameCondition[0]) {
        userLoginRegisterContractAddress.setUserConditions(userID, $("#field-socketType" + i).val(), $("#field-chargeType" + i).val(), $("#field-chargeMode" + i).val(), true, { from: web3.eth.accounts[0], gas: 3000000 });
    }
    electricVehicleChargingEnergyTradeSystemContractAddress.addOffer(username[1], selectedOfferPrice, selectedOfferprofitRate, 3, state, _stationDistance, _stationExpectedWaitingTime, resultIsThereSameCondition[1], { from: web3.eth.accounts[0], gas: 3000000 });

    getUserBalanceInfo();
    getTransactionCount();
    getMyOfferHistory();
}

var tableLenght;

function getMyOfferHistory() {
    for (var i = tableLenght; i >= 1; i--) {
        document.getElementById("table-StationOfferHistory").deleteRow(i);
    }
    var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 2); // Get how many offers of Grid Operators.
    tableLenght = numberOfOffers;
    var i;
    var index = 0; // First starting index is 0
    for (i = 0; i < numberOfOffers; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserAllTransactions(username[1], index, 2); //Smart contract function. Find the next Grid operator.
        var table = document.getElementById("table-StationOfferHistory");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_username = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_transactionTime = row.insertCell(4);

        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

        cell_i.innerHTML = i + 1; //Add Table
        cell_username.innerHTML = result[0]; //Add Table
        cell_price.innerHTML = result[1]; //Add Table
        cell_transactionTime.innerHTML = formattedDate;
        if (result[4] == true)
            cell_state.innerHTML = "Available"; //Add Table
        else if (result[4] == false)
            cell_state.innerHTML = "Not Available";

        index = result[2]; // New index is return value of smart function.
    }
}

var tblLenght;

function getEnteredUserSales() {
    for (var i = tblLenght; i >= 1; i--) {
        document.getElementById("table-enteredUserSalesInfo").deleteRow(i);
    }
    var length = electricVehicleChargingEnergyTradeSystemContractAddress.lengthOfMoneyExchangeInfoStruct.call();
    tblLenght = length;
    var _username = username[1];
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

            cell_i.innerHTML = index; //Add Table
            cell_from.innerHTML = result[1]; //Add Table
            cell_to.innerHTML = result[3]; //Add Table
            cell_cost.innerHTML = result[4] / 1000000000000000000; // wei to ETH
            cell_time.innerHTML = formattedDate; //Add Table
        }
    }
}

var tbLenght;

function getEnteredUserPurchases() {
    for (var i = tbLenght; i >= 1; i--) {
        document.getElementById("table-enteredUserPurchasesInfo").deleteRow(i);
    }
    var length = electricVehicleChargingEnergyTradeSystemContractAddress.lengthOfMoneyExchangeInfoStruct.call();
    tbLenght = length;
    var _username = username[1];
    var index = 0;
    for (var i = 0; i < length; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.moneyExchangeInfoStruct(i);

        var table = document.getElementById("table-enteredUserPurchasesInfo");
        var row = table.insertRow(i + 1);

        if (result[1] == _username) {
            index++;
            var cell_i = row.insertCell(0);
            var cell_from = row.insertCell(1);
            var cell_to = row.insertCell(2);
            var cell_cost = row.insertCell(3);
            var cell_time = row.insertCell(4);

            var date = new Date(result[5] * 1000);
            var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

            cell_i.innerHTML = index; //Add Table
            cell_from.innerHTML = result[1]; //Add Table
            cell_to.innerHTML = result[3]; //Add Table
            cell_cost.innerHTML = result[4] / 1000000000000000000; // wei to ETH
            cell_time.innerHTML = formattedDate; //Add Table
        }
    }
}


var tableLenght;

function getMyOfferHistory() {
    for (var i = tableLenght; i >= 1; i--) {
        document.getElementById("table-StationOfferHistory").deleteRow(i);
    }
    var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 3); // Get how many offers of Grid Operators.
    tableLenght = numberOfOffers;
    var i;
    var index = 0; // First starting index is 0
    for (i = 0; i < numberOfOffers; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserAllTransactions(username[1], index, 3); //Smart contract function. Find the next Grid operator.
        var table = document.getElementById("table-StationOfferHistory");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_username = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_transactionTime = row.insertCell(4);

        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);


        cell_i.innerHTML = i + 1; //Add Table
        cell_username.innerHTML = result[0]; //Add Table
        cell_price.innerHTML = result[1]; //Add Table
        cell_transactionTime.innerHTML = formattedDate;
        if (result[4] == true)
            cell_state.innerHTML = "Available"; //Add Table
        else if (result[4] == false)
            cell_state.innerHTML = "Not Available";

        index = result[2]; // New index is return value of smart function.
    }
};