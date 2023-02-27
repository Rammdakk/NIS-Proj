import React from "react";

const Home = () => {
    if (!localStorage.getItem("token")){
        window.location.href = window.location.origin+"/signin"
    }
    loadCalendar()
    return (
        <div className="table-background">
            <table id="myTable6" className="prod-table">
                <thead>
                <tr>
                    <th>ITEM NAME</th>
                    <th>QUANTITY</th>
                    <th>ITEM ID</th>
                    <th>PRICE</th>
                    <th>DATE OF ORDER</th>
                    <th>LINK TO PHOTO</th>
                    <th>INVOICE LINK</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
            </table>
            <div className="scrollable">
            <table id="myTable" className="prod-table">

            </table>
            </div>
        </div>
    );
};

function loadCalendar() {
    var xhr = new XMLHttpRequest();
    console.log(localStorage.getItem("token"))
    xhr.open('GET', `https://sheets.googleapis.com/v4/spreadsheets/${localStorage.getItem("sheet_id")}/values/A2:G500`);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    xhr.send();
    xhr.onload = function () {
        console.log(`Загружено: ${xhr.status} ${xhr.response}`);
        var data = JSON.parse(xhr.response)
        console.log(data.values)
        data.values.forEach(function (entry) {
            addRow(entry)
        })
    };
}

function addRow(arr){
    var tableBody = document.getElementById('myTable');
    var newRow = tableBody.insertRow(tableBody.rows.length);
    var nameCell = newRow.insertCell(0);
    var scoreCell = newRow.insertCell(1);
    nameCell.appendChild(document.createTextNode(arr[0]));
    scoreCell.appendChild(document.createTextNode(arr[1]));
    var nameCell = newRow.insertCell(2);
    var scoreCell = newRow.insertCell(3);
    nameCell.appendChild(document.createTextNode(arr[2]));
    scoreCell.appendChild(document.createTextNode(arr[3]));
    var nameCell = newRow.insertCell(4);
    var scoreCell = newRow.insertCell(5);
    nameCell.appendChild(document.createTextNode(arr[4]));
    scoreCell.appendChild(document.createTextNode(arr[5]));
    var nameCell = newRow.insertCell(6);
    nameCell.appendChild(document.createTextNode(arr[6]));
    var editCell = newRow.insertCell(7);
    const button2 = document.createElement('button')
    button2.innerText = 'edit'
    editCell.appendChild(button2);
    var deleteCell = newRow.insertCell(8);
    const button = document.createElement('button')
    button.innerText = 'delete'
    deleteCell.appendChild(button);
}


export default Home;
