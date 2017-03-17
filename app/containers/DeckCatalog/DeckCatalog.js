// react jazz
import React, { Component } from 'react';
import { Link } from 'react-router';

class DeckCatalog extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {		
		return (
			<div id="deck-catalog">
				<h1>Your Decks</h1>

				<div class="main-container">
					<div class="formats">
						<h2>Commander:</h2>

						<ul class="decks">
							<li>
								<Link to="/">
									<img class="spinning-loader" src={require('../../../public/img/deck-placeholder-img.png')} />
									<h3>Lorthos, the Badass</h3>
								</Link>
							</li>

							<li>
								<Link to="/">
									<img class="spinning-loader" src={require('../../../public/img/deck-placeholder-img.png')} />
									<h3>Lorthos, the Badass</h3>
								</Link>
							</li>

							<li>
								<Link to="/">
									<img class="spinning-loader" src={require('../../../public/img/deck-placeholder-img.png')} />
									<h3>Lorthos, the Badass</h3>
								</Link>
							</li>

							<li class="in-progress">
								<Link to="/">
									<img class="spinning-loader" src={require('../../../public/img/deck-placeholder-img.png')} />
									<h3>Lorthos, the Badass</h3>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default DeckCatalog;