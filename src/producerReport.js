var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];

getAllOfferLog();
function getAllOfferLog() {
    var _userType = 0;
    var length = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(_userType);
    var index = 0;// First starting index is 0
    for (var i = 0; i < length; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(index, _userType);//Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("table-allOffersProducerReport");
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
        cell_time.innerHTML = formattedDate;//Add Table

        index = result[2];// New index is return value of smart contract function.
    }
};
var tableLenght = 0;
function getEnteredUserOfferLog() {
    for (var i = tableLenght; i >= 1; i--) {
        document.getElementById("table-enteredUserOffersProducerReport").deleteRow(i);
    }
    var _username = document.getElementById("log-Username").value;
    var _userType = 0;
    var length = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserTransactionLength(_username, _userType);
    tableLenght = length;
    var index = 0;// First starting index is 0
    for (var i = 0; i < length; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserAllTransactions(_username, index, _userType);//Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("table-enteredUserOffersProducerReport");
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
        index = result[2];
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
////////////////////////////////

function getAllOfferLogCSV() {
    var _userType = 0;
    var length = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(_userType);
    var index = 0;// First starting index is 0
    const storage = [];
    storage.push(['#', 'Energy Producer', 'Price', 'State', 'Transaction Time']);

    for (var i = 0; i < length; i++) {
        var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(index, _userType);//Smart contract function. Find the next Energy Producer.
        index = result[2];// New index is return value of smart contract function.
        //CSV

        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

        storage.push([i + 1, result[0], result[1], result[4], formattedDate]);
    }
    //CSV
    const csvData = objectToCsv(storage);
    download(csvData, "ProducerAllOffers.csv");
};
window.onload = function () {

    // Initial Values
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        exportFileName: "Producer_Report_Graph",
        exportEnabled: true,
        legend: {
            cursor: "pointer",
            itemclick: explodePie
        },
        title: {
            text: "Producer Offers"
        },
        axisY: {
            title: "Price",
            suffix: ""
        },
        data: [{
            type: "line",
            yValueFormatString: "#,###",
            indexLabel: "{y}",
            dataPoints: [{ label: "Producer", y: 0 }]
        }]
    });
    function explodePie(e) {
        if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();
    }

    function updateChart() {
        var dps = chart.options.data[0].dataPoints;
        var _userType = 0;
        var length = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(_userType);
        var index = 0;// First starting index is 0
        for (var i = 0; i < length; i++) {
            var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(index, _userType);
            var producerName = result[0];
            var producerPrice = result[1];

            var date = new Date(result[3] * 1000);
            var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
            index = result[2];

            dps[i] = { label: producerName, y: producerPrice.c[0] };
            console.log(producerPrice.c);
        }
        chart.options.data[0].dataPoints = dps;
        chart.render();
    };
    updateChart();
    //setInterval(function () { updateChart() }, 5000);  
    chart.render();
}