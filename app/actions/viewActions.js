import dispatcher from '../dispatcher';
import constants from '../constants/constants';
import * as firebaseClient from '../util/firebaseClient';

/**
 * ----------------------------------------
 * Sign user in
 * ----------------------------------------
 */

export function signUserIn(id, pass) {
	dispatcher.dispatch({
		type: constants.actions.LOGGING_IN,
		id,
		pass
	});

	firebaseClient.signUserIn(id, pass);
}

/**
 * ----------------------------------------
 * Create a new user
 * ----------------------------------------
 */

export function createNewUser(email, username, pass) {
	dispatcher.dispatch({
		type: constants.actions.REGISTERING,
		email,
		username,
		pass
	});

	firebaseClient.createNewUser(email, username, pass);
}