import dispatcher from '../dispatcher';

/**
 * ----------------------------------------
 * Set the user's logged in status
 * ----------------------------------------
 */

export function setAuthState(state, uid) {
	dispatcher.dispatch({
		type: 'SET_AUTH_STATE',
		state,
		uid
	});
}