import React, { PropTypes } from 'react';

const NoDecksFound = () => {
	return (
		<div id="no-decks-found" class="panel">
			<p>No decks found!<br /> 
				<Link to="/dashboard/add-deck">Click here to create your first one!</Link>
			</p>
		</div>
	);
}

NoDecksFound.propTypes = {}

export default NoDecksFound;