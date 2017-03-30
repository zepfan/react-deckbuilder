import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DeckListItem = ({ deck }) => {
	let featuredCardImage;

	deck.mainboard.forEach((card, i) => {
		if(card.special == 'CMDR' || card.special == 'FEAT') {
			featuredCardImage = `https://image.deckbrew.com/mtg/multiverseid/${card.multiverseId}.jpg`;
		}
	})

	return (
		<li>
			<Link to={`/dashboard/deck/${deck.deckId}`}>
				<div class="featured-card">
					<img src={featuredCardImage} />
				</div>
				<h3>{deck.deckName}</h3>
			</Link>
		</li>
	);
}

DeckListItem.propTypes = {}

export default DeckListItem;