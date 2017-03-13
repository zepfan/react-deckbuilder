import React, { Component } from 'react';

class DeckCatalog extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		console.log(this.props.appState.user);
		
		return (
			<div>
				<header>
					<div class="title-bar">
						<h1>Deck Catalog</h1>
					</div>

					<div class="main-actions">
						<button>+ Add Deck</button>
					</div>
				</header>

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

					<div class="formats">
						<h2>Modern:</h2>

						<ul class="decks">
							<li>
								<img src="#" />
								<p>Amulet Bloom</p>
							</li>
							<li>
								<img src="#" />
								<p>Merfolk V3</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default DeckCatalog;