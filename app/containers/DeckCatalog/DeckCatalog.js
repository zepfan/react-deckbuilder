// react jazz
import React, { Component } from 'react';
import { Link } from 'react-router';

// actions
import * as viewActions from '../../actions/viewActions';

// stores
import deckStore from '../../stores/deckStore';

class DeckCatalog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			decks: deckStore.getDecks(),
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
		console.log(this.state.decks);
		
		let decksDisplay;

		if (this.state.decks.length) {
			let featuredCardImage;

			decksDisplay = this.state.decks.map((deck, i) => {

				deck.mainboard.forEach((card) => {
					if(card.special == 'CMDR' || card.special == 'FEAT') {
						featuredCardImage = `https://image.deckbrew.com/mtg/multiverseid/${card.multiverseId}.jpg`;
					}
				});

				return <li key={i}>
							<Link to="/">
								<div class="featured-card">
									<img src={featuredCardImage} />
								</div>
								<h3>{deck.deckName}</h3>
							</Link>
						</li>;

			});
		} else {
			decksDisplay = <div id="no-decks-found" class="panel">
								<p>No decks found!<br /> 
									<Link to="/dashboard/add-deck">Click here to create your first one!</Link>
								</p>
							</div>
		}

		return (
			<div id="deck-catalog">
				<h1>Your Decks</h1>

				<div class="main-container">
					<div class="formats">
						<div class="format">
							<div class="format-interior container-1100">
								<h2>Commander:</h2>

								<ul class="decks">
									{decksDisplay}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DeckCatalog;