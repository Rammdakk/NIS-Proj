import './App.css';
import React, {Component} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import NotFound from './NotFound';

class App extends Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/notFound" element={<NotFound/>}/>
                    <Route
                        path=""
                        element={<Navigate to="/signin"/>}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/notFound"/>}
                    />
                </Routes>
            </div>
        );
    }

    render2() {
        const script = document.createElement("script");
        script.onload = this.initClient;
        script.src = "https://accounts.google.com/gsi/client";

        document.body.appendChild(script);
        return (
            <div className="App">
                <Router>
                    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
                        <Route exact path='/' element={<Home/>}></Route>
                        <Route exact path='/signin' element={<SignIn/>}></Route>
                    </Routes>
                </Router>
                {/*<Main />*/}
            </div>
            // <div className="App">
            //     <div className="App-header">
            //         <h2 className="lng-h2">Checkers </h2>
            //     </div>
            //     <button onClick={getToken}> Get access token< /button>
            //     <button onClick={logToken}> Log access token< /button>
            //     <button onClick={loadCalendar}>Load Calendar</button>
            //     <button onClick={revokeToken}>Revoke token</button>
            // </div>
        );
    }


    initClient = () => {
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


export default App;
