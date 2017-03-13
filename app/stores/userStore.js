// flux jazz
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class UserStore extends EventEmitter {
	constructor() {
		super();

		this.user = {
			isLoggedIn: null,
			userId: null
		};
	}

	/** ================ HELPERS =========================== */

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
	 * Set the user's logged in state
	 * ----------------------------------------
	 */

	setAuthState(state, uid) {
		this.user = {...this.user, isLoggedIn: state, userId: uid};
	}


	/** ================ HANDLE DISPATCHER =========================== */

	handleActions(act) {
		switch(act.type) {
			case 'SET_AUTH_STATE':
				this.setAuthState(act.state, act.uid);
				break;
		}
	}
}

const userStore = new UserStore;

dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;