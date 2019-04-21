var userName;

function setUserInfo(_userName) {
    userName = _userName;
}

window.onload = function () {

    var dpsIncome = [];
    var dpsExpenditure = [];
    var chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        exportFileName: "offer_graph",
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Monthly Income/Expenditure"
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
            //itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            xValueType: "dateTime",
            markerType: "triangle",
            /*yValueFormatString: "$####.00",
            xValueFormatString: "hh:mm:ss TT",*/
            //showInLegend: true,
            name: "Income",
            dataPoints: dpsIncome//[{ label: "", y: 0 }]
        },
        {
            type: "column",
            xValueType: "dateTime",
            markerType: "triangle",
            /*yValueFormatString: "$####.00",
            xValueFormatString: "hh:mm:ss TT",*/
            //showInLegend: true,
            name: "Expenditure",
            dataPoints: dpsExpenditure//[{ label: "", y: 0 }]
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
    var firstIncomeLength;
    var firstExpenditureLength;
    var updateInterval = 3000;
    var lastIndexIncome = loadChartIncome();
    var lastIndexExpenditure = loadChartExpenditure();

    var monthlyIncome;

    var monthlyExpenditure;
    function loadChartIncome() {
        var index = 0;

        monthlyIncome = [["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        firstIncomeLength = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserIncomeMoneyExchangeLength(userName);
        //var producerIndex = 0;// First starting index is 0
        for (var i = 0; i < firstIncomeLength; i++) {
            var currentUserMoneyExchangeTransaction = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserIncomeMoneyExchange(userName, index);
            var price = (currentUserMoneyExchangeTransaction[0] / 1000000000000000000);
            var date = new Date(currentUserMoneyExchangeTransaction[1] * 1000);

            if (date.getMonth() + 1 == 1) monthlyIncome[1][0] += price;
            else if (date.getMonth() + 1 == 2) monthlyIncome[1][1] += price;
            else if (date.getMonth() + 1 == 3) monthlyIncome[1][2] += price;
            else if (date.getMonth() + 1 == 4) monthlyIncome[1][3] += price;
            else if (date.getMonth() + 1 == 5) monthlyIncome[1][4] += price;
            else if (date.getMonth() + 1 == 6) monthlyIncome[1][5] += price;
            else if (date.getMonth() + 1 == 7) monthlyIncome[1][6] += price;
            else if (date.getMonth() + 1 == 8) monthlyIncome[1][7] += price;
            else if (date.getMonth() + 1 == 9) monthlyIncome[1][8] += price;
            else if (date.getMonth() + 1 == 10) monthlyIncome[1][9] += price;
            else if (date.getMonth() + 1 == 11) monthlyIncome[1][10] += price;
            else if (date.getMonth() + 1 == 12) monthlyIncome[1][11] += price;
            index = currentUserMoneyExchangeTransaction[2];
        }

        for (var i = 0; i < monthlyIncome[0].length; i++) {
            dpsIncome = chart.options.data[0].dataPoints;
            dpsIncome.push({ label: monthlyIncome[0][i], y: monthlyIncome[1][i] });
        }
        return index;
    }

    function updateChartIncome() {
        var dataLength = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserIncomeMoneyExchangeLength(userName);
        if (firstIncomeLength < dataLength) {

            for (var i = lastIndexIncome; i < dataLength; i++) {
                var currentUserMoneyExchangeTransaction = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserIncomeMoneyExchange(userName, lastIndexIncome);
                var price = currentUserMoneyExchangeTransaction[0];
                var date = new Date(currentUserMoneyExchangeTransaction[1] * 1000);

                if (date.getMonth() + 1 == 1) monthlyIncome[1][0] += price;
                else if (date.getMonth() + 1 == 2) monthlyIncome[1][1] += price;
                else if (date.getMonth() + 1 == 3) monthlyIncome[1][2] += price;
                else if (date.getMonth() + 1 == 4) monthlyIncome[1][3] += price;
                else if (date.getMonth() + 1 == 5) monthlyIncome[1][4] += price;
                else if (date.getMonth() + 1 == 6) monthlyIncome[1][5] += price;
                else if (date.getMonth() + 1 == 7) monthlyIncome[1][6] += price;
                else if (date.getMonth() + 1 == 8) monthlyIncome[1][7] += price;
                else if (date.getMonth() + 1 == 9) monthlyIncome[1][8] += price;
                else if (date.getMonth() + 1 == 10) monthlyIncome[1][9] += price;
                else if (date.getMonth() + 1 == 11) monthlyIncome[1][10] += price;
                else if (date.getMonth() + 1 == 12) monthlyIncome[1][11] += price;
                lastIndexIncome = currentUserMoneyExchangeTransaction[2];
            }

            for (var i = 0; i < monthlyIncome[0].length; i++) {
                dpsIncome = chart.options.data[0].dataPoints;
                dpsIncome.push({ label: monthlyIncome[0][i], y: monthlyIncome[1][i] });
            }

            firstIncomeLength = dataLength;
            chart.render();
        }
    }

    // Expenditure
    function loadChartExpenditure() {
        var index = 0;
        
        monthlyExpenditure = [["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        firstExpenditureLength = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserExpenditureMoneyExchangeLength(userName);
        for (var i = 0; i < firstIncomeLength; i++) {
            var currentUserMoneyExchangeTransaction = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserExpenditureMoneyExchange(userName, index);
            var price = (currentUserMoneyExchangeTransaction[0] / 1000000000000000000);
            var date = new Date(currentUserMoneyExchangeTransaction[1] * 1000);

            if (date.getMonth() + 1 == 1) monthlyExpenditure[1][0] += price;
            else if (date.getMonth() + 1 == 2) monthlyExpenditure[1][1] += price;
            else if (date.getMonth() + 1 == 3) monthlyExpenditure[1][2] += price;
            else if (date.getMonth() + 1 == 4) monthlyExpenditure[1][3] += price;
            else if (date.getMonth() + 1 == 5) monthlyExpenditure[1][4] += price;
            else if (date.getMonth() + 1 == 6) monthlyExpenditure[1][5] += price;
            else if (date.getMonth() + 1 == 7) monthlyExpenditure[1][6] += price;
            else if (date.getMonth() + 1 == 8) monthlyExpenditure[1][7] += price;
            else if (date.getMonth() + 1 == 9) monthlyExpenditure[1][8] += price;
            else if (date.getMonth() + 1 == 10) monthlyExpenditure[1][9] += price;
            else if (date.getMonth() + 1 == 11) monthlyExpenditure[1][10] += price;
            else if (date.getMonth() + 1 == 12) monthlyExpenditure[1][11] += price;
            index = currentUserMoneyExchangeTransaction[2];
        }

        for (var i = 0; i < monthlyExpenditure[0].length; i++) {
            dpsExpenditure = chart.options.data[1].dataPoints;
            dpsExpenditure.push({ label: monthlyExpenditure[0][i], y: monthlyExpenditure[1][i] });
        }
        return index;
    }

    function updateChartExpenditure() {
        var dataLength = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserExpenditureMoneyExchangeLength(userName);
        if (firstExpenditureLength < dataLength) {

            for (var i = lastIndexExpenditure; i < dataLength; i++) {
                var currentUserMoneyExchangeTransaction = electricVehicleChargingEnergyTradeSystemContractAddress.getCurrentUserExpenditureMoneyExchange(userName, lastIndexExpenditure);
                var price = currentUserMoneyExchangeTransaction[0];
                var date = new Date(currentUserMoneyExchangeTransaction[1] * 1000);

                if (date.getMonth() + 1 == 1) monthlyExpenditure[1][0] += price;
                else if (date.getMonth() + 1 == 2) monthlyExpenditure[1][1] += price;
                else if (date.getMonth() + 1 == 3) monthlyExpenditure[1][2] += price;
                else if (date.getMonth() + 1 == 4) monthlyExpenditure[1][3] += price;
                else if (date.getMonth() + 1 == 5) monthlyExpenditure[1][4] += price;
                else if (date.getMonth() + 1 == 6) monthlyExpenditure[1][5] += price;
                else if (date.getMonth() + 1 == 7) monthlyExpenditure[1][6] += price;
                else if (date.getMonth() + 1 == 8) monthlyExpenditure[1][7] += price;
                else if (date.getMonth() + 1 == 9) monthlyExpenditure[1][8] += price;
                else if (date.getMonth() + 1 == 10) monthlyExpenditure[1][9] += price;
                else if (date.getMonth() + 1 == 11) monthlyExpenditure[1][10] += price;
                else if (date.getMonth() + 1 == 12) monthlyExpenditure[1][11] += price;
                lastIndexIncome = currentUserMoneyExchangeTransaction[2];
            }

            for (var i = 0; i < monthlyExpenditure[0].length; i++) {
                dpsExpenditure = chart.options.data[0].dataPoints;
                dpsExpenditure.push({ label: monthlyExpenditure[0][i], y: monthlyExpenditure[1][i] });
            }

            firstIncomeLength = dataLength;
            chart.render();
        }
    }

    chart.render();
    setInterval(function () { updateChartIncome() }, updateInterval);
    setInterval(function () { updateChartExpenditure() }, updateInterval);
}

