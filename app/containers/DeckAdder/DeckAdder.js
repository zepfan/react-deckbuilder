// react jazz
import React, { Component } from 'react';

class DeckAdder extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		console.log(this.props.appState.user);
		
		return (
			<div>
				Deck Adder
			</div>
		);
	}
}

export default DeckAdder;