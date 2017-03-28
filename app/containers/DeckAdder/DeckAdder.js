// react jazz
import React, { Component } from 'react';

// data
import supportedFormats from '../../data/supportedFormats';

// actions
import * as viewActions from '../../actions/viewActions';

// stores
import userStore from '../../stores/userStore';
import deckStore from '../../stores/deckStore';

// components
import TextFieldGroup from '../../components/forms/TextFieldGroup';
import TextAreaGroup from '../../components/forms/TextAreaGroup';
import SelectInputGroup from '../../components/forms/SelectInputGroup';
import CheckBoxGroup from '../../components/forms/CheckBoxGroup';
import Loader from '../../components/Loader';

class DeckAdder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: userStore.getUser(),
			deck: {
				deckName: '',
				format: '',
				commander: '',
				featuredCard: '',
				inProgress: false,
				isPrivate: false,
				description: '',
				mainboard: '',
				sideboard: '',
			},
			visibleTab: 'mainboard-tab',
			validationErrors: '',
			deckErrors: deckStore.getDeckErrors(),
			isSavingNewDeck: deckStore.isSubmittingNewDeck()
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.onDecksChange = this.onDecksChange.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.changeTabs = this.changeTabs.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.parseDeckList = this.parseDeckList.bind(this);
		this.saveNewDeck = this.saveNewDeck.bind(this);
	}

	/** ================ LIFECYCLE =========================== */

	componentWillMount() {
		userStore.on('change', this.onUserChange);
		deckStore.on('change', this.onDecksChange);
	}

	componentWillUnmount() {
		userStore.removeListener('change', this.onUserChange);
		deckStore.removeListener('change', this.onDecksChange);
	}

	/** ================ METHODS =========================== */

	/**
	 * ----------------------------------------
	 * Update the state when the user store does
	 * ----------------------------------------
	 */

	onUserChange(e) {
		this.setState({
			user: userStore.getUser()
		});
	}

	/**
	 * ----------------------------------------
	 * Update the state when the deck store does
	 * ----------------------------------------
	 */

	onDecksChange(e) {
		this.setState({
			isSavingNewDeck: deckStore.isSubmittingNewDeck(),
			deckErrors: deckStore.getDeckErrors()
		});
	}

	/**
	 * ----------------------------------------
	 * Toggle the mainboard/sideboard tabs
	 * ----------------------------------------
	 */

	changeTabs(e) {
		this.setState({ visibleTab: e.target.id });
	}

	/**
	 * ----------------------------------------
	 * Handle input changes
	 * ----------------------------------------
	 */

	onInputChange(e) {
		let deck;

		if(e.target.type == 'checkbox') {
			deck = { [e.target.name]: e.target.checked };
		} else {
			deck = { [e.target.name]: e.target.value };
		}

		this.setState({ deck: { ...this.state.deck, ...deck } });
	}

	/**
	 * ----------------------------------------
	 * Save the deck to the database
	 * ----------------------------------------
	 */

	onSubmit(e) {
		e.preventDefault();

		let deck = this.state.deck;

		if(deck.format == 'Commander') {
			delete deck['featuredCard'];
		} else {
			delete deck['commander'];
		}

		this.validateForm(deck);
	}

	/**
	 * ----------------------------------------
	 * Client-side form input validation
	 * ----------------------------------------
	 */
	
	validateForm(deck) {
		let validationErrors = {};

		if(!this.state.deck.deckName) validationErrors.deckName = "Please enter a name for your deck!";
		if(!this.state.deck.format) validationErrors.format = "Please select a format!";
		if(!this.state.deck.description) validationErrors.description = "Please enter a description!";
		if(!this.state.deck.mainboard) validationErrors.mainboard = "A mainboard is required!";

		if(this.state.deck.format == 'Commander') {
			if(!this.state.deck.commander) validationErrors.commander = "Please input your commander!";	
		} else {
			if(!this.state.deck.featuredCard) validationErrors.featuredCard = "Please choose a featured card!";
		}

		this.setState({ validationErrors: {...validationErrors} }, () => {
			if(_.isEmpty(this.state.validationErrors)) {
				this.saveNewDeck(deck);
			}
		});
	}

	/**
	 * ----------------------------------------
	 * Save the deck once validated
	 * ----------------------------------------
	 */

	saveNewDeck(deck) {
		let mainboard = this.parseDeckList(deck.mainboard.split('\n')),
			sideboard = this.parseDeckList(deck.sideboard.split('\n'));

		deck = { ...deck, mainboard, sideboard };

		viewActions.validateDeckList(deck);
	}

	/**
	 * ----------------------------------------
	 * Prep the deck for neat travel
	 * ----------------------------------------
	 */

	parseDeckList(deckArr) {
		const quantityRegex = /(\d\s?|[x]\s\b|^\s|\s$)/gi,
			categoryRegex = /(#.+?(?=[\s])|#.+$)/g,
			specialRegex = /([*].+)/g,
			spacesRegex = /\s/g,
			specialCharsRegex = /([^\w\s|-])/g;

		// remove any empty values
		deckArr = deckArr.filter(n => { return n !== '' });

		deckArr = deckArr.map((card) => {
			let cardObj = {};
			
			// parse the quantity
			cardObj.quantity = card.match(quantityRegex);
			cardObj.quantity = cardObj.quantity ? parseInt(cardObj.quantity.join(''), 10) : 1;
			card = card.replace(quantityRegex, '');

			// parse the custom category
			cardObj.category = card.match(categoryRegex);
			cardObj.category = cardObj.category ? cardObj.category.join('').trim().substring(1) : null;
			card = card.replace(categoryRegex, '');

			// parse any special flags
			cardObj.special = card.match(specialRegex);
			cardObj.special = cardObj.special ? cardObj.special.join('').trim().substring(1).slice(0, -1) : null;
			card = card.replace(specialRegex, '');

			// parse originial name
			cardObj.name = card.trim();

			// format card name for api usage
			cardObj.formattedName = card.trim().replace(specialCharsRegex, '').toLowerCase().replace(spacesRegex, '-');

			return cardObj;
		});

		return deckArr;
	}

	/** ======================= RENDER ======================= */

	render() {
		const { deck, isSavingNewDeck, validationErrors, deckErrors, visibleTab } = this.state;

		return (
			<div id="deck-adder">
				<h1>Add New Deck</h1>

				<div class="container-1100">
					<div class="main-container">
						{deckErrors ? <span class="error-msg">{deckErrors}</span> : ''}

						<form onSubmit={this.onSubmit}>
							<div class="row">
								<div class="left-col">
									{/* Deck Name */}
									<TextFieldGroup
										label="Deck Name:"
										name="deckName"
										id="deckName"
										value={deck.deckName}
										onChange={this.onInputChange}
										error={validationErrors.deckName}
									/>

									{/* Format */}
									<SelectInputGroup
										label="Format:"
										name="format"
										id="format"
										value={deck.format}
										onChange={this.onInputChange}
										options={supportedFormats}
										placeholder="Select your format"
										error={validationErrors.format}
									/>

									{/* Choose a featured card if not EDH */}
									<TextFieldGroup
										label="Choose a featured card:"
										name="featuredCard"
										id="featuredCard"
										className={deck.format !== 'Commander' ? 'visible anim-slide-down' : 'anim-slide-up'}
										value={deck.featuredCard}
										onChange={this.onInputChange}
										error={validationErrors.featuredCard}
									/>

									{/* Choose a commander if format is EDH */}
									<TextFieldGroup
										label="Commander:"
										name="commander"
										id="commander"
										className={deck.format == 'Commander' ? 'visible anim-slide-down' : 'anim-slide-up'}
										value={deck.commander}
										onChange={this.onInputChange}
										error={validationErrors.commander}
									/>

									{/* Description */}
									<TextAreaGroup
										label="Description:"
										name="description"
										id="description"
										onChange={this.onInputChange}
										value={deck.description}
										rows="4"
										error={validationErrors.description}
									/>

									{/* In Progress? */}
									<CheckBoxGroup
										label="Is this deck in progress?"
										name="inProgress"
										id="inProgress"
										value="inProgress"
										onChange={this.onInputChange}
										checked={deck.inProgress}
										error={validationErrors.inProgress}
									/>

									{/* In Private? */}
									<CheckBoxGroup
										label="Do you want to make this deck private?"
										name="isPrivate"
										id="isPrivate"
										value="isPrivate"
										onChange={this.onInputChange}
										checked={deck.isPrivate}
										error={validationErrors.isPrivate}
									/>
								</div>

								<div class="right-col">
									{/* Main List */}
									<TextAreaGroup
										label="Mainboard:"
										name="mainboard"
										id="mainboard"
										onClick={this.changeTabs}
										onChange={this.onInputChange}
										value={deck.mainboard}
										rows="20"
										error={validationErrors.mainboard}
										className={visibleTab == 'mainboard-tab' ? 'visible' : null}
									/>

									<TextAreaGroup
										label="Sideboard:"
										name="sideboard"
										id="sideboard"
										onClick={this.changeTabs}
										onChange={this.onInputChange}
										value={deck.sideboard}
										rows="20"
										error={validationErrors.sideboard}
										className={visibleTab == 'sideboard-tab' ? 'visible' : null}
									/>
								</div>
							</div>

							<div class="control-submit">
								<button class="control-btn btn" type="submit">Add This Deck</button>

								{isSavingNewDeck ? <Loader /> : ''}
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default DeckAdder;