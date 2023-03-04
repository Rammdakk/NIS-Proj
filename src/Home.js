import React from "react";

var tablePage = 1
var localData
const regex = /\d{2}-\d{2}-\d{4}/;
const Home = () => {
    if (!localStorage.getItem("token")) {
        window.location.href = window.location.origin + "/signin"
    }
    loadTable()
    return (
        <div>
            <button className="exit" onClick={function () {
                console.log("exit")
                localStorage.clear()
                window.location.href = window.location.origin + "/signin"
            }}>Exit</button>
            <div className="table-background">
                <div className="button-container">
                    <button className="selectorPageButton" onClick={function () {
                        selectButton(1)
                    }}>Waiting
                    </button>
                    <button className="selectorPageButton" onClick={function () {
                        selectButton(2)
                    }}>In Stock
                    </button>
                    <button className="selectorPageButton" onClick={function () {
                        selectButton(3)
                    }}>Shipped
                    </button>

                </div>
                <table id="myTableHeader" className="prod-table">
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
                    <button id="add-btn" onClick={showPopUp}><span className="plus"></span></button>
                </div>
                <div id="popup" className="popup">
                    <label htmlFor="productInfo">Product info:</label>
                    <input type="text" id="item_name" placeholder="item name"/>
                    <input type="text" id="item_id" placeholder="item id"/>
                    <input type="text" id="item_price" placeholder="item price"/>
                    <label htmlFor="quantity">Quantity:</label>
                    <select id="quantity" placeholder="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <label htmlFor="links">Links:</label>
                    <input type="text" id="photo_link" placeholder="photo link (opt)"/>
                    <input type="text" id="inv_link" placeholder="invoice link (opt)"/>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" pattern="\d{1,2}/\d{1,2}/\d{4}" placeholder="dd/mm/yyyy"/>
                    <button id="save-btn">Save</button>
                    <button id="cancel-btn" onClick={hidePopUp}>Cancel</button>
                </div>
            </div>
        </div>
    );
};


function selectButton(buttonIndex) {
    tablePage = buttonIndex
    updateTable()
}

function updateTable() {
    clearTable()
    loadTable()
}

function loadTable() {
    var xhr = new XMLHttpRequest();
    console.log(localStorage.getItem("token"))
    xhr.open('GET', `https://sheets.googleapis.com/v4/spreadsheets/${localStorage.getItem("sheet_id")}/values/Лист${tablePage}!A2:G500`);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 401) {
            window.location.href = window.location.origin + "/signin"
        }
        var data = JSON.parse(xhr.response)
        localData = data.values
        data.values.forEach(function (entry) {
            addRow('myTable', entry)
        })
        var buttons = document.getElementsByClassName("selectorPageButton");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("selectedButton");
        }
        buttons[tablePage - 1].classList.add("selectedButton");
    };
}

function clearTable() {
    var node = document.getElementById("myTable");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

function addItem() {
    var arr = []
    arr.push(document.getElementById('item_name').value)
    arr.push(document.getElementById('quantity').value)
    arr.push(document.getElementById('item_id').value)
    arr.push(document.getElementById('item_price').value)
    arr.push(document.getElementById('date').value)
    arr.push(document.getElementById('photo_link').value)
    arr.push(document.getElementById('inv_link').value)
    addRow("myTable", arr)
    addItemToTheSheet(arr)
    hidePopUp()
}

function addItemToTheSheet(arr) {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${localStorage.getItem("sheet_id")}/values/Лист${tablePage}!A2:G2:append?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            "values": [
                [
                    arr[0],
                    arr[1],
                    arr[2],
                    arr[3],
                    arr[4],
                    arr[5],
                    arr[6]
                ]
            ]
        })
    })
}

function updateItemInSheet(arr, pos) {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${localStorage.getItem("sheet_id")}/values/Лист${tablePage}!A${pos}:G${pos}?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            "values": [
                [
                    arr[0],
                    arr[1],
                    arr[2],
                    arr[3],
                    arr[4],
                    arr[5],
                    arr[6]
                ]
            ]
        })
    }).then(
        hidePopUp
    ).then(updateTable)
}

function addRow(table_name, arr) {
    var tableBody = document.getElementById(table_name);
    var newRow = tableBody.insertRow(tableBody.rows.length);
    var nameCell = newRow.insertCell(0);
    nameCell.appendChild(document.createTextNode(arr[0]));
    var quantCell = newRow.insertCell(1);
    quantCell.appendChild(document.createTextNode(arr[1]));
    var idCell = newRow.insertCell(2);
    idCell.appendChild(document.createTextNode(arr[2]));
    var priceCell = newRow.insertCell(3);
    priceCell.appendChild(document.createTextNode(arr[3]));
    var dateCell = newRow.insertCell(4);
    dateCell.appendChild(document.createTextNode(arr[4]));
    var photoCell = newRow.insertCell(5);
    photoCell.appendChild(document.createTextNode(arr[5]));
    var invoiceCell = newRow.insertCell(6);
    invoiceCell.appendChild(document.createTextNode(arr[6]));
    var editCell = newRow.insertCell(7);
    const editButton = document.createElement('button')
    editButton.innerText = 'edit'
    editCell.appendChild(editButton);
    editButton.addEventListener('click', (event) => {
        const row = event.target.parentNode.parentNode;
        updateRow(Array.from(row.parentNode.children).indexOf(row))
    });
    var deleteCell = newRow.insertCell(8);
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'delete'
    deleteCell.appendChild(deleteButton);
    deleteButton.addEventListener('click', (event) => {
        const row = event.target.parentNode.parentNode;
        deleteRow(Array.from(row.parentNode.children).indexOf(row))
    });
    if (arr[0] === undefined || arr[1] === undefined) {
        newRow.style.display = 'none';
    }
}

function updateRow(rowNumber) {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('save-btn').onclick = function () {
        console.log("no test;")
        // TODO: Make refresh
        var arr = []
        arr.push(document.getElementById('item_name').value)
        arr.push(document.getElementById('quantity').value)
        arr.push(document.getElementById('item_id').value)
        arr.push(document.getElementById('item_price').value)
        arr.push(document.getElementById('date').value)
        arr.push(document.getElementById('photo_link').value)
        arr.push(document.getElementById('inv_link').value)
        updateItemInSheet(arr, rowNumber + 2)
    }
    document.getElementById('item_name').value = localData[rowNumber][0];
    document.getElementById('quantity').value = localData[rowNumber][1];
    document.getElementById('item_id').value = localData[rowNumber][2];
    document.getElementById('item_price').value = localData[rowNumber][3];
    if (regex.test(localData[rowNumber][4])) {
        const str = localData[rowNumber][4]
        var res = str.substring(6, 10) + "-" + str.substring(3, 5) + "-" + str.substring(0, 2)
        document.getElementById('date').value = res
    } else {
        document.getElementById('date').value = localData[rowNumber][4];
    }
    document.getElementById('photo_link').value = localData[rowNumber][5];
    document.getElementById('inv_link').value = localData[rowNumber][6];
}

function deleteRow(rowNumber) {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${localStorage.getItem("sheet_id")}/values/Лист${tablePage}!A${rowNumber + 2}:G${rowNumber + 2}:clear`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }).then(updateTable)
}

function showPopUp() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('save-btn').onclick = function () {
        addItem()
    }
}

function hidePopUp() {
    document.getElementById('popup').style.display = 'none';
}

export default Home;
