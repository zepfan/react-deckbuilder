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
	if(id.includes('@')) {
		_signUserInWithEmail(id, pass);
	} else {
		_signUserInWithUsername(id, pass);
	}
}

function _signUserInWithEmail(email, pass) {
	auth.signInWithEmailAndPassword(email, pass)
		.then(user => _handleUserSignIn(user))
		.then(() => hashHistory.push('/dashboard'))
		.catch(e => _handleSignInError(e));
}

function _signUserInWithUsername(username, pass) {
	db.ref('usernames/').child(username).once('value').then((snapshot) => {
		if(snapshot.val()) {
			let email = snapshot.val().email;
			_signUserInWithEmail(email, pass);
		} else {
			_handleSignInError();
		}
	});
}

function _handleUserSignIn(user) {
	setLoggedInUser(user.uid, user.displayName);
	serverActions.loginSuccess(user);
}

function _handleSignInError(e) {
	let error = 'Your username or password is not correct.'
	serverActions.loginFailed(error);
}

/** ======================= SIGN OUT ======================= */

/**
 * ----------------------------------------
 * Sign the current user out
 * ----------------------------------------
 */

export function signUserOut() {
	auth.signOut()
		.then(() => {
			hashHistory.push('/login');
			serverActions.signOutSuccess();
		})
		.catch((e) => {
			console.log('sign out error', e);
		})
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
		.catch(e => _handleSignUpError(e));
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
	console.log(e);
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
	userUpdates[`usernames/${username}`] = { email };

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

/**
 * ----------------------------------------
 * Saves a new deck to the database
 * ----------------------------------------
 */

export function saveNewDeck(deck) {
	const deckKey = db.ref().child('decks').push().key;
	const userId = auth.currentUser.uid; // does this belong here?

	let deckUpdates = {};

	// add the deck to the `decks` tree
	deckUpdates[`/decks/${deckKey}`] = { ...deck, deckId: deckKey };

	// add a reference to the deck in the user's tree
	deckUpdates[`/users/${userId}/decks/${deckKey}`] = { deckKey };

	db.ref().update(deckUpdates).then(() => {
		serverActions.saveNewDeckSuccess(deckKey);
		hashHistory.push(`/dashboard/deck/${deckKey}`);
	}).catch((error) => {
		serverActions.saveNewDeckFailed(error);
	});
}

/**
 * ----------------------------------------
 * Retrieves the logged in user's decks
 * ----------------------------------------
 */

export function getUsersDecks() {
	const userId = auth.currentUser.uid;
	let deckKeys = [];

	db.ref(`/users/${userId}/decks`).once('value').then(snapshot => {
		if(snapshot.val()) {
			Object.entries(snapshot.val()).forEach(([key, value]) => {
			    deckKeys.push(value.deckKey);
			});

			_getDeckObjects(deckKeys);
		} else {
			serverActions.noDecksFound();
		}
	}).catch(e => {
		console.log('decks error', e)
	});
}

function _getDeckObjects(deckKeys) {
	let decks = [];
	let promiseArr = [];

	deckKeys.forEach((deckKey, i) => {
		promiseArr[i] = db.ref(`/decks/${deckKey}`).once('value').then(snapshot => { 
			decks.push(snapshot.val());
		}).catch(e => {
			console.log('inner decks error', e)
		});
	});

	Promise.all(promiseArr)
		.then(() => { if (decks.length) { serverActions.decksRecieved(decks) } })
		.catch(e => { console.log('promise.all error', e) });
}

/**
 * ----------------------------------------
 * Retrieves a single deck
 * ----------------------------------------
 */

export function getSingleDeck(deckId) {
	const userId = auth.currentUser.uid;

	db.ref(`/users/${userId}/decks/${deckId}`).once('value')
		.then(snapshot => {
			if(snapshot.val().deckKey) {
				db.ref(`/decks/${deckId}`).once('value')
					.then(snapshot => { serverActions.singleDeckRecieved(snapshot.val()) })
					.catch(e => { console.log('inner single error', e) });
			}
		})
		.catch(e => {
			console.log('single deck error', e);
		});

}