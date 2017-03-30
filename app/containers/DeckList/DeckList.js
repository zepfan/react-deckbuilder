// react jazz
import React, { Component } from 'react';

// actions
import * as viewActions from '../../actions/viewActions';

// stores
import deckStore from '../../stores/deckStore';

// components
import Loader from '../../components/Loader';

class DeckList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deck: deckStore.getSingleDeck(),
		};

		this.onDeckChange = this.onDeckChange.bind(this);

		let deckPath = this.props.location.pathname;
		let deckId = this.props.location.pathname.replace('/dashboard/deck/', '');
		viewActions.getSingleDeck(deckId);
	}

	/** ================ LIFECYCLE =========================== */

	componentWillMount() {
		deckStore.on('change', this.onDeckChange);
	}

	componentWillUnmount() {
		deckStore.removeListener('change', this.onDeckChange);
	}

	/** ================ METHODS =========================== */

	/**
	 * ----------------------------------------
	 * Update the state when the deck store does
	 * ----------------------------------------
	 */

	onDeckChange(e) {
		this.setState({
			deck: deckStore.getSingleDeck(),
		});
	}

	/** ================ RENDER =========================== */

	render() {
		let { deck } = this.state;

		if (!_.isEmpty(deck)) {
			let { deckName, format, mainboard } = deck,
				mainboardList = [];

			mainboardList = mainboard.map((card, i) => {
				return <li key={i}>
							<span class="card-qty">{`${card.quantity}x`}&nbsp;</span>
							<span class="card-name">{card.name}</span>
						</li>;
			});

			return (
				<div id="deck-list">
					<h1>
						<span class="subline">{format} DECK:</span> 
						{deckName}
					</h1>

					<div class="main-container">
						{mainboardList}
					</div>
				</div>
			);
		} else {
			return (
				<Loader className="center" />
			)
		}
	}
}

export default DeckList;