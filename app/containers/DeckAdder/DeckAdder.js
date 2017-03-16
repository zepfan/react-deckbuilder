// react jazz
import React, { Component } from 'react';

// components
import TextFieldGroup from '../../components/forms/TextFieldGroup';
import TextAreaGroup from '../../components/forms/TextAreaGroup';
import SelectInputGroup from '../../components/forms/SelectInputGroup';
import CheckBoxGroup from '../../components/forms/CheckBoxGroup';

class DeckAdder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deck: {
				deckName: '',
				format: '',
				inProgress: false,
				description: '',
				mainboard: '',
				sideboard: ''
			}
		};

		this.onInputChange = this.onInputChange.bind(this);
	}

	/**
	 * ----------------------------------------
	 * 
	 * ----------------------------------------
	 */

	onSubmit(e) {
		e.preventDefault();
	}

	onInputChange(e) {
		let deck = { [e.target.name]: e.target.value };

		this.setState({ deck: { ...this.state.deck, ...deck } });
	}

	/** ================ RENDER =========================== */

	render() {
		const formats = ['Standard', 'Modern', 'Commander'];
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
						options={formats}
						placeholder="Select your format"
					/>

					{/* In Progress? */}
					<CheckBoxGroup
						label="Is this deck In Progress?"
						name="inProgress"
						id="inProgress"
						value={deck.inProgress}
						onChange={this.onInputChange}
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