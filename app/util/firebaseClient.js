import * as firebase from 'firebase';
import { hashHistory } from 'react-router';

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
			hashHistory.push('/dashboard');
		})
		.catch(e => {
			/* fire off a server action that does this... */

			// this.setState({ 
			// 	errors: {
			// 		...this.state.errors,
			// 		loginError: 'Your email or password is incorrect.'
			// 	},
			// 	isLoading: false
			// });
		});
}

/**
 * ----------------------------------------
 * Create a new user account
 * ----------------------------------------
 */

export function createNewUser(id, pass) {
	auth.createUserWithEmailAndPassword(id, pass)
		.then(user => {
			console.log('added to database');
			// serverActions.createNewUser(user.uid, user.email);
		})
		.then(() => {
			hashHistory.push('/dashboard');
		})
		.catch(e => {
			console.log(e.message);
			/* fire off a server action that does this.... */

			// error jazz
			// this.setState({ 
			// 	errors: {
			// 		...this.state.errors,
			// 		signUpError: 'There was a problem. Please try again.'
			// 	},
			// 	isLoading: false
			// });
		});
}

function addNewUserToDatabase(userId, email) {
	db.ref('users/' + userId).set({
		email: email
	});
}