/**
 * ----------------------------------------
 * Constants
 * ----------------------------------------
 */

export default {
	actions: mirror([
		'SIGNING_IN_USER',
		'CREATING_NEW_USER'
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