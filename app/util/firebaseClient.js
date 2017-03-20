// react jazz
import { hashHistory } from 'react-router';

// firebase
import * as firebase from 'firebase';

// actions
import * as serverActions from '../actions/serverActions';

/** ================ INIT =========================== */

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

/** ================ SIGN IN =========================== */

/**
 * ----------------------------------------
 * Sign a user in
 * ----------------------------------------
 */

export function signUserIn(id, pass) {
	auth.signInWithEmailAndPassword(id, pass)
		.then(user => {
			setLoggedInUser(user.uid, username);
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

/** ================ CREATE ACCOUNT =========================== */

/**
 * ----------------------------------------
 * Confirm that the username is available
 * ----------------------------------------
 */

export function validateNewUser(email, username, pass) {
	db.ref('usernames/').once('value').then(function(snapshot) {
		if(!snapshot.val()[username]) {
			createNewUser(email, username, pass);
		} else {
			let error = 'Chosen username is unavailable.'
			serverActions.registerFailed(error);
		}
	});
}

/**
 * ----------------------------------------
 * Create new user account in Auth
 * ----------------------------------------
 */

function createNewUser(email, username, pass) {
	auth.createUserWithEmailAndPassword(email, pass)
		.then(user => {
			user.updateProfile({
			       displayName: "Random Name"
			   }).then(function() {
			       setLoggedInUser(user.uid, username);
			   }, function(error) {
			       // TODO: send off some sort of account error
			       console.warn('Logged in status not set');
			   });

			addNewUserToDatabase(user.uid, user.email, username);
			
			serverActions.registerSuccess(user);
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

function addNewUserToDatabase(userId, email, username) {
	// give the user their own DB tree
	db.ref('users/' + userId).set({
		email: email,
		username: username
	});

	// add their username to the usernames list
	db.ref('usernames/').update({
		[username]: userId
	});
}

/**
 * ----------------------------------------
 * Set the user ID in local storage
 * ----------------------------------------
 */

function setLoggedInUser(userId, username) {
	localStorage.setItem('FB_USER_ID', userId);
	localStorage.setItem('FB_DISPLAY_NAME', username);
}