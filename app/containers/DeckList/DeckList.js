// react jazz
import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

// helpers
import * as helpers from '../../util/helpers';

// actions
import * as viewActions from '../../actions/viewActions';

// data access objects
import * as mtgClient from '../../util/mtgClient';

// stores
import deckStore from '../../stores/deckStore';

// components
import Loader from '../../components/Loader';
import CardList from './components/CardList';

class DeckList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deck: deckStore.getCurrentDeck(),
			deckLegality: deckStore.getDeckLegality(),
			currentImage: 0,
		};

		// grab the deck from the DB
		let deckId = this.props.location.pathname.replace('/dashboard/deck/', '');
		viewActions.getSingleDeck(deckId);

		// bind methods ahead of time
		this.onDeckChange = this.onDeckChange.bind(this);
		this.changeImageOnHover = this.changeImageOnHover.bind(this);
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
			deck: deckStore.getCurrentDeck(),
			deckLegality: deckStore.getDeckLegality(),
		}, () => {
			if(this.state.deckLegality == 'N/A') {
				mtgClient.checkDeckLegality(this.state.deck);
			}
		});
	}

	/**
	 * ----------------------------------------
	 * Update the card image when hovering
	 * ----------------------------------------
	 */

	changeImageOnHover(e) {
		let multiverseId = e.target.id;

		this.setState({
			currentImage: multiverseId,
		});
	}

	/** ================ RENDER =========================== */

	render() {
		let { deck, currentImage } = this.state,
			mainboardDisplay = '',
			sideboardDisplay = '';

		if (!_.isEmpty(deck)) {
			
			/**
			 * ----------------------------------------
			 * Create the card lists
			 * ----------------------------------------
			 */

			let { deckName, format, mainboard, sideboard } = deck,
				cardTypes = [],
				cardsByType = [];

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

			// build the cards display
			mainboardDisplay = cardsByType.map((cardsArr, i) => {
				return <CardList key={i} changeImage={this.changeImageOnHover} typeName={cardsArr[0].types[0]} cardsArr={cardsArr} />;
			});

			// build the sideboard
			if(sideboard) {
				sideboardDisplay = <CardList changeImage={this.changeImageOnHover} typeName={'Sideboard'} cardsArr={sideboard} />;
			}

			/**
			 * ----------------------------------------
			 * Get the deck's auxiliary information
			 * ----------------------------------------
			 */

			let dateAdded = helpers.formatDate(deck.dateAdded),
				deckLegality = this.state.deckLegality,
				cardQty = null,
				avgCMC = null,
				zeroCMC = null;

			// get the quantity of cards
			mainboard.forEach((card) => {
				cardQty += card.quantity;
				
				// used for calculating avg CMC
				if(card.cmc) {
					avgCMC += card.cmc * card.quantity;
				} else {
					zeroCMC += card.quantity;
				}
			});

			// caluclate average CMC
			avgCMC = avgCMC/(cardQty - zeroCMC);
			avgCMC = avgCMC.toFixed(2);

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
											<li><span>Deck added:</span> {dateAdded}</li>
											<li><span>Legality:</span> {deckLegality}</li>
											<li><span>Cards:</span> {cardQty}</li>
											<li><span>Avg CMC:</span> {avgCMC}</li>
										</ul>
									</div>
								</div>

								<div class="right-col">
									<Masonry elementType={'div'}>
										{mainboardDisplay}
										{sideboardDisplay}
									</Masonry>
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