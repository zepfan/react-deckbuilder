/**
 * ----------------------------------------
 * Constants
 * ----------------------------------------
 */

export default {
	actions: mirror([
		'LOGGING_IN',
		'LOGIN_SUCCESS',
		'LOGIN_FAILED',
		'REGISTERING',
		'REGISTER_SUCCESS',
		'REGISTER_FAILED',
		'SAVING_NEW_DECK',
	]),
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