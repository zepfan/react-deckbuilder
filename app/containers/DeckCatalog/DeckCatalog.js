// react jazz
import React, { Component } from 'react';
import { Link } from 'react-router';

// stores
import deckStore from '../../stores/deckStore';

class DeckCatalog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			decks: deckStore.getDecks(),
			deckTeasers: [
				{
					deckId: '23asdf33',
					deckName: 'Badass Deck',
					deckImage: 'asfasdf',
					format: 'Modern'
				},
				{
					deckId: '23asdf33',
					deckName: 'Badass Deck',
					deckImage: 'asfasdf',
					format: 'Commander'
				}
			],
		};
	}

	/** ================ RENDER =========================== */

	render() {

		const deckTeasers = this.state.deckTeasers.map((deckTeaser, i) => {
			return <li key={i}>
						<Link to="/">
							<img src="#" />
							<h3>{deckTeaser.deckName}</h3>
						</Link>
					</li>;
		});

		return (
			<div id="deck-catalog">
				<h1>Your Decks</h1>

				<div class="main-container">
					<div class="formats">
						<div class="format">
							<div class="format-interior container-1100">
								<h2>Commander:</h2>

								<ul class="decks">
									{deckTeasers}
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