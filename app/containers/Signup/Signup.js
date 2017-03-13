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
		console.log(this.props.appState.user);
		
		return (
			<div>
				<h1>Sign Up</h1>

				<form>
					<label for="email-input">Email:</label>
					<input name="email" type="text" id="email-input" />

					<label for="password-input">Password:</label>
					<input name="password" type="password" id="password-input" />

					<button type="submit">Sign Up</button>
				</form>

				<a>Already registered? Sign in here.</a>
			</div>
		);
	}
}

export default Signup;