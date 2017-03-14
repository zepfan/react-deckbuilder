// react jazz
import React, { Component } from 'react';
import { Link } from 'react-router';

class DeckList extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				Deck List
				<Link to={'/signup'} activeClassName="current">test</Link>
			</div>
		);
	}
}

export default DeckList;