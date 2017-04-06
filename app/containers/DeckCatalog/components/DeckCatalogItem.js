import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DeckCatalogItem = ({ deck }) => {
	let featuredCardImage;

	deck.mainboard.forEach((card, i) => {
		if(card.special == 'CMDR' || card.special == 'FEAT') {
			featuredCardImage = `https://image.deckbrew.com/mtg/multiverseid/${card.multiverseId}.jpg`;
		}
	})

	return (
		<li class={deck.inProgress ? 'in-progress' : ''}>
			<Link to={`/dashboard/deck/${deck.deckId}`}>
				<div class="featured-card">
					<img src={featuredCardImage} />
				</div>
				<h3>{deck.deckName}</h3>
			</Link>
		</li>
	);
}

DeckCatalogItem.propTypes = {}

export default DeckCatalogItem;