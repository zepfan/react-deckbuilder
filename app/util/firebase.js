/**
 * Hook up our Firebase account
 * 
 * Once initialized and imported into parent
 * component, it should work everywhere.
 */

import * as firebase from 'firebase';

(() => {
	const config = {
		apiKey: "AIzaSyCi4Ld4o0svBJSMP5s-JhSH8i3PvFSupnA",
		authDomain: "react-todo-app-d870e.firebaseapp.com",
		databaseURL: "https://react-todo-app-d870e.firebaseio.com",
		storageBucket: "react-todo-app-d870e.appspot.com",
		messagingSenderId: "993878740859"
	};

	firebase.initializeApp(config);
})();