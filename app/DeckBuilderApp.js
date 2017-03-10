import React, { Component } from 'react';
import * as firebase from 'firebase';

class DeckBuilderApp extends Component {
	constructor() {
		super();

		this.state = {
			testValue: 10
		}
	}

	componentDidMount() {
		const rootRef = firebase.database().ref();
		const testRef = rootRef.child('testValue');

		testRef.on('value', snap => {
			this.setState({
				testValue: snap.val()
			});
		});
	}

	render() {
		return (
			<div>
				{ React.cloneElement(this.props.children, {
					appState: this.state
				}) }
			</div>
		);
	}
}

export default DeckBuilderApp;