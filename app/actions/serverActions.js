// flux jazz
import dispatcher from '../dispatcher';
import constants from '../constants/constants';

/** ======================= AUTH ======================= */

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
 * Handle succesful registration
 * ----------------------------------------
 */

export function registerSuccess(user) {
	dispatcher.dispatch({
		type: constants.actions.REGISTER_SUCCESS,
		user
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

/** ======================= DECKS ======================= */

/**
 * ----------------------------------------
 * Handle succesful deck validation
 * ----------------------------------------
 */

export function deckValidationSuccess() {
	dispatcher.dispatch({
		type: constants.actions.DECK_VALIDATION_SUCCESS
	});
}

/**
 * ----------------------------------------
 * Catch deck validation errors
 * ----------------------------------------
 */

export function deckValidationFailed(errors) {
	dispatcher.dispatch({
		type: constants.actions.DECK_VALIDATION_FAILED,
		errors
	});
}