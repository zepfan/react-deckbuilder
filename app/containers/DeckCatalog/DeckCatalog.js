// react jazz
import React, { Component } from 'react';

class DeckCatalog extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {		
		return (
			<div>
				<h1>Deck Catalog</h1>

				<div class="main-container">
					<div class="formats">
						<h2>Commander:</h2>

						<ul class="decks">
							<li>
								<img src="#" />
								<p>Lorthos, the Badass</p>
							</li>
							<li>
								<img src="#" />
								<p>Hannah, Artifact Reviver</p>
							</li>
							<li>
								<img src="#" />
								<p>Wrexial, Steal Everything</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default DeckCatalog;