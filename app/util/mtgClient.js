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
			promiseArr[i] = fetch(cards_url + card.formattedName)
				.then(response => { return response.json() })
				.then(json => { return {[card.formattedName]:json} })
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
	let deckErrors = [],
		errorMsg = '';

	const origDeck = deck,
		deckArr = [...deck.mainboard, ...deck.sideboard];

	mtg.getCardsArray(deckArr, (response) => {
		response.forEach((card, i) => {
			// build errors array
			let key = Object.keys(card);
			if(card[key].errors) deckErrors.push(key[0]);
		});

		console.log(deckErrors);
	});
}


// export function validateDeckList(deck) {
// 	let origDeck = deck,
// 		deckArr = _cardArrayFormatter(deck),
// 		deckErrors = [],
// 		errorMsg = '';

// 	// make the requests and handle the response
// 	mtg.getCardsArray(deckArr.formatted, (response) => {
// 		response.forEach((card, i) => {
// 			// build errors array
// 			let key = Object.keys(card);
// 			if(card[key].errors) deckErrors.push(key[0]);
// 		});

// 		if(!deckErrors) {
// 			// passes validation
// 			serverActions.deckValidationSuccess();
// 		} else {
// 			// handle the errors
// 			deckArr.formatted.forEach((val, i) => {
// 				deckErrors.forEach((error, j) => {
// 					if(val == error) errorMsg += `${deckArr.originial[i]}, `;
// 				});
// 			});

// 			errorMsg = errorMsg.trim().replace(/,$/g, '');
// 			errorMsg = `The following cards are unknown and can't be added, please ensure that you have spelled them correctly: ${errorMsg}`;

// 			serverActions.deckValidationFailed(errorMsg);
// 		}
// 	});
// }