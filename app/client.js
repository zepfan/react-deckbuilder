// app stylesheet
import '../public/less/main.less';

// react jazz
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

// firebase
import { auth } from './util/firebase';

// actions
import * as serverActions from './actions/serverActions';

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
    	serverActions.setAuthState(false, null);
   	} else {
   		serverActions.setAuthState(true, user.uid);
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
			<IndexRoute component={DeckCatalog} onEnter={requireAuth}></IndexRoute>
			<Route path="/add-deck" component={DeckAdder} onEnter={requireAuth}></Route>
			<Route path="/decks/:id" component={DeckList} onEnter={requireAuth}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/signup" component={Signup}></Route>
		</Route>
	</Router>,
	document.getElementById('app')
);