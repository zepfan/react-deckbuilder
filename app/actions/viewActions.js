import dispatcher from '../dispatcher';
import constants from '../constants/constants';
import * as firebaseClient from '../util/firebaseClient';

/* ===================== USER ACTIONS ===================== */

/**
 * ----------------------------------------
 * Sign user in
 * ----------------------------------------
 */

export function signUserIn(id, pass) {
	dispatcher.dispatch({
		actionType: constants.actions.SIGNING_IN_USER,
		id,
		pass
	});

	firebaseClient.signUserIn(id, pass);
}

/**
 * ----------------------------------------
 * Create new user
 * ----------------------------------------
 */

export function createNewUser(id, pass) {
	dispatcher.dispatch({
		actionType: constants.actions.CREATING_NEW_USER,
		id,
		pass
	});

	firebaseClient.createNewUser(id, pass);
}