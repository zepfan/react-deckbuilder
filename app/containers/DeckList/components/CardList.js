import React, { PropTypes } from 'react';

const CardList = ({ typeName, cardsArr }) => {
	let cards = cardsArr.map((card, i) => {
		return <li key={i}>
					<span class="card-qty">{`${card.quantity}x`}&nbsp;</span>
					<span class="card-name">{card.name}</span>
				</li>;
	});

	return (
		<div class="card-list">
			<h3>{typeName} <span>({cardsArr.length})</span></h3>

			<ul>
				{cards}
			</ul>
		</div>
	);
}

CardList.propTypes = {}

export default CardList;