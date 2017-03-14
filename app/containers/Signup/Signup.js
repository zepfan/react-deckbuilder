// react jazz
import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';

// helpers
import { isEmpty } from 'lodash';

// firebase
import { auth } from '../../util/firebase';

// actions
import * as serverActions from '../../actions/serverActions';

// components
import TextFieldGroup from '../../components/TextFieldGroup';
import Loader from '../../components/Loader';

class Signup extends Component {
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

		// sign the user in
		auth.createUserWithEmailAndPassword(id, pass)
			.then(user => {
				// add a new entry to the database
				serverActions.createNewUser(user.uid, user.email);
			})
			.then(() => {
				// redirect to dashboard on successful login
				hashHistory.push('/dashboard');
			})
			.catch(e => {
				// error jazz
				this.setState({ 
					errors: {
						...this.state.errors,
						signUpError: 'There was a problem. Please try again.'
					},
					isLoading: false
				});
			});
	}


	/** ================ RENDER =========================== */

	render() {	
		const { identifier, password, isLoading, errors } = this.state;

		return (
			<div class="authenticate-pane">
				<h1>Signup</h1>

				<div class="main-container">
					{errors.signUpError ? <span class="error-msg">{errors.signUpError}</span> : ''}

					<form onSubmit={this.onSubmit}>
						<TextFieldGroup 
							label="Enter an Email:"
							name="identifier"
							id="identifier-input"
							value={identifier}
							onChange={this.onChange}
							error={errors.identifier}
						/>

						<TextFieldGroup 
							label="Choose a Password:"
							name="password"
							id="password-input"
							type="password"
							value={password}
							onChange={this.onChange}
							error={errors.password}
						/>

						<button class="control-btn" type="submit" disabled={isLoading}>Sign Up</button>

						{isLoading ? <Loader /> : ''}
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