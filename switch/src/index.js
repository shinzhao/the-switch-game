import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import Login from './Pages/LoginPage';
import Profile from './Pages/ProfilePage';
import GameRule from './Pages/GameRulePage';
import Room from './Pages/RoomPage';
import { Router, Route, BrowserRouter } from "react-router-dom";

ReactDOM.render(
<BrowserRouter>
    <div>
        <Route exact path='/' component={App} />
        <Route path='/room-list' component={Login} />
        <Route path='/my-account' component={Profile} />
        <Route path='/game-rule' component={GameRule} />
        <Route path='/room' component={Room} />
    </div>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
