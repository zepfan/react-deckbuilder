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

		cardsArr.forEach((cardName, i) => {
			promiseArr[i] = fetch(cards_url + cardName)
				.then(response => { return response.json() })
				.then(json => { return {[cardName]:json} })
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
	let deckArr = _cardArrayFormatter(deck, 'forward');
	let deckErrors = [];

	// make the requests and handle the response
	mtg.getCardsArray(deckArr, (response) => {
		response.forEach((card, i) => {
			let key = Object.keys(card);

			card[key].errors ? deckErrors.push(key[0]) : null;
		});

		console.log(deckErrors);
	});
}

/** ======================= HELPER METHODS ======================= */

function _cardArrayFormatter(cardlist, direction) {
	let deckArr = cardlist.split('\n');

	// remove the quantities and spaces
	deckArr = deckArr.map((cardName) => {
		cardName = cardName.replace(/(\d\s?|[x]\s|^\s|\s$)/gm, '');
		cardName = cardName.replace(/\s/gm, '-');
		cardName = cardName.toLowerCase();
		return cardName;
	});

	return deckArr;
}



let testlist = {};
testlist.mainboard = `1x counterspell
10x Island
23x Swamp
12x Fingle-Fangle
deedly dumb doo foo
1x Eight-and-a-Half-Tailz`

validateDeckList(testlist.mainboard);