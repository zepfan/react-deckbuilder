/**
 * DEBUG ONLY
 * Helper methods for quickly testing things
 * relying on firebase.auth()
 */

import { auth } from './firebaseClient';

/* log in to test account */
window.logIn = function() {
	const email = 'adm.rich@gmail.com';
	const pass = 'test123';
	auth.signInWithEmailAndPassword(email, pass).then(function() {
		console.log('signed in');
	}).catch(function(error) {
		console.log('error signing in');
	});
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