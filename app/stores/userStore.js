// flux jazz
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import constants from '../constants/constants';

let _user = null,
	_isLoggingIn = false,
	_logInErrors = null,
	_isRegistering = false,
	_registerErrors = null;

class UserStore extends EventEmitter {

	/**
	 * ----------------------------------------
	 * Getter methods
	 * ----------------------------------------
	 */

	getUser() {
		return _user;
	}

	getLoginErrors() {
		return _logInErrors;
	}

	isLoggingIn() {
		return _isLoggingIn;
	}

	getRegisteringErrors() {
		return _registerErrors;
	}

	isRegistering() {
		return _isRegistering;
	}

	/** ======================= HANDLE DISPATCHER ======================= */

	handleActions(action) {
		switch(action.type) {
			case constants.actions.LOGGING_IN:
				_isLoggingIn = true;
				this.emit('change');
				break;

			case constants.actions.LOGIN_SUCCESS:
				_user = action.user;
				this.emit('change');
				break;

			case constants.actions.LOGIN_FAILED:
				_logInErrors = action.errors;
				_isLoggingIn = false;
				this.emit('change');
				break;

			case constants.actions.REGISTERING:
				_isRegistering = true;
				this.emit('change');
				break;

			case constants.actions.REGISTER_SUCCESS:
				_user = action.user;
				this.emit('change');
				break;

			case constants.actions.REGISTER_FAILED:
				_isRegistering = false;
				_registerErrors = action.errors;
				this.emit('change');
				break;

			default:
				break;
		}
	}
}

const userStore = new UserStore;

dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;