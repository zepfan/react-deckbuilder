import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

const app = document.getElementByID('app');

ReactDOM.render(
	// <Router history={hashHistory}>
	// 	<Route path="/" component={App}>
	// 		<IndexRoute component={IndexComponent}></IndexRoute>
	// 	</Route>
	// </Router>,
	app
);
