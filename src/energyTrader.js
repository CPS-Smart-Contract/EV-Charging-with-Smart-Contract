var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
//document.getElementById("tname").value = username[1];
//document.getElementById("tname").disabled = true;
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

var userWalletAddress = getWalletAddress(username[1]);
document.getElementById("field-traderWalletAddress").innerHTML = userWalletAddress;
setUserInfo(username[1],userWalletAddress);

var selectedOfferInfo = [];
var selectedOfferprofitRate;
var selectedOfferPrice;
 
getMyOfferHistory(); 
getEnteredUserSales();
getEnteredUserPurchases();

var state = true;
var gasUsed = electricVehicleChargingEnergyTradeSystemContractAddress.addOffer.estimateGas(username[1], selectedOfferPrice, selectedOfferprofitRate, 2, state, 0, 0, 0, { from: web3.eth.accounts[0], gas: 3000000 });
var gasPrice = 4.5; // Average Gwei Amount //Fast --> 25 Gwei  //Cheap --> 4.5 Gwei
var etherPayment = gasUsed * gasPrice / 1000000000;
console.log(etherPayment);
document.getElementById("text-gasUsage").innerHTML = "For Each Operation Estimated Ether Usage: " + etherPayment + " ETH ";

/* Use getMinEnergyPriceAccordingToOwnerType funtion of smart contract to get best value of all
offers. In this page ownerType parametre is 1. Because, Traders need Grid operators's offers. */
electricVehicleChargingEnergyTradeSystemContractAddress.getMinEnergyPriceAccordingToOwnerType(1, function (error, result) {
    if (!error) {
        $("#station").html('Best Price is ' + result[1] + 'ETH. from ' + result[0]);//Give output to user.
        // This javascript function is to create a table and show all offers.
        getGridOffers();
        console.log(result);
    }
    else
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

var selectedOfferInfo = [];
function getGridOffers() {
    var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(1);// Get how many offers of Grid Operators.
    var i;
    var index = 0;// First starting index is 0
    for (i = 0; i < numberOfOffers; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(index, 1);//Smart contract function. Find the next Grid operator.
        var table = document.getElementById("table-gridOpOffers");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_username = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_input = row.insertCell(4);
        var cell_button = row.insertCell(5);

        cell_i.innerHTML = i + 1;//Add Table
        cell_username.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table

        if (result[4] == true)
            cell_state.innerHTML = "Available";//Add Table
        else if (result[4] == false)
            cell_state.innerHTML = "Not Available";

        selectedOfferInfo.push(result);
        cell_input.innerHTML = "<tr><td><input class='form-control' placeholder='Enter profit rate' type='number' id='cell_profitRate" + (i + 1) + "'></input></td></tr>";
        cell_button.innerHTML = "<tr><td><button id='cell_setPrice" + i + "' type='button' class='btn btn-primary btn-rounded btn-fw' value=" + (i + 1) + " onClick='gridSetPrice(value);'>Set Price</button></td></tr>";
        if (result[4] == false)
        { 
            document.getElementById("cell_setPrice"+i).disabled=true;
            document.getElementById("cell_setPrice" + i).innerHTML="Sold"; 
        }
        index = result[2];
    }
}

function gridSetPrice(i) {
    var table = document.getElementById("table-gridOpOffers");
    selectedOfferprofitRate = $("#cell_profitRate" + i).val();
    /* 
    console.log(selectedOfferInfo[i-1][0]); //ownername
    console.log(selectedOfferInfo[i-1][1]); //price
    console.log(selectedOfferInfo[i-1][3]); //time
    console.log(selectedOfferInfo[i-1][4]); //state*/
    var selectedOfferIndex = electricVehicleChargingEnergyTradeSystemContractAddress.getIndexOffer(
        selectedOfferInfo[i - 1][0],
        selectedOfferInfo[i - 1][1],
        1,
        selectedOfferInfo[i - 1][3],
    );

    var traderUserID = userLoginRegisterContractAddress.getUserID.call(username[1]);
    var traderUserWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(traderUserID)[0];

    var gridUserID = userLoginRegisterContractAddress.getUserID.call(selectedOfferInfo[i-1][0]);
    var gridUserWalletAddress = userLoginRegisterContractAddress.userInfoStruct.call(gridUserID)[0];

    var amount = web3.toWei(selectedOfferInfo[i - 1][1], "ether");
    electricVehicleChargingEnergyTradeSystemContractAddress.addOffer(username[1], selectedOfferInfo[i-1][1], selectedOfferprofitRate, 2, state, 0, 0, 0, { from: web3.eth.accounts[0], gas: 3000000 });
    web3.eth.sendTransaction({ from: traderUserWalletAddress, to: gridUserWalletAddress, value: amount });
    electricVehicleChargingEnergyTradeSystemContractAddress.addMoneyExchangeTransaction(
        traderUserWalletAddress,
        username[1],
        gridUserWalletAddress,
        selectedOfferInfo[i - 1][0],
        amount,
        { from: web3.eth.accounts[0], gas: 3000000 }
    );
    electricVehicleChargingEnergyTradeSystemContractAddress.setOfferState(selectedOfferIndex, false);
    alert('Purchase was completed.');
    document.getElementById("cell_setPrice" + (i-1)).disabled = true;
    document.getElementById("cell_setPrice" + (i-1)).innerHTML = "Sold";
    getUserBalanceInfo();
    getTransactionCount();
    getMyOfferHistory();
}

var tableLenght;
function getMyOfferHistory() {
    for (var i = tableLenght; i >= 1; i--) {
        document.getElementById("table-traderMyOfferHistory").deleteRow(i);
    }
    var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 2);// Get how many offers of Grid Operators.
    tableLenght = numberOfOffers;
    var i;
    var index = 0;// First starting index is 0
    for (i = 0; i < numberOfOffers; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserAllTransactions(username[1], index, 2);//Smart contract function. Find the next Grid operator.
        var table = document.getElementById("table-traderMyOfferHistory");
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

            cell_i.innerHTML = index;//Add Table
            cell_from.innerHTML = result[1];//Add Table
            cell_to.innerHTML = result[3];//Add Table
            cell_cost.innerHTML = result[4] / 1000000000000000000;// wei to ETH
            cell_time.innerHTML = formattedDate;//Add Table
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

            cell_i.innerHTML = index;//Add Table
            cell_from.innerHTML = result[1];//Add Table
            cell_to.innerHTML = result[3];//Add Table
            cell_cost.innerHTML = result[4] / 1000000000000000000;// wei to ETH
            cell_time.innerHTML = formattedDate;//Add Table
        }
    }
}