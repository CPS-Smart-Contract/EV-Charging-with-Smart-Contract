var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

criteriaDesicion(username[1]);
getRecommendationOffers(maxRankingIndex);

function getRecommendationOffers(maxRankingIndex) {

    var table = document.getElementById("table-Recommendation");
    var row = table.insertRow(1);
  
    var cell_i = row.insertCell(0);
    var cell_username = row.insertCell(1);
    var cell_price = row.insertCell(2);
    var cell_distance = row.insertCell(3);
    var cell_time = row.insertCell(4);
    var cell_quality = row.insertCell(5);
  
    cell_i.innerHTML = 1;
    cell_username.innerHTML = matchedUsersOffers[maxRankingIndex][6];
    cell_price.innerHTML = matchedUsersOffers[maxRankingIndex][0];
    cell_distance.innerHTML = matchedUsersOffers[maxRankingIndex][1];
    cell_time.innerHTML = matchedUsersOffers[maxRankingIndex][2];
    cell_quality.innerHTML = matchedUsersOffers[maxRankingIndex][5];
    console.log(matchedUsersOffers);
  };
function getTransactionCount() {
    var numberOfOffers = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(username[1], 0);
    document.getElementById("field-evUserCount").innerHTML = numberOfOffers;
} 