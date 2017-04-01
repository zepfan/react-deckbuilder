import React, { PropTypes } from 'react';

import CardList from './CardList';

const CardListRow = ({ cardsArrByType }) => {
	let cardLists = cardsArrByType.map((cardsArr, i) => {
		return <CardList key={i} typeName={cardsArr[0].types[0]} cardsArr={cardsArr} />;
	});

	return (
		<div class="card-list-row">
			{cardLists}
		</div>
	);
}

CardListRow.propTypes = {}

export default CardListRow;