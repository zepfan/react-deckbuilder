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
 * Handle sign out success
 * ----------------------------------------
 */

export function signOutSuccess() {
	dispatcher.dispatch({
		type: constants.actions.SIGN_OUT_SUCCESS,
	});
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
 * Recieved all the user's decks from DB
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
 * Recieved all the user's decks from DB
 * ----------------------------------------
 */

export function noDecksFound() {
	dispatcher.dispatch({
		type: constants.actions.NO_DECKS_FOUND
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

/**
 * ----------------------------------------
 * Deck legality check was successful
 * ----------------------------------------
 */

export function deckLegalityCheckSuccess(illegalCards) {
	dispatcher.dispatch({
		type: constants.actions.LEGALITY_CHECK_SUCCESS,
		illegalCards
	});
}