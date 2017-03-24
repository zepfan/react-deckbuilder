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
		'VALIDATING_DECK_LIST',
		'DECK_VALIDATION_SUCCESS',
		'DECK_VALIDATION_FAILED'
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