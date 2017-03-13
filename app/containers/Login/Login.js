// react jazz
import React, { Component } from 'react';

// firebase
import { auth } from '../../util/firebase';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleLogin() {
		const email = 'email';
		const pass = 'pass';
		// const promise = auth.signInWithEmailAndPassword(email, pass);

		// promise
		// 	.then(user => console.log(user.uid))
		// 	.catch(e => console.log(e.message));
	}

	render() {
		return (
			<div>
				<h1>Login</h1>

				<form>
					<label for="email-input">Email:</label>
					<input name="email" type="text" id="email-input" />

					<label for="password-input">Password:</label>
					<input name="password" type="password" id="password-input" />

					<button type="submit">Login</button>
					
					<a>Forgot your password?</a>
				</form>

				<a>New user? Sign up here.</a>
			</div>
		);
	}
}

export default Login;