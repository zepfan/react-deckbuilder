// react jazz
import React, { Component } from 'react';
import { Link } from 'react-router';

// actions
import * as viewActions from '../../actions/viewActions';

// stores
import deckStore from '../../stores/deckStore';

// components
import Loader from '../../components/Loader';
import FormatRow from './components/FormatRow';
import NoDecksFound from './components/NoDecksFound';

class DeckCatalog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			decks: deckStore.getDecks(),
			test: false,
		};

		this.onDecksChange = this.onDecksChange.bind(this);

		viewActions.getUsersDecks();
	}

	/** ================ LIFECYCLE =========================== */

	componentWillMount() {
		deckStore.on('change', this.onDecksChange);
	}

	componentWillUnmount() {
		deckStore.removeListener('change', this.onDecksChange);
	}

	/** ================ METHODS =========================== */

	/**
	 * ----------------------------------------
	 * Update the state when the deck store does
	 * ----------------------------------------
	 */

	onDecksChange(e) {
		this.setState({
			decks: deckStore.getDecks(),
		});
	}

	/** ================ RENDER =========================== */

	render() {
		let { decks, test } = this.state,
			formatsDisplay = '';

		if (decks.length) {
			let formats = [],
				decksByFormat = [];

			// get the unique formats
			decks.forEach((deck) => { 
				formats.indexOf(deck.format) < 0 && formats.push(deck.format);
			});

			// split the decks into sub-arrays based on format
			formats.forEach((format, i) => {
				decksByFormat[i] = [];

				decks.forEach((deck) => {
					deck.format == format && decksByFormat[i].push(deck);
				});
			});

			// build the format components
			formatsDisplay = decksByFormat.map((decksArr, i) => {
				return <FormatRow key={i} formatName={decksArr[0].format} decksArr={decksArr} />
			});
		} else if (test) {
			// direct them to create a new deck if none are found
			formatsDisplay = <NoDecksFound />;
		} else {
			// show loader as default state
			formatsDisplay = <Loader className="center" />;
		}

		return (
			<div id="deck-catalog">
				<h1>Your Decks</h1>

				<div class="main-container">
					<div class="formats">
						{formatsDisplay}
					</div>
				</div>
			</div>
		);
	}
}

export default DeckCatalog;