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
			</div>
		);
	}
}

export default Login;