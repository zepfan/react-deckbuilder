import dispatcher from '../dispatcher';
import constants from '../constants/constants';
import * as firebaseClient from '../util/firebaseClient';
import * as mtgClient from '../util/mtgClient';

/** ======================= AUTH ======================= */

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

export function validateNewUser(email, username, pass) {
	dispatcher.dispatch({
		type: constants.actions.REGISTERING,
		email,
		username,
		pass
	});

	firebaseClient.validateNewUser(email, username, pass);
}

/** ======================= DECKS ======================= */

/**
 * ----------------------------------------
 * Validate a deck list/send it off for save
 * ----------------------------------------
 */

export function validateDeckList(deck) {
	dispatcher.dispatch({
		type: constants.actions.VALIDATING_DECK_LIST,
		deck
	});

	mtgClient.validateDeckList(deck);
}

/**
 * ----------------------------------------
 * Retrieve the user's decks
 * ----------------------------------------
 */

export function getUsersDecks() {
	dispatcher.dispatch({
		type: constants.actions.RETRIEVING_USERS_DECKS,
	});

	firebaseClient.getUsersDecks();
}

/**
 * ----------------------------------------
 * Retrieve a single deck
 * ----------------------------------------
 */

export function getSingleDeck(deckId) {
	dispatcher.dispatch({
		type: constants.actions.RETRIEVING_SINGLE_DECK,
	});

	firebaseClient.getSingleDeck(deckId);
}

export function signUserOut() {
	dispatcher.dispatch({
		type: constants.actions.SIGN_USER_OUT,
	});

	firebaseClient.signUserOut();
}