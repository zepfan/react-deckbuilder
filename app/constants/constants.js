/**
 * ----------------------------------------
 * Constants
 * ----------------------------------------
 */

export default {
	actions: mirror([
		/* ======= Logging In ======= */
		'LOGGING_IN',
		'LOGIN_SUCCESS',
		'LOGIN_FAILED',

		/* ======= Registration ======= */
		'REGISTERING',
		'REGISTER_SUCCESS',
		'REGISTER_FAILED',

		/* ======= Decks ======= */
		'SAVING_NEW_DECK',
		'SAVE_NEW_DECK_SUCCESS',
		'SAVE_NEW_DECK_FAILED',
		'VALIDATING_DECK_LIST',
		'DECK_VALIDATION_SUCCESS',
		'DECK_VALIDATION_FAILED',
		'DECKS_RECIEVED',
		'NO_DECKS_FOUND',
	]),

	storageKeys: {
		userId: 'FB_USER_ID',
		userName: 'FB_DISPLAY_NAME'
	}
}

/**
 * ----------------------------------------
 * Takes an array of strings and returns an object where
 * the values are identical to the keys (instead of typing
 * the same thing a million times)
 * ----------------------------------------
 */

function mirror(arr) {
	let obj = {};

	for (let i = 0; i < arr.length; i++) {
		obj[arr[i]] = arr[i];
	}

	return obj;
}