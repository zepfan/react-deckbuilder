// react jazz
import { hashHistory } from 'react-router';

// firebase
import * as firebase from 'firebase';

// actions
import * as serverActions from '../actions/serverActions';

// constants
import constants from '../constants/constants';

/** ======================= INIT ======================= */

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

/** ======================= SIGN IN ======================= */

/**
 * ----------------------------------------
 * Sign a user in
 * ----------------------------------------
 */

export function signUserIn(id, pass) {
	auth.signInWithEmailAndPassword(id, pass)
		.then(user => _handleUserSignIn(user))
		.then(() => hashHistory.push('/dashboard'))
		.catch(e => _handleSignInError(e));
}

function _handleUserSignIn(user) {
	setLoggedInUser(user.uid, user.displayName);
	serverActions.loginSuccess(user);
}

function _handleSignInError(e) {
	let error = 'Your username or password is not correct.'
	serverActions.loginFailed(error);
}

/** ======================= CREATE ACCOUNT ======================= */

/**
 * ----------------------------------------
 * Confirm that the username is available
 * ----------------------------------------
 */

export function validateNewUser(email, username, pass) {
	db.ref('usernames/').child(username).once('value').then((snapshot) => {
		if(!snapshot.val()) {
			_createNewUser(email, username, pass);
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

function _createNewUser(email, username, pass) {
	auth.createUserWithEmailAndPassword(email, pass)
		.then(user => _handleNewUser(user, username))
		.then(() => hashHistory.push('/dashboard'))
		.catch(e => _handleSignUpError());
}

function _handleNewUser(user, username) {
	user.updateProfile({ displayName: username })
		.then(() => setLoggedInUser(user.uid, username))
		.catch(e => console.warn('Logged in status not set'));

	addNewUserToDatabase(user.uid, user.email, username);
	
	serverActions.registerSuccess(user);
}

function _handleSignUpError(e) {
	let error = 'There was a problem. Please try again.'
	serverActions.registerFailed(error);
}

/**
 * ----------------------------------------
 * Add a new user to the real-time database
 * ----------------------------------------
 */

function addNewUserToDatabase(userId, email, username) {
	let userUpdates = {};

	// give the user their own DB tree
	userUpdates[`users/${userId}`] = { email, username };

	// add their username to the usernames list
	userUpdates[`usernames/${username}`] = { userId };

	db.ref().update(userUpdates).then(() => {
		console.log('add new user to DB success');
	}).catch((error) => {
		console.log('add new user to DB error');
	});
}

/**
 * ----------------------------------------
 * Set the user ID in local storage
 * ----------------------------------------
 */

function setLoggedInUser(userId, username) {
	localStorage.setItem(constants.storageKeys.userId, userId);
	localStorage.setItem(constants.storageKeys.userName, username);
}

/** ======================= DECKS ======================= */

export function saveNewDeck(deck) {
	const deckKey = db.ref().child('decks').push().key;
	const userId = auth.currentUser.uid; // does this belong here?

	let deckUpdates = {};

	// add the deck to the `decks` tree
	deckUpdates[`/decks/${deckKey}`] = { ...deck };

	// add a reference to the deck in the user's tree
	deckUpdates[`/users/${userId}/decks/${deckKey}`] = { deckKey };

	db.ref().update(deckUpdates).then(() => {
		console.log('save new deck success');
	}).catch((error) => {
		console.log('save new deck error');
	});
}