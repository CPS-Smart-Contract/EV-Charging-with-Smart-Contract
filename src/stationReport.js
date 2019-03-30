var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

function getAllOfferLog() {
    var _userType = 3;
    var length = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(_userType);
    var index = 0;// First starting index is 0
    for (var i = 0; i < length; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(index, _userType);//Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("table-allOffersStationReport");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_name = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_time = row.insertCell(4);

        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

        cell_i.innerHTML = i + 1;//Add Table
        cell_name.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table
        cell_state.innerHTML = result[4];//Add Table
        cell_time.innerHTML = formattedDate;// New index is return value of smart contract function.
        index = result[2];// New index is return value of smart contract function.
    }
};
var tableLenght = 0;
function getEnteredUserOfferLog() {
    for (var i = tableLenght; i >= 1; i--) {
        document.getElementById("table-enteredUserOffersStationReport").deleteRow(i);
    }
    var _username = document.getElementById("log-Username").value;
    var _userType = 3;
    var length = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(_username, _userType);
    tableLenght = length;
    var index = 0;// First starting index is 0
    for (var i = 0; i < length; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserAllTransactions(_username, index, _userType);//Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("table-enteredUserOffersStationReport");
        var row = table.insertRow(i + 1);

        var cell_i = row.insertCell(0);
        var cell_name = row.insertCell(1);
        var cell_price = row.insertCell(2);
        var cell_state = row.insertCell(3);
        var cell_time = row.insertCell(4);

        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

        cell_i.innerHTML = i + 1;//Add Table
        cell_name.innerHTML = result[0];//Add Table
        cell_price.innerHTML = result[1];//Add Table
        cell_state.innerHTML = result[4];//Add Table
        cell_time.innerHTML = formattedDate;// New index is return value of smart contract function.
        index = result[2];// New index is return value of smart contract function.
    }
};

function objectToCsv(data) {
    const csvRows = [];

    //get the header
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(';'));

    // loop over the rows
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(';'));
    }
    return csvRows.join('\n');
}

function download(data, name) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function getAllOfferLogCSV() {
    var _userType = 3;
    var length = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(_userType);
    var index = 0;// First starting index is 0
    const storage = [];
    storage.push(['#', 'Energy Station', 'Price', 'State', 'Transaction Time']);

    for (var i = 0; i < length; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(index, _userType);//Smart contract function. Find the next Energy Producer.
        index = result[2];// New index is return value of smart contract function.

        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

        storage.push([i + 1, result[0], result[1], result[4], formattedDate]);
    }
    //CSV
    const csvData = objectToCsv(storage);
    download(csvData, "StationAllOffers.csv");
};