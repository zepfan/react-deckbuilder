import * as firebase from 'firebase';

/**
 * ----------------------------------------
 * Initialize our Firebase app
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
 * Export database() methods
 * ----------------------------------------
 */

export const db = firebaseApp.database();

/**
 * ----------------------------------------
 * Export auth() methods
 * ----------------------------------------
 */

export const auth = firebaseApp.auth();