import React, { useState } from 'react';
import Info from "./Info";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import Logout from './Logout';
import LogIn from './LogIn';
import Todos from './Todos';
import Posts from './Posts';
import Body from './Body';
import Photos from './Photos';
import '../css.css';

function Application() {

    const user = JSON.parse(localStorage.getItem("currentUser") as string)
    let { url, path } = useRouteMatch();

    return (
        <div>
      
        </div>)
}

export default Application;