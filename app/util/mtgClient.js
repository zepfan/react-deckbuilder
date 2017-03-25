// actions
import * as serverActions from '../actions/serverActions';

// constants
import constants from '../constants/constants';

/** ======================= API WRAPPER ======================= */

/**
 * ----------------------------------------
 * Wrap the endpoints into easy functions
 *
 * https://github.com/kyleconroy/deckbrew
 * ----------------------------------------
 */

const cards_url = 'https://api.deckbrew.com/mtg/cards/';

const mtg = {

	/**
	 * ----------------------------------------
	 * Get a single card by name
	 * ----------------------------------------
	 */

	getCardByName: function(cardName, callback) {
		fetch(cards_url + cardName)
			.then(response => { return response.json() })
			.then(json => { callback(json) })
			.catch(e => { this._handleErrors(e) });
	},

	/**
	 * ----------------------------------------
	 * Get a list of cards by a an array of names
	 * ----------------------------------------
	 */

	getCardsArray: function(cardsArr, callback) {
		let promiseArr = [];

		cardsArr.forEach((card, i) => {
			promiseArr[i] = fetch(cards_url + card)
				.then(response => { return response.json() })
				.then(json => { return {[card]:json} })
				.catch(e => { this._handleErrors(e) });
		});

		Promise.all(promiseArr)
			.then(values => { callback(values) })
			.catch(e => { this._handleErrors(e) });
	},

	/**
	 * ----------------------------------------
	 * Utils
	 * ----------------------------------------
	 */

	_handleErrors: function(error) {
		console.log('MTG ERROR: ', error);
	},
}

/** ======================= CLIENT METHODS ======================= */

/**
 * ----------------------------------------
 * Validate each card within a decklist
 * ----------------------------------------
 */

export function validateDeckList(deck) {
	let submittedDeck = deck,
		deckArrOrig = [],
		deckArr = [],
		deckErrors = [];

	// set up these two arrays to compare later
	deckArrOrig = [...deck.mainboard, ...deck.sideboard];
	deckArr = deckArrOrig.map((card) => { return card.formattedName; })

	// send off the requeset
	mtg.getCardsArray(deckArr, (response) => {
		deckArr = response;

		// build the `deckErrors` array if cards are not found
		response.forEach((card, i) => {
			let key = Object.keys(card);
			if(card[key].errors) deckErrors.push(key[0]);
		});

		// handle success/fail
		if(!deckErrors.length) {
			let deck = _completeDeckObj(submittedDeck, deckArr);
			 serverActions.deckValidationSuccess(deck);
		} else {
			_handleDeckListErrors(deckArrOrig, deckErrors);
		}
	});
}

function _completeDeckObj(submittedDeck, deckArr) {
	let completedDeck = submittedDeck,
		mainboardCards,
		sideboardCards;

	mainboardCards = deckArr.slice(0, submittedDeck.mainboard.length);
	sideboardCards = deckArr.slice(submittedDeck.mainboard.length);

	completedDeck.mainboard.forEach((obj, i) => {
		mainboardCards.forEach((card, j) => {
			let key = Object.keys(card);
			if(obj.formattedName == card[key].id) {
				obj.types = card[key].types ? card[key].types : null;
				obj.cmc = card[key].cmc ? card[key].cmc : null;
				obj.colors = card[key].colors ? card[key].colors : 'colorless';
			}
		});
	});

	completedDeck.sideboard.forEach((obj, i) => {
		sideboardCards.forEach((card, j) => {
			let key = Object.keys(card);
			if(obj.formattedName == card[key].id) {
				obj.types = card[key].types ? card[key].types : null;
				obj.cmc = card[key].cmc ? card[key].cmc : null;
				obj.colors = card[key].colors ? card[key].colors : 'colorless';
			}
		});
	});

	completedDeck.dateAdded = Date.now();
	completedDeck.lastUpdated = null;

	return completedDeck;
}

function _handleDeckListErrors(deckArrOrig, deckErrors) {
	let errorMsg = '';

	deckArrOrig.forEach((val, i) => {
		deckErrors.forEach((error, j) => {
			if(val.formattedName == error) {
				errorMsg += `${val.name}, `;
			}
		});
	});

	errorMsg = errorMsg.trim().replace(/,$/g, '');
	errorMsg = `The following cards are unknown and can't be added, please ensure that you have spelled them correctly: ${errorMsg}`;

	serverActions.deckValidationFailed(errorMsg);
}