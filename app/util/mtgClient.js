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

	// save the originial deck as it was submitted
	deckArrOrig = [...deck.mainboard, ...deck.sideboard];

	// create a new array formatted for the endpoint
	deckArr = deckArrOrig.map((card) => { return card.formattedName; })

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

// build the final deck list object to send off
function _completeDeckObj(submittedDeck, deckArr) {
	let completedDeck = submittedDeck,
		mainboardCards,
		sideboardCards;

	// split the single array back into mainboard/sideboard arrays
	mainboardCards = deckArr.slice(0, submittedDeck.mainboard.length);
	sideboardCards = deckArr.slice(submittedDeck.mainboard.length);

	// splice the arrays
	completedDeck.mainboard = _spliceDeckArrays(completedDeck.mainboard, mainboardCards);
	completedDeck.sideboard = _spliceDeckArrays(completedDeck.sideboard, sideboardCards);

	// add timestamps
	completedDeck.dateAdded = Date.now();
	completedDeck.lastUpdated = null;

	return completedDeck;
}

// add extra card information from the API results to the originial deck
function _spliceDeckArrays(list, board) {
	list.forEach((obj, i) => {
		board.forEach((card, j) => {
			let key = Object.keys(card);
			
			if(obj.formattedName == card[key].id) {
				// card types
				obj.types = card[key].types ? card[key].types : null;
				
				// cmc
				obj.cmc = card[key].cmc ? card[key].cmc : null;
				
				// colors
				obj.colors = card[key].colors ? card[key].colors : 'colorless';

				// multiverse ID
				if(card[key].editions) {
					card[key].editions.some((edition) => {
						obj.multiverseId = edition.multiverse_id;
						return obj.multiverseId !== 0;
					});
				}
			}
		});
	});

	return list;
}

// handle any errors
function _handleDeckListErrors(deckArrOrig, deckErrors) {
	let errorMsg = '';

	// compare the formatted names to how they were originially submitted
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

/**
 * ----------------------------------------
 * Check a deck's legality by format
 * ----------------------------------------
 */

export function checkDeckLegality(deck) {
	let format = deck.format.toLowerCase(),
		mainboard = deck.mainboard,
		deckArr = [],
		illegalCards = [];
	
	deckArr = mainboard.map((card) => { return card.formattedName; });

	mtg.getCardsArray(deckArr, (response) => {
		response.forEach((card, i) => {
			let key = Object.keys(card);

			if(format === 'commander') {
				if(card[key].formats[format] && card[key].formats[format] !== 'legal') {
					illegalCards.push(card[key].name);
				}				
			} else {
				if(!card[key].formats[format] || card[key].formats[format] !== 'legal') {
					illegalCards.push(card[key].name);
				}
			}
		});

		// return
		serverActions.deckLegalityCheckSuccess(illegalCards);
	});
}


