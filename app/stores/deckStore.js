// flux jazz
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import constants from '../constants/constants';

let _decks = null,
	_isSubmittingNewDeck = false,
	_deckErrors = false;

class DeckStore extends EventEmitter {

	/**
	 * ----------------------------------------
	 * Getter methods
	 * ----------------------------------------
	 */

	getDecks() {
		return _decks;
	}

	isSubmittingNewDeck() {
		return _isSubmittingNewDeck;
	}

	getDeckErrors() {
		return _deckErrors;
	}

	/** ======================= HANDLE DISPATCHER ======================= */

	handleActions(action) {
		switch(action.type) {
			case constants.actions.VALIDATING_DECK_LIST:
				_isSubmittingNewDeck = true;
				this.emit('change');
				break;

			case constants.actions.DECK_VALIDATION_FAILED:
				_deckErrors = action.errors;
				this.emit('change');
				break;

			default:
				break;
		}
	}
}

const deckStore = new DeckStore;

dispatcher.register(deckStore.handleActions.bind(deckStore));

export default deckStore;