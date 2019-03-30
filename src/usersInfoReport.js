var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("field-userName").innerHTML = username[1];
document.getElementById("nav-userName").innerHTML = username[1];
getUsersInfo();
function getUsersInfo() {
    var lengthOfUsers = userLoginRegisterContractAddress.registeredUserLength.call(); 
    for (var i = 0; i < lengthOfUsers; i++) {
        var result = userLoginRegisterContractAddress.userInfoStruct(i); 
        var table = document.getElementById("table-usersInfo");
        var row = table.insertRow(i+1);

        var cell_i = row.insertCell(0);
        var cell_wallet = row.insertCell(1);
        var cell_userName = row.insertCell(2);
        var cell_userType = row.insertCell(3);
        var cell_registrationDate = row.insertCell(4);

        var date = new Date(result[4] * 1000);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    
        cell_i.innerHTML = i+1;//Add Table
        cell_wallet.innerHTML = result[0];//Add Table
        cell_userName.innerHTML = result[1];//Add Table
        cell_userType.innerHTML = result[3];//Add Table
        cell_registrationDate.innerHTML = formattedDate;//Add Table

    } 
} 
