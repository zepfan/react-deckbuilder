// react jazz
import React, { Component } from 'react';

// data
import supportedFormats from '../../data/supportedFormats';

// stores
import userStore from '../../stores/userStore';

// components
import TextFieldGroup from '../../components/forms/TextFieldGroup';
import TextAreaGroup from '../../components/forms/TextAreaGroup';
import SelectInputGroup from '../../components/forms/SelectInputGroup';
import CheckBoxGroup from '../../components/forms/CheckBoxGroup';

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
				mainboard: '',
				sideboard: ''
			}
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onCheckboxChange = this.onCheckboxChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	/** ================ LIFECYCLE =========================== */

	componentWillMount() {
		userStore.on('change', this.onUserChange);
	}

	componentWillUnmount() {
		userStore.removeListener('change', this.onUserChange);
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
	 * Handle input changes
	 * ----------------------------------------
	 */

	onInputChange(e) {
		let deck = { [e.target.name]: e.target.value };

		this.setState({ deck: { ...this.state.deck, ...deck } }, () => {
			console.log(this.state)
		});
	}

	onCheckboxChange(e) {
		let deck = { [e.target.name]: e.target.checked };

		this.setState({ deck: { ...this.state.deck, ...deck } });
	}

	/**
	 * ----------------------------------------
	 * Save the deck to the database
	 * ----------------------------------------
	 */

	onSubmit(e) {
		e.preventDefault();
	}

	/** ================ RENDER =========================== */

	render() {
		const { deck } = this.state;

		return (
			<div>
				<form onSubmit={this.onSubmit}>
					{/* Deck Name */}
					<TextFieldGroup
						label="Deck Name:"
						name="deckName"
						id="deckName"
						value={deck.deckName}
						onChange={this.onInputChange}
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
					/>

					{/* In Progress? */}
					<CheckBoxGroup
						label="Is this deck In Progress?"
						name="inProgress"
						id="inProgress"
						value="inProgress"
						onChange={this.onCheckboxChange}
						checked={deck.inProgress}
					/>

					{/* Description */}
					<TextAreaGroup
						label="Description:"
						name="description"
						id="description"
						onChange={this.onInputChange}
						value={deck.description}
						rows="4"
					/>

					{/* Main List */}
					<TextAreaGroup
						label="Mainboard:"
						name="mainboard"
						id="mainboard"
						onChange={this.onInputChange}
						value={deck.mainboard}
						rows="15"
					/>

					{/* Sideboard */}
					<TextAreaGroup
						label="Sideboard:"
						name="sideboard"
						id="sideboard"
						onChange={this.onInputChange}
						value={deck.sideboard}
						rows="10"
					/>

					<button class="control-btn" type="submit">Add Deck</button>
				</form>
			</div>
		);
	}
}

export default DeckAdder;