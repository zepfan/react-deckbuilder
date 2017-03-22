// react jazz
import React, { Component } from 'react';
import { Link } from 'react-router';

// stores
import deckStore from '../../stores/deckStore';

class DeckCatalog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			decks: deckStore.getDecks()
		};
	}

	render() {		
		return (
			<div id="deck-catalog">
				<h1>Your Decks</h1>

				{/*<div class="main-container">
					<div class="formats">
						<div class="format">
							<div class="format-interior container-1100">
								<h2>Commander:</h2>

								<ul class="decks">
									<li>
										<Link to="/">
											<img src={require('../../../public/img/deck-placeholder-img.png')} />
											<h3>Lorthos, the Badass</h3>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>*/}
			</div>
		);
	}
}

export default DeckCatalog;