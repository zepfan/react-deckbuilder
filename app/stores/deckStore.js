// flux jazz
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import constants from '../constants/constants';

let _decks = [],
	_singleDeck = {},
	_isDeckLegal = 'N/A',
	_isSubmittingNewDeck = false,
	_deckErrors = false,
	_noDecksFound = false;

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

	getCurrentDeck() {
		return _singleDeck;
	}

	getDeckLegality() {
		return _isDeckLegal;
	}

	getNoDecksFoundStatus() {
		return _noDecksFound;
	}

	/** ======================= HANDLE DISPATCHER ======================= */

	handleActions(action) {
		switch(action.type) {
			case constants.actions.VALIDATING_DECK_LIST:
				_isSubmittingNewDeck = true;
				this.emit('change');
				break;

			case constants.actions.DECK_VALIDATION_SUCCESS:
				_isSubmittingNewDeck = false;
				this.emit('change');
				break;

			case constants.actions.DECK_VALIDATION_FAILED:
				_deckErrors = action.errors;
				_isSubmittingNewDeck = false;
				this.emit('change');
				break;

			case constants.actions.DECKS_RECIEVED:
				_decks = action.decks;
				_noDecksFound = false;
				this.emit('change');
				break;

			case constants.actions.NO_DECKS_FOUND:
				_noDecksFound = true;
				this.emit('change');
				break;

			case constants.actions.SINGLE_DECK_RECIEVED:
				_singleDeck = action.deck;
				this.emit('change');
				break;

			case constants.actions.SIGN_OUT_SUCCESS:
				_decks = [];
				_singleDeck = {};
				_isSubmittingNewDeck = false;
				_deckErrors = false;
				_noDecksFound = false;
				this.emit('change');
				break;

			case constants.actions.LEGALITY_CHECK_SUCCESS:
				console.log(action.illegalCards);
				// _isDeckLegal = action.illegalCards.length ? 'not legal' : 'legal';
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