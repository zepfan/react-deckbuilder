import React, { PropTypes } from 'react';

import DeckListItem from './DeckListItem';

const FormatRow = ({ formatName, decksArr }) => {
	let decks = decksArr.map((deck, i) => {
		return <DeckListItem key={i} deck={deck} />;
	});

	return (
		<div class="format">
			<div class="format-interior container-1100">
				<h2>{formatName}:</h2>

				<ul class="decks">
					{decks}
				</ul>
			</div>
		</div>
	);
}

FormatRow.propTypes = {}

export default FormatRow;