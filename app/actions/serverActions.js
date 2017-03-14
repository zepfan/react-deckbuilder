import dispatcher from '../dispatcher';

/**
 * ----------------------------------------
 * Create a new user after sign-up
 * ----------------------------------------
 */

export function createNewUser(userId, email) {
	dispatcher.dispatch({
		type: 'CREATE_NEW_USER',
		userId,
		email
	});
}