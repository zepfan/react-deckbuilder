// react jazz
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// firebase init
import './util/firebase';

// components
import DeckBuilderApp from './DeckBuilderApp';
import Home from './containers/Home';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={DeckBuilderApp}>
			<IndexRoute component={Home}></IndexRoute>
		</Route>
	</Router>,
	document.getElementById('app')
);