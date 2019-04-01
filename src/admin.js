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
  var index = 0;// First starting index is 0
  var ii = numberOfLog;
  for (i = numberOfLog; i > 0; i--) {
    var result = userLoginRegisterContractAddress.getUserLog(username, index);//Smart contract function. Find the next Grid operator.
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

    cell_i.innerHTML = ii;//Add Table
    cell_wallet.innerHTML = result[0];//Add Table
    cell_userName.innerHTML = result[1];//Add Table
    cell_userType.innerHTML = userType;//Add Table
    cell_time.innerHTML = formattedDate;//Add Table
    index = result[4];// New index is return value of smart function.
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


/*window.onload = function () {

  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "light2",
    title: {
      text: "User Count of Each Type"
    },

    axisY: {
      title: "User Count",
      suffix: ""
    },
    data: [{
      type: "column",
      yValueFormatString: "#,###",
      indexLabel: "{y}",
      dataPoints: [
        { label: "Producer", y: 0 },
        { label: "Grid Operator", y: 0 },
        { label: "Trader", y: 0 },
        { label: "Station", y: 0 },
        { label: "EV User", y: 0 }
      ]
    }]
  });

  function updateChart() {
    var dps = chart.options.data[0].dataPoints;

    var producerLength = userLoginRegisterContractAddress.getUserTypeLength(0);
    var gridOpLength = userLoginRegisterContractAddress.getUserTypeLength(1);
    var traderLength = userLoginRegisterContractAddress.getUserTypeLength(2);
    var stationLength = userLoginRegisterContractAddress.getUserTypeLength(3);
    var evLength = userLoginRegisterContractAddress.getUserTypeLength(4);

    document.getElementById("field-usersProducerCount").innerHTML = producerLength;
    document.getElementById("field-usersGridOpCount").innerHTML = gridOpLength;
    document.getElementById("field-usersTraderCount").innerHTML = traderLength;
    document.getElementById("field-usersStationCount").innerHTML = stationLength;
    //for (var i = 0; i < dps.length; i++) {
    //deltaY = Math.round(2 + Math.random() * (-2 - 2));
    //yVal = deltaY + dps[i].y > 0 ? dps[i].y + deltaY : 0;
    //boilerColor = yVal > 200 ? "#FF2500" : yVal >= 170 ? "#FF6000" : yVal < 170 ? "#6B8E23 " : null;
    //dps[i] = {label: "Boiler "+(i+1) , y: yVal, color: boilerColor};
    dps[0].y = producerLength.c[0];
    dps[1].y = gridOpLength.c[0];
    dps[2].y = traderLength.c[0];
    dps[3].y = stationLength.c[0];
    dps[4].y = evLength.c[0];

    //}
    chart.options.data[0].dataPoints = dps;
    chart.render();
  };
  updateChart();
  //setInterval(function () { updateChart() }, 5000);
}*/




window.onload = function () {

  /*var dataPoints1 = [];
  var dataPoints2 = [];
*/
  var chart = new CanvasJS.Chart("chartContainer", {
    zoomEnabled: true,
    title: {
      text: "Share Value of Two Companies"
    },
    axisX: {
      title: "chart updates every 3 secs"
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
    }]
  });

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
  updateChart();
  var updateInterval = 1000;
  // initial value

  //var yValue1 = 600;
  //var yValue2 = 605;

  function updateChart() {
    
    var producerLength = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(0);
    var producerIndex = 0;// First starting index is 0
    var dataProducer = chart.options.data[0].dataPoints;

    for (var i = producerIndex; i < producerLength; i++) {
      var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(producerIndex, 0);
      var producerName = result[0];
      var producerPrice = result[1];

      var producerDate = new Date(result[3] * 1000);
      var formattedProducerDate = ('0' + producerDate.getDate()).slice(-2) + '/' + ('0' + (producerDate.getMonth() + 1)).slice(-2) + '/' + producerDate.getFullYear() + ' ' + ('0' + producerDate.getHours()).slice(-2) + ':' + ('0' + producerDate.getMinutes()).slice(-2);
      producerIndex = result[2];

      dataProducer[i] = { label: formattedProducerDate, y: producerPrice.c[0] };
    }

    var gridLength = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(1);
    var gridIndex = 0;// First starting index is 0 
    var dataGrid = chart.options.data[1].dataPoints;

    for (var i = gridIndex; i < gridLength; i++) {
      var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(gridIndex, 1);
      var gridName = result[0];
      var gridPrice = result[1];

      var date = new Date(result[3] * 1000);
      var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
      gridIndex = result[2];

      dataGrid[i] = { label: formattedDate, y: gridPrice.c[0] };
    }
    //////////////////////////////////
    var traderLength = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(2);
    var traderIndex = 0;// First starting index is 0 
    var dataTrader = chart.options.data[2].dataPoints;

    for (var i = traderIndex; i < traderLength; i++) {
      var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(traderIndex, 2);
      var traderName = result[0];
      var traderPrice = result[1];

      var date = new Date(result[3] * 1000);
      var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
      traderIndex = result[2];

      dataTrader[i] = { label: formattedDate, y: traderPrice.c[0] };
    }
    ///////////////////////////////////////
    var stationLength = electricVehicleChargingEnergyTradeSystemContractAddress.getAnOwnerLength(3);
    var stationIndex = 0;// First starting index is 0 
    var dataStation = chart.options.data[3].dataPoints;

    for (var i = stationIndex; i < stationLength; i++) {
      var result = electricVehicleChargingEnergyTradeSystemContractAddress.wantedValueofProductInfoStruct(stationIndex, 3);
      var stationName = result[0];
      var stationPrice = result[1];

      var date = new Date(result[3] * 1000);
      var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
      stationIndex = result[2];

      dataStation[i] = { label: formattedDate, y: stationPrice.c[0] };
    }
  }

  // updating legend text with  updated with y Value 
  /*chart.options.data[0].legendText = " Company A  $" + yValue1;
  chart.options.data[1].legendText = " Company B  $" + yValue2;*/
  chart.render();
  // generates first set of dataPoints 
  
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