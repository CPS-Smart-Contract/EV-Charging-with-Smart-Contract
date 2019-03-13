var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

function getTransactionCount() {
    var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 0);
    document.getElementById("field-evUserCount").innerHTML = numberOfOffers;
} 