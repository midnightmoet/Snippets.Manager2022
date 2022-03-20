import Axios from 'axios';
import React from 'react';
import Router from './Router';
import "./style/index.scss";

Axios.defaults.withCredentials = true;

export default function App() {

    return (
        <div className="container">
            <Router />
        </div>
    );
}