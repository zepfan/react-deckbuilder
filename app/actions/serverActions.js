// flux jazz
import dispatcher from '../dispatcher';
import constants from '../constants/constants';

/**
 * ----------------------------------------
 * Handle succesful login
 * ----------------------------------------
 */

export function loginSuccess(user) {
	dispatcher.dispatch({
		type: constants.actions.LOGIN_SUCCESS,
		user
	});
}

/**
 * ----------------------------------------
 * Catch login errors
 * ----------------------------------------
 */

export function loginFailed(errors) {
	dispatcher.dispatch({
		type: constants.actions.LOGIN_FAILED,
		errors
	});
}

/**
 * ----------------------------------------
 * Catch register errors
 * ----------------------------------------
 */

export function registerFailed(errors) {
	dispatcher.dispatch({
		type: constants.actions.REGISTER_FAILED,
		errors
	});
}