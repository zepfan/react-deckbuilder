const cards_url = 'https://api.magicthegathering.io/v1/cards?';

export function validateDeckList(deck) {
	const quantityRegexp = /(.+x\s\b)/gm;
	const lineBreakRegexp = /(\r\n|\n|\r)/gm;
	let decklist;

	decklist = deck.mainboard.replace(quantityRegexp, '');
	decklist = decklist.replace(lineBreakRegexp, '|');
	decklist = 'counterspell|black lotus|cyclonic rift';

	fetch(cards_url + 'name=' + decklist)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			console.log(json);
		})
		.catch((error) => {
			console.log('mtg error', error);
		});
}

let test = {};
test.mainboard = `1x counterspell
1x cyclonic rift
10x island
4x swamp`

validateDeckList(test);