// flux jazz
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

// firebase
import { db } from '../util/firebase';

class UserStore extends EventEmitter {
	constructor() {
		super();

		this.user = {}
	}

	/** ===================== HELPERS ===================== */

	/**
	 * ----------------------------------------
	 * Return the user
	 * ----------------------------------------
	 */

	getUser() {
		return this.user;
	}

	/**
	 * ----------------------------------------
	 * Create a new user in the database
	 * ----------------------------------------
	 */
	
	createNewUser(userId, email) {
		db.ref('users/' + userId).set({
			email: email
		});
	}

	

	/** ===================== HANDLE DISPATCHER ===================== */

	handleActions(action) {
		switch(action.type) {
			case 'CREATE_NEW_USER':
				this.createNewUser(action.userId, action.email);
				break;
		}
	}
}

const userStore = new UserStore;

dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;