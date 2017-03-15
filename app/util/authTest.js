/**
 * DEBUG ONLY
 * Helper methods for quickly testing things
 * relying on firebase.auth()
 */

import { auth } from './firebaseClient';

/* log in to test account */
window.logIn = function() {
	const email = 'adam.rich+test@gmail.com';
	const pass = 'test123';
	const promise = auth.signInWithEmailAndPassword(email, pass);
}

/* log out test account */
window.logOut = function() {
	auth.signOut().then(function() {
	  console.log('signed out');
	}).catch(function(error) {
	  console.log('error while signing out');
	});
}

/* check if you're logged in / output user ID */
window.currentUser = function() {
	console.log(auth.currentUser.uid);
}