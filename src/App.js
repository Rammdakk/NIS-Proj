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
}


export default App;
