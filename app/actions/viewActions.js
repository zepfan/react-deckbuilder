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

export function validateDeckList(deck) {
	dispatcher.dispatch({
		type: constants.actions.VALIDATING_DECK_LIST,
		deck
	});

	mtgClient.validateDeckList(deck);
}

/**
 * ----------------------------------------
 * Save a new deck
 * ----------------------------------------
 */

// export function saveNewDeck(deck) {
// 	dispatcher.dispatch({
// 		type: constants.actions.SAVING_NEW_DECK,
// 		deck
// 	});

// 	firebaseClient.saveNewDeck(deck);
// }