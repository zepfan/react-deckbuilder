import React, { PropTypes } from 'react';

const CardList = ({ typeName, cardsArr, changeImage }) => {
	let quantity = null;
	let cards = cardsArr.map((card, i) => {
		quantity += card.quantity;

		// preload images
		let cardImage = new Image();
		cardImage.src = `https://image.deckbrew.com/mtg/multiverseid/${card.multiverseId}.jpg`;

		return <li key={i}>
					<span class="card-qty">{`${card.quantity}x`}&nbsp;</span>
					<span onMouseMove={changeImage} id={card.multiverseId} class="card-name">{card.name}</span>
				</li>;
	});

	return (
		<div class="card-list">
			<h3>{typeName} <span>({quantity})</span></h3>

			<ul>
				{cards}
			</ul>
		</div>
	);
}

CardList.propTypes = {}

export default CardList;