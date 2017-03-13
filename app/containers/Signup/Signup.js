// react jazz
import React, { Component } from 'react';

// firebase
import { auth } from '../../util/firebase';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleSignup() {
		const email = 'email';
		const pass = 'pass';
		// const promise = auth.createUserWithEmailAndPassword(email, pass);

		// promise
		// 	.then(user => console.log(user))
		// 	.catch(e => console.log(e.message));
	}

	render() {
		return (
			<div>
				<h1>Signup Works</h1>
			</div>
		);
	}
}

export default Signup;