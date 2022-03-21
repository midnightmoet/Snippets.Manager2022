import Axios from 'axios';
import React from 'react';
import { UserContextProvider } from './context/UserContext';
import Router from './Router';
import "./style/index.scss";

Axios.defaults.withCredentials = true;

export default function App() {

    return (
        <UserContextProvider>
            <div className="container">
                <Router />
            </div>
        </UserContextProvider>
    );
}