import './App.css';
import React, {Component} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import NotFound from './NotFound';
import Analytics from './Analytics'

class App extends Component {

    render() {
        document.title = "App"
        return (
            <div>
                <Routes>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/notFound" element={<NotFound/>}/>
                    <Route path="/analytics" element={<Analytics/>}/>
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
}


export default App;
