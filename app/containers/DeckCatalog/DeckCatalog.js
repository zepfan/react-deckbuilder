// react jazz
import React, { Component } from 'react';

// firebase
import { auth } from '../../util/firebase';

class DeckCatalog extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		const user = auth.currentUser;
		console.log(user.uid);
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