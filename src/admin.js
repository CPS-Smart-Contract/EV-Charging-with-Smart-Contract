var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];
getEachUserTypeCount();
getLog();

function getLog() {
    var username = "undefined";
    var numberOfLog = userLoginRegisterContractAddress.getUserLogLength(username);
    var i;
    var index = 0; // First starting index is 0
    var ii = numberOfLog;
    for (i = numberOfLog; i > 0; i--) {
        var result = userLoginRegisterContractAddress.getUserLog(username, index); //Smart contract function. Find the next Grid operator.
        var table = document.getElementById("table-userLastLogin");
        var row = table.insertRow(1);

        var cell_i = row.insertCell(0);
        var cell_wallet = row.insertCell(1);
        var cell_userName = row.insertCell(2);
        var cell_userType = row.insertCell(3);
        var cell_time = row.insertCell(4);

        var date = new Date(result[3] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

        var userType;
        if (result[2] == 0) userType = "Producer";
        else if (result[2] == 1) userType = "Grid Operator";
        else if (result[2] == 2) userType = "Trader";
        else if (result[2] == 3) userType = "Station";
        else if (result[2] == 4) userType = "EV User";
        else if (result[2] == 6) userType = "Admin";

        cell_i.innerHTML = ii; //Add Table
        cell_wallet.innerHTML = result[0]; //Add Table
        cell_userName.innerHTML = result[1]; //Add Table
        cell_userType.innerHTML = userType; //Add Table
        cell_time.innerHTML = formattedDate; //Add Table
        index = result[4]; // New index is return value of smart function.
        ii--;
    }
};

function getEachUserTypeCount() {
    var producerLength = userLoginRegisterContractAddress.getUserTypeLength(0);
    var gridOpLength = userLoginRegisterContractAddress.getUserTypeLength(1);
    var traderLength = userLoginRegisterContractAddress.getUserTypeLength(2);
    var stationLength = userLoginRegisterContractAddress.getUserTypeLength(3);
    var evLength = userLoginRegisterContractAddress.getUserTypeLength(4);

    document.getElementById("field-usersProducerCount").innerHTML = producerLength;
    document.getElementById("field-usersGridOpCount").innerHTML = gridOpLength;
    document.getElementById("field-usersTraderCount").innerHTML = traderLength;
    document.getElementById("field-usersStationCount").innerHTML = stationLength;
}

window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        title: {
            text: "Share Value of Two Companies"
        },
        axisX: {
            //title: "chart updates every 3 secs"
        },
        axisY: {
            prefix: "$",
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            /*yValueFormatString: "$####.00",
            xValueFormatString: "hh:mm:ss TT",*/
            showInLegend: true,
            name: "Producer",
            dataPoints: [{ label: "", y: 0 }]
        },
        {
            type: "line",
            xValueType: "dateTime",
            /*yValueFormatString: "$####.00",*/
            showInLegend: true,
            name: "Grid Operator",
            dataPoints: [{ label: "", y: 0 }]
        },
        {
            type: "line",
            xValueType: "dateTime",
            /*yValueFormatString: "$####.00",*/
            showInLegend: true,
            name: "Trader",
            dataPoints: [{ label: "", y: 0 }]
        },
        {
            type: "line",
            xValueType: "dateTime",
            /*yValueFormatString: "$####.00",*/
            showInLegend: true,
            name: "Station",
            dataPoints: [{ label: "", y: 0 }]
        }
        ]
    });

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    var firstDataLength = loadChart();
    var updateInterval = 15000;
    var dataProducer;
    var dataGrid;
    var dataTrader;
    var dataStation;

    function loadChart() {

        var firstDataLength = electricVehicleChargingEnergyTradeSystemContractAddress.lengthOfProductInfoStruct.call();
        //var producerIndex = 0;// First starting index is 0

        for (var i = 0; i < firstDataLength; i++) {
            var offer = electricVehicleChargingEnergyTradeSystemContractAddress.productInfoStruct.call(i);
            var ownerType = offer[2];
            var price = offer[1];
            var date = new Date(offer[3] * 1000);
            var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
            dataProducer = chart.options.data[0].dataPoints;
            dataGrid = chart.options.data[1].dataPoints;
            dataTrader = chart.options.data[2].dataPoints;
            dataStation = chart.options.data[3].dataPoints;
            if (ownerType == 0) {
                dataProducer.push({ label: formattedDate, y: price.c[0] });
            } else if (ownerType == 1) {
                dataGrid.push({ label: formattedDate, y: price.c[0] });
            } else if (ownerType == 2) {
                dataTrader.push({ label: formattedDate, y: price.c[0] });
            } else if (ownerType == 3) {
                dataStation.push({ label: formattedDate, y: price.c[0] });
            }
        }
        return firstDataLength;
    }

    function updateChart() {
        var dataLength = electricVehicleChargingEnergyTradeSystemContractAddress.lengthOfProductInfoStruct.call();
        if (firstDataLength < dataLength) {
            /*
            var dataProducer = chart.options.data[0].dataPoints;
            var dataGrid = chart.options.data[1].dataPoints;
            var dataTrader = chart.options.data[2].dataPoints;
            var dataStation = chart.options.data[3].dataPoints;*/

            for (var i = firstDataLength; i < dataLength; i++) {
                var offer = electricVehicleChargingEnergyTradeSystemContractAddress.productInfoStruct.call(i);
                var ownerType = offer[2];
                var price = offer[1];
                var date = new Date(offer[3] * 1000);
                var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

                if (ownerType == 0) {
                    dataProducer.push({ label: formattedDate, y: price.c[0] });
                } else if (ownerType == 1) {
                    dataGrid.push({ label: formattedDate, y: price.c[0] });
                } else if (ownerType == 2) {
                    dataTrader.push({ label: formattedDate, y: price.c[0] });
                } else if (ownerType == 3) {
                    dataStation.push({ label: formattedDate, y: price.c[0] });
                }
            }
            firstDataLength=dataLength;
        }
    }
    chart.render();
    setInterval(function () { updateChart() }, updateInterval);
}


/*
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
}*/