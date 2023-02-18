import React from "react";

const Home = () => {
    if (!localStorage.getItem("token")){
        window.location.href = window.location.origin+"/signin"
    }
    console.log("HOOOOME")
    return (
        <div>
            <h2>
                Home.
            </h2>
            <button id="google-signin-btn" className="signin-button" onClick={loadCalendar}>
                Sign in with Google
            </button>
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
