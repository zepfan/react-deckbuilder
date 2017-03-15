// react jazz
import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';

// helpers
import _ from 'lodash';

// actions
import * as viewActions from '../../actions/viewActions';

// components
import TextFieldGroup from '../../components/TextFieldGroup';
import Loader from '../../components/Loader';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			identifier: '',
			password: '',
			errors: {},
			isLoading: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	/** ================ METHODS =========================== */

	/**
	 * ----------------------------------------
	 * Save the value of the inputs
	 * ----------------------------------------
	 */

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	/**
	 * ----------------------------------------
	 * Handle form submission
	 * ----------------------------------------
	 */

	onSubmit(e) {
		e.preventDefault();

		this.validateForm(this.handleLogin.bind(this));
	}

	/**
	 * ----------------------------------------
	 * Validate form inputs
	 * Currently only checking for non-empty val
	 * ----------------------------------------
	 */
	
	validateForm(callback) {
		let errors = {};

		if(!this.state.identifier) errors.identifier = "Please enter an email!";
		if(!this.state.password) errors.password = "Please enter a password!";

		this.setState({ errors: {...errors} }, () => {
			if(_.isEmpty(this.state.errors)) {
				callback();
			}
		});
	}

	/**
	 * ----------------------------------------
	 * Authenticate the user
	 * ----------------------------------------
	 */

	handleLogin() {
		const id = this.state.identifier;
		const pass = this.state.password;

		this.setState({ isLoading: true });

		viewActions.signUserIn(id, pass);
	}


	/** ================ RENDER =========================== */

	render() {
		const { identifier, password, isLoading, errors } = this.state;

		return (
			<div class="authenticate-pane">
				<h1>Login</h1>

				<div class="main-container">
					{errors.loginError ? <span class="error-msg">{errors.loginError}</span> : ''}

					<form onSubmit={this.onSubmit}>
						<TextFieldGroup 
							label="Email:"
							name="identifier"
							id="identifier-input"
							value={identifier}
							onChange={this.onChange}
							error={errors.identifier}
						/>

						<TextFieldGroup 
							label="Password:"
							name="password"
							id="password-input"
							type="password"
							value={password}
							onChange={this.onChange}
							error={errors.password}
						/>

						<button class="control-btn" type="submit" disabled={isLoading}>Log In</button>

						{isLoading ? <Loader /> : ''}
					</form>
				</div>

				<span class="auxiliary-link">
					Don't have an account yet? <Link to="/signup">Create one here.</Link>
				</span>
			</div>
		);
	}
}

export default Login;