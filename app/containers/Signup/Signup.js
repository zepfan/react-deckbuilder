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

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			validationErrors: '',
			registerErrors: userStore.getRegisteringErrors(),
			isRegistering: userStore.isRegistering()
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
	}

	/** ======================= LIFECYCLE ======================= */

	componentWillMount() {
		userStore.on('change', this.onUserChange);
	}

	componentWillUnmount() {
		userStore.removeListener('change', this.onUserChange);
	}

	/** ======================= METHODS ======================= */

	/**
	 * ----------------------------------------
	 * Update the state when the user store does
	 * ----------------------------------------
	 */

	onUserChange(e) {
		this.setState({
			registerErrors: userStore.getRegisteringErrors(),
			isRegistering: userStore.isRegistering()
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

		this.validateForm(this.handleSignup);
	}

	/**
	 * ----------------------------------------
	 * Validate form inputs
	 * Currently only checking for non-empty vals
	 * ----------------------------------------
	 */
	
	validateForm(callback) {
		let validationErrors = {};

		if(!this.state.username) validationErrors.username = "Please enter a username!";
		if(!this.state.email) validationErrors.email = "Please enter an email!";
		if(!this.state.password) validationErrors.password = "Please enter a password!";
		if(!this.state.passwordConfirmation) validationErrors.passwordConfirmation = "Please confirm your password!";
		
		if(this.state.password !== this.state.passwordConfirmation) {
			validationErrors.passwordConfirmation = "The passwords you have entered do not match.";
		}

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

	handleSignup() {
		const email = this.state.email;
		const username = this.state.username;
		const pass = this.state.password;

		viewActions.validateNewUser(email, username, pass);
	}

	/** ======================= RENDER ======================= */

	render() {	
		const { username, email, password, passwordConfirmation, isRegistering, validationErrors, registerErrors } = this.state;

		return (
			<div class="authenticate-pane">
				<h1>Create an Account</h1>

				<div class="main-container">
					{registerErrors ? <span class="error-msg">{registerErrors}</span> : ''}

					<form onSubmit={this.onSubmit}>
						<TextFieldGroup 
							label="Username:"
							name="username"
							id="username-input"
							value={username}
							onChange={this.onInputChange}
							error={validationErrors.username}
						/>

						<TextFieldGroup 
							label="Email Address:"
							name="email"
							id="email-input"
							value={email}
							onChange={this.onInputChange}
							error={validationErrors.email}
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

						<TextFieldGroup 
							label="Confirm Password:"
							name="passwordConfirmation"
							id="confirm-password-input"
							type="password"
							value={passwordConfirmation}
							onChange={this.onInputChange}
							error={validationErrors.passwordConfirmation}
						/>

						<div class="control-submit">
							<button class="control-btn" type="submit" disabled={isRegistering}>Create Account</button>

							{isRegistering ? <Loader /> : ''}
						</div>
					</form>
				</div>

				<span class="auxiliary-link">
					Already have an account? <Link to="/login">Sign in here.</Link>
				</span>
			</div>
		);
	}
}

export default Signup;