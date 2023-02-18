import React from "react";

const Home = () => {
    if (!localStorage.getItem("token")){
        window.location.href = window.location.origin+"/signin"
    }
    console.log("HOOOOME")
    return (
        <div className="table-background">
            <table className="prod-table">
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
                <tbody>
                <tr>
                    <td>Dom</td>
                    <td>6000</td>
                    <td>Dom</td>
                    <td>6000</td>
                    <td>Dom</td>
                    <td>6000</td>
                    <td>Dom</td>
                    <td>
                        <button id="edit-button"  onClick={loadCalendar}>edit
                        </button>
                    </td>
                    <td>
                        <button id="delete-button"  onClick={loadCalendar}>delete
                        </button>
                    </td>
                </tr>
                <tr className="active-row">
                    <td>Melissa</td>
                    <td>5150</td>
                    <td>Melissa</td>
                    <td>5150</td>
                    <td>Melissa</td>
                    <td>5150</td>
                    <td>Melissa</td>
                    <td>5150</td>
                    <td>5150</td>
                </tr>
                </tbody>
            </table>

        </div>
    );
};

function loadCalendar() {
    var xhr = new XMLHttpRequest();
    console.log(localStorage.getItem("token"))
    xhr.open('GET', 'https://sheets.googleapis.com/v4/spreadsheets/1ouJLVVoD9wKNjjMi5FC2Xmf8MmvTSfq5dyTCfi933ak/values/A1:A5');
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    xhr.send();
    xhr.onload = function () {
        console.log(`Загружено: ${xhr.status} ${xhr.response}`);
    };
}


export default Home;
