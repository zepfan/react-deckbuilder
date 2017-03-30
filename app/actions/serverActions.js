// flux jazz
import dispatcher from '../dispatcher';
import constants from '../constants/constants';
import * as firebaseClient from '../util/firebaseClient';

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

export function deckValidationSuccess(deck) {
	dispatcher.dispatch({
		type: constants.actions.DECK_VALIDATION_SUCCESS,
		deck
	});

	_saveNewDeck(deck);
}

/**
 * ----------------------------------------
 * Add a validated deck to the database
 * ----------------------------------------
 */

function _saveNewDeck(deck) {
	dispatcher.dispatch({
		type: constants.actions.SAVING_NEW_DECK,
		deck
	});
	
	firebaseClient.saveNewDeck(deck);
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

/**
 * ----------------------------------------
 * Handle successfully saved new deck
 * ----------------------------------------
 */

export function saveNewDeckSuccess(deckKey) {
	dispatcher.dispatch({
		type: constants.actions.SAVE_NEW_DECK_SUCCESS,
		deckKey
	});
}

/**
 * ----------------------------------------
 * Catch errors from saving a new deck
 * ----------------------------------------
 */

export function saveNewDeckFailed(errors) {
	dispatcher.dispatch({
		type: constants.actions.SAVE_NEW_DECK_FAILED,
		errors
	});
}

/**
 * ----------------------------------------
 * Recieved a user's deck from the DB
 * ----------------------------------------
 */

 export function decksRecieved(decks) {
	dispatcher.dispatch({
		type: constants.actions.DECKS_RECIEVED,
		decks
	});
}

/**
 * ----------------------------------------
 * Recieved a user's deck from the DB
 * ----------------------------------------
 */

 export function singleDeckRecieved(deck) {
	dispatcher.dispatch({
		type: constants.actions.SINGLE_DECK_RECIEVED,
		deck
	});
}