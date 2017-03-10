import React, { Component, PropTypes } from 'react';

class Home extends Component {
	render() {
		return (
			<h1>{this.props.appState.testValue}</h1>
		);
	}
}

export default Home;