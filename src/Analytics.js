import React from "react";
import Chart from 'chart.js/auto';
import {IoMdArrowBack} from "react-icons/io";


let usd = 0;
let eur = 0;
const API_Key = "NLRhHAXoQRqAI3Pzheb3VDQx8k3U9MMp"
const Analytics = () => {
    document.title = "Analytics"
    loadTable()
    return (
        <div>
            <span className="title">Analytics</span>
            <div id="loading-screen">
                <div className="spinner"></div>
                <div className="loading-text">Loading...</div>
            </div>

            <div className="table-background2">
                <IoMdArrowBack className="back" onClick={function () {
                    window.location.href = window.location.origin + "/home"
                }}></IoMdArrowBack>
                <div className="chart-background">
                    <span className="subtitle"> Budget (RUB)  </span>
                    <canvas className="chart" id="myChart"></canvas>
                </div>
                <div className="chart-background2">
                    <span className="subtitle"> Budget (USD)</span>
                    <canvas className="chart" id="myChart2"></canvas>
                </div>
                <div className="chart-background3">
                    <span className="subtitle"> Budget (EUR)</span>
                    <canvas className="chart" id="myChart3"></canvas>
                </div>
            </div>
        </div>
    )
}



function showLoadingScreen() {
    document.getElementById("loading-screen").style.display = "block";
}

function hideLoadingScreen() {
    document.getElementById("loading-screen").style.display = "none";
}



function getSum(arr) {
    var res1 = 0
    arr.forEach((val) => {
        if (!isNaN(val[0]))
            res1 = res1 + Number(val[0])
    })
    return res1
}

function loadTable() {


    Promise.all([getListSum(1), getListSum(2), getListSum(3), getCur("USD"), getCur("EUR")]).then((results) => {
        console.log(results)
        let res2 = results.map(function (currentValue, index, array) {
            return currentValue * results[3]
        })
        let res3 = results.map(function (currentValue, index, array) {
            return currentValue * results[4]
        })
        buildPieChart(results.slice(0, 3), 'myChart')
        buildPieChart(res2.slice(0, 3), 'myChart2')
        buildPieChart(res3.slice(0, 3), 'myChart3')
        hideLoadingScreen()
    }).catch((error) => {
        console.error('One or more requests failed', error);
    });
}

function getCur(name) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "NLRhHAXoQRqAI3Pzheb3VDQx8k3U9MMp");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    return fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${name}&from=RUB&amount=1`, requestOptions)
        .then(response => response.text()).then(res => JSON.parse(res))
        .then(result => result.info.rate)
        .catch(error => console.log('error', error));
}

function getListSum(listNumber) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://sheets.googleapis.com/v4/spreadsheets/${localStorage.getItem("sheet_id")}/values/Лист${listNumber}!D2:D500`);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    const promise1 = new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 401) {
                window.location.href = window.location.origin + "/signin"
            }
            var data = JSON.parse(xhr.response)
            return resolve(getSum(data.values));
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
    return promise1
}

function buildPieChart(res, id) {
    const data = {
        labels: ['Waitng', 'In Stock', 'Shipped'],
        datasets: [{
            label: 'Warehouse',
            data: res,
            backgroundColor: [
                'rgb(255, 99, 132, 0.3)',
                'rgb(54, 162, 235, 0.3)',
                'rgb(255, 205, 86, 0.3)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            borderWidth: 1,
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'bar',
        data: data,
    };

    const myChart = new Chart(
        document.getElementById(id),
        config
    );
}

export default Analytics