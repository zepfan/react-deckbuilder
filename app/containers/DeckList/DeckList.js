// react jazz
import React, { Component } from 'react';

// actions
import * as viewActions from '../../actions/viewActions';

// stores
import deckStore from '../../stores/deckStore';

// components
import Loader from '../../components/Loader';
import CardListRow from './components/CardListRow';

class DeckList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deck: deckStore.getSingleDeck(),
			currentImage: 0,
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

	generateRows(list, rowLength) {
	    var rows = [],
	        currentRow = [];

		list.map(function(item, i) { 
			if (i % rowLength === 0 && i !== 0) {
				rows.push(currentRow);
				currentRow = [];
			}
			currentRow.push(item);
		});
		rows.push(currentRow);

	    return rows;
	}

	/** ================ RENDER =========================== */

	render() {
		let { deck, currentImage } = this.state,
			cardRowsDisplay = '';

		if (!_.isEmpty(deck)) {
			let { deckName, format, mainboard } = deck,
				cardTypes = [],
				cardsByType = [],
				cardRows = [];

			// get the unique types
			mainboard.forEach((card) => { 
				cardTypes.indexOf(card.types[0]) < 0 && cardTypes.push(card.types[0]);
			});

			// split the cards into sub-arrays based on type
			cardTypes.forEach((type, i) => {
				cardsByType[i] = [];

				mainboard.forEach((card) => {
					card.types[0] == type && cardsByType[i].push(card);
				});
			});

			// split all of the cardsByType lists into rows
			cardRows = this.generateRows(cardsByType, 3);

			// build the display
			cardRowsDisplay = cardRows.map((row, i) => {
				return <CardListRow key={i} cardsArrByType={row} />
			});

			return (
				<div id="deck-list">
					<h1>
						<span class="subline">{format} DECK:</span> 
						{deckName}
					</h1>

					<div class="main-container">
						<div class="container-1100">
							<div class="row">
								<div class="left-col">
									<div id="card-image">
										<img src={`https://image.deckbrew.com/mtg/multiverseid/${currentImage}.jpg`} />
									</div>

									<div id="deck-stats">
										<ul>
											<li>Date added:</li>
											<li>Last Updated:</li>
											<li>Legality:</li>
											<li>Cards:</li>
											<li>Avg CMC:</li>
										</ul>
									</div>
								</div>

								<div class="right-col">
									{cardRowsDisplay}
								</div>
							</div>
						</div>
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