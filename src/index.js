import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css';


ReactDOM.render(
    (
        <BrowserRouter>
            <App/> {/* The various pages will be displayed by the `Main` component. */}
        </BrowserRouter>
    ),
    document.getElementById('root')
);


