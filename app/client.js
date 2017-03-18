// app stylesheet
import '../public/less/main.less';

// react jazz
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory } from 'react-router';

// firebase
import { auth } from './util/firebaseClient';
import './util/authTest'; /* DEBUG ONLY */

// components
import DeckManagerApp from './DeckManagerApp';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import DeckCatalog from './containers/DeckCatalog/DeckCatalog';
import DeckAdder from './containers/DeckAdder/DeckAdder';
import DeckList from './containers/DeckList/DeckList';

/**
 * ----------------------------------------
 * Authenticate Users
 * ----------------------------------------
 */

function requireAuth(nextState, replace, callback) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
    	replace({ pathname: '/login' }); 
    }
    
    callback();
  });
}

/**
 * ----------------------------------------
 * Routes
 * ----------------------------------------
 */
 
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={DeckManagerApp}>
			<IndexRedirect to="/dashboard" />
			
			{/* Protected Routes */}
			<Route path="/dashboard" onEnter={requireAuth}>
				<IndexRoute component={DeckCatalog} />
				<Route path="/dashboard/decks/:id" component={DeckList}></Route>
				<Route path="/dashboard/add-deck" component={DeckAdder}></Route>
			</Route>

			<Route path="/login" component={Login}></Route>
			<Route path="/signup" component={Signup}></Route>
		</Route>
	</Router>,
	document.getElementById('app')
);