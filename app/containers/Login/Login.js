// react jazz
import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';

// helpers
import _ from 'lodash';

// actions
import * as viewActions from '../../actions/viewActions';

// stores
import userStore from '../../stores/userStore';

// components
import TextFieldGroup from '../../components/forms/TextFieldGroup';
import Loader from '../../components/Loader';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			identifier: '',
			password: '',
			validationErrors: '',
			logInErrors: userStore.getLoginErrors(),
			isLoggingIn: userStore.isLoggingIn()
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	/** ================ LIFECYCLE =========================== */

	componentWillMount() {
		userStore.on('change', this.onUserChange);
	}

	componentWillUnmount() {
		userStore.removeListener('change', this.onUserChange);
	}

	/** ================ METHODS =========================== */

	onUserChange(e) {
		this.setState({
			logInErrors: userStore.getLoginErrors(),
			isLoggingIn: userStore.isLoggingIn()
		});
	}

	/**
	 * ----------------------------------------
	 * Save the value of the inputs
	 * ----------------------------------------
	 */

	onInputChange(e) {
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
		let validationErrors = {};

		if(!this.state.identifier) validationErrors.identifier = "Please enter an username or email!";
		if(!this.state.password) validationErrors.password = "Please enter a password!";

		this.setState({ validationErrors: {...validationErrors} }, () => {
			if(_.isEmpty(this.state.validationErrors)) {
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

		viewActions.signUserIn(id, pass);
	}

	/** ================ RENDER =========================== */

	render() {
		const { identifier, password, isLoggingIn, validationErrors, logInErrors } = this.state;

		return (
			<div class="authenticate-pane">
				<h1>Log In</h1>

				<div class="main-container">
					{logInErrors ? <span class="error-msg">{logInErrors}</span> : ''}

					<form onSubmit={this.onSubmit}>
						<TextFieldGroup 
							label="Username or Email:"
							name="identifier"
							id="identifier-input"
							value={identifier}
							onChange={this.onInputChange}
							error={validationErrors.identifier}
						/>

						<TextFieldGroup 
							label="Password:"
							name="password"
							id="password-input"
							type="password"
							value={password}
							onChange={this.onInputChange}
							error={validationErrors.password}
						/>

						<button class="control-btn" type="submit" disabled={isLoggingIn}>Log In</button>

						{isLoggingIn ? <Loader /> : ''}
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