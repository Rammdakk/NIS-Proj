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
                    <button id="google-signin-btn" className="signin-button">
                        Sign in with Google
                    </button>
                    {/*<button id="google-signin-btn" onClick={this.logToken()}>*/}
                    {/*    Log*/}
                    {/*</button>*/}
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
        },
    });
}

function logToken() {
    console.log("access_token");
    console.log(access_token);
    console.log("from storage");
    console.log(localStorage.getItem("token"));
}

function getToken() {
    client.requestAccessToken();
}

function revokeToken() {
    // eslint-disable-next-line no-undef
    google.accounts.oauth2.revoke(access_token, () => {
        console.log('access token revoked')
    });
}

function loadCalendar() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://sheets.googleapis.com/v4/spreadsheets/1ouJLVVoD9wKNjjMi5FC2Xmf8MmvTSfq5dyTCfi933ak/values/A1:A5');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send();
    xhr.onload = function () {
        console.log(`Загружено: ${xhr.status} ${xhr.response}`);
    };
}

export default SignIn;