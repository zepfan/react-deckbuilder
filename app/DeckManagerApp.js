// react jazz
import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import userStore from './stores/userStore';

class DeckManagerApp extends Component {
	constructor() {
		super();

		this.state = {
			user: userStore.getUser()
		};
	}

	render() {
		return (
			<div class="app-interior">
				{ React.cloneElement(this.props.children, {
					appState: this.state
				}) }
			</div>
		);
	}
}

export default DeckManagerApp;