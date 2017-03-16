// react jazz
import { hashHistory } from 'react-router';

// firebase
import * as firebase from 'firebase';

// actions
import * as serverActions from '../actions/serverActions';

/**
 * ----------------------------------------
 * Initialize Firebase app
 * ----------------------------------------
 */

const config = {
	apiKey: "AIzaSyAL_goA4tvtMZWMWs2YmPXcwA1NtXaNa64",
	authDomain: "mtg-deck-catalog.firebaseapp.com",
	databaseURL: "https://mtg-deck-catalog.firebaseio.com",
	storageBucket: "mtg-deck-catalog.appspot.com",
	messagingSenderId: "64133753903"
};

export const firebaseApp = firebase.initializeApp(config);

/**
 * ----------------------------------------
 * Export convencience variables
 * ----------------------------------------
 */

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

/**
 * ----------------------------------------
 * Sign a user in
 * ----------------------------------------
 */

export function signUserIn(id, pass) {
	auth.signInWithEmailAndPassword(id, pass)
		.then(user => {
			serverActions.loginSuccess(user);
		})
		.then(() => {
			hashHistory.push('/dashboard');
		})
		.catch(e => {
			// stick with a simple error for now
			let error = 'Your username or password is not correct.'
			serverActions.loginFailed(error);
		});
}

/**
 * ----------------------------------------
 * Create a new user account in Auth
 * ----------------------------------------
 */

export function createNewUser(id, pass) {
	auth.createUserWithEmailAndPassword(id, pass)
		.then(user => {
			addNewUserToDatabase(user.uid, user.email);

			serverActions.loginSuccess(user);
		})
		.then(() => {
			hashHistory.push('/dashboard');
		})
		.catch(e => {
			let error = 'There was a problem. Please try again.'
			serverActions.registerFailed(error);
		});
}

/**
 * ----------------------------------------
 * Add a new user to the real-time database
 * ----------------------------------------
 */

function addNewUserToDatabase(userId, email) {
	db.ref('users/' + userId).set({
		email: email
	});
}