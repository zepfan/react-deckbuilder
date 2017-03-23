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
				inProgress: false,
				description: '',
				mainboard: ''
			},
			validationErrors: '',
			isSavingNewDeck: deckStore.isSavingNewDeck()
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.onDecksChange = this.onDecksChange.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
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
			isSavingNewDeck: deckStore.isSavingNewDeck()
		});
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

		this.validateForm(this.saveNewDeck);
	}

	/**
	 * ----------------------------------------
	 * Validate form inputs
	 * Currently only checking for non-empty vals
	 * ----------------------------------------
	 */
	
	validateForm(callback) {
		let validationErrors = {};

		if(!this.state.deck.deckName) validationErrors.deckName = "Please enter a name for your deck!";
		if(!this.state.deck.format) validationErrors.format = "Please select a format!";
		if(!this.state.deck.description) validationErrors.description = "Please enter a description!";
		if(!this.state.deck.mainboard) validationErrors.mainboard = "A mainboard is required!";

		this.setState({ validationErrors: {...validationErrors} }, () => {
			if(_.isEmpty(this.state.validationErrors)) {
				callback();
			}
		});
	}

	/**
	 * ----------------------------------------
	 * Save the deck once validated
	 * ----------------------------------------
	 */

	saveNewDeck() {
		const deck = this.state.deck;

		viewActions.validateDeckList(deck.mainboard);
		// viewActions.saveNewDeck(deck);
	}

	/** ======================= RENDER ======================= */

	render() {
		const { deck, isSavingNewDeck, validationErrors } = this.state;

		return (
			<div id="deck-adder">
				<h1>Add New Deck</h1>

				<div class="container-1100">
					<div class="main-container">
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

									{/* In Progress? */}
									<CheckBoxGroup
										label="Is this deck In Progress?"
										name="inProgress"
										id="inProgress"
										value="inProgress"
										onChange={this.onInputChange}
										checked={deck.inProgress}
										error={validationErrors.inProgress}
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
								</div>

								<div class="right-col">
									{/* Main List */}
									<TextAreaGroup
										label="Mainboard:"
										name="mainboard"
										id="mainboard"
										onChange={this.onInputChange}
										value={deck.mainboard}
										rows="15"
										error={validationErrors.mainboard}
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