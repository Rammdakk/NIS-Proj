import React from "react";

let client
let access_token
let refresh_token

const CLIENT_ID = "1073973625564-lc2hm4fnvt3ogj198jujjp8spbae621i.apps.googleusercontent.com"

const SCOPES = "https://www.googleapis.com/auth/spreadsheets"

const SignIn = () => {
    const script = document.createElement("script");
    script.onload = initClient;
    script.src = "https://accounts.google.com/gsi/client";
    document.body.appendChild(script);
    return (
        <div>
            <head>
                <link href="https://fonts.googleapis.com/css?family=Inter&display=swap" rel="stylesheet"/>
            </head>
            <body>
            <div>
                <div className="central-window">
                    <span className="title-sign-in">WELCOME</span>
                    <div className="name"></div>
                    <input type="text" id="myTextField" className="signInTV"/>
                    <button id="google-signin-btn" className="signin-button" onClick={getToken}>
                        Sign in with Google
                    </button>
                    <button id="google-signin-btn2" className="signin-button" onClick={movePage}>
                        Continue
                    </button>
                </div>
            </div>
            </body>
        </div>
    );
}

const initClient = () => {
    console.log("frwgfhed")
    // eslint-disable-next-line no-undef
    client = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
            console.log(tokenResponse.access_token)
            console.log(tokenResponse.expires_in)
            access_token = tokenResponse.access_token;
            localStorage.setItem("token", access_token)
            refresh_token = tokenResponse.refresh_token
            var signIn1 = document.getElementById("google-signin-btn");
            signIn1.style.display = "none";
            var signIn2 = document.getElementById("google-signin-btn2");
            signIn2.style.display = "block";
            var text = document.getElementById("myTextField")
            text.style.display = "block"
        },
    });
}

function logToken() {
    console.log("access_token");
    console.log(access_token);
    console.log("from storage");
    console.log(localStorage.getItem("token"));
}

function movePage() {
    var link = document.getElementById("myTextField").value
    var part = link.split('/')
    var id = part[part.length-2]
    localStorage.setItem("sheet_id", id)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/A1:A5`);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200 ){
            window.location.href = window.location.origin + "/home"
        } else {
            window.location.href = window.location.origin + "/notFound"
        }
    };
}

function getToken() {
    client.requestAccessToken();
}



export default SignIn;
