import './App.css';
import React, {Component} from 'react';

let client;
let access_token;
let refresh_token;

let CLIENT_ID =
    "1073973625564-lc2hm4fnvt3ogj198jujjp8spbae621i.apps.googleusercontent.com";

const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

class App extends Component {

    render() {
        const script = document.createElement("script");
        script.onload = this.initClient;
        script.src = "https://accounts.google.com/gsi/client";

        document.body.appendChild(script);
        return (<div className="App">
            <div className="App-header">
                <h2 className="lng-h2">Checkers </h2>
            </div>
            <button onClick={getToken}> Get access token< /button>
            <button onClick={logToken}> Log access token< /button>
            <button onClick={loadCalendar}>Load Calendar</button>
            <button onClick={revokeToken}>Revoke token</button>
        </div>);
    }


    initClient= () => {
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
    google.accounts.oauth2.revoke(access_token, () => {console.log('access token revoked')});
}
function loadCalendar() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://sheets.googleapis.com/v4/spreadsheets/1ouJLVVoD9wKNjjMi5FC2Xmf8MmvTSfq5dyTCfi933ak/values/A1:A5');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send();
    xhr.onload = function() {
        console.log(`Загружено: ${xhr.status} ${xhr.response}`);
    };
}

export default App;
