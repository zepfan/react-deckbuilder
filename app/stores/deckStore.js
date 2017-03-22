// flux jazz
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import constants from '../constants/constants';

let _decks = null,
	_isSavingNewDeck = false;

class DeckStore extends EventEmitter {

	/**
	 * ----------------------------------------
	 * Getter methods
	 * ----------------------------------------
	 */

	getDecks() {
		return _decks;
	}

	isSavingNewDeck() {
		return _isSavingNewDeck;
	}

	/** ======================= HANDLE DISPATCHER ======================= */

	handleActions(action) {
		switch(action.type) {
			case constants.actions.SAVING_NEW_DECK:
				_isSavingNewDeck = true;
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