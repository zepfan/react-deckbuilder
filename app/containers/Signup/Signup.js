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
			identifier: '',
			password: '',
			validationErrors: '',
			registerErrors: userStore.getRegisteringErrors(),
			isRegistering: userStore.isRegistering()
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

		if(!this.state.identifier) validationErrors.identifier = "Please enter an email!";
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

		viewActions.createNewUser(id, pass);
	}

	/** ================ RENDER =========================== */

	render() {	
		const { identifier, password, isRegistering, validationErrors, registerErrors } = this.state;

		return (
			<div class="authenticate-pane">
				<h1>Signup</h1>

				<div class="main-container">
					{registerErrors ? <span class="error-msg">{registerErrors}</span> : ''}

					<form onSubmit={this.onSubmit}>
						<TextFieldGroup 
							label="Enter an Email:"
							name="identifier"
							id="identifier-input"
							value={identifier}
							onChange={this.onInputChange}
							error={validationErrors.identifier}
						/>

						<TextFieldGroup 
							label="Choose a Password:"
							name="password"
							id="password-input"
							type="password"
							value={password}
							onChange={this.onInputChange}
							error={validationErrors.password}
						/>

						<button class="control-btn" type="submit" disabled={isRegistering}>Sign Up</button>

						{isRegistering ? <Loader /> : ''}
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