// react jazz
import React, { PropTypes } from 'react';

// components
import TextFieldGroup from '../../../components/forms/TextFieldGroup';
import TextAreaGroup from '../../../components/forms/TextAreaGroup';
import SelectInputGroup from '../../../components/forms/SelectInputGroup';
import CheckBoxGroup from '../../../components/forms/CheckBoxGroup';

const SimpleAddDeckForm = (props) => {
		return (
			<div>
				<form onSubmit={props.onSubmit}>
					{/* Deck Name */}
					<TextFieldGroup
						label="Deck Name:"
						name="deckName"
						id="deckName"
						value={props.deck.deckName}
						onChange={props.onChange}
					/>

					{/* Format */}
					<SelectInputGroup
						label="Format:"
						name="format"
						id="format"
						value={props.deck.format}
						onChange={props.onChange}
						options={props.formats}
						placeholder="Select your format"
					/>

					{/* In Progress? */}
					<CheckBoxGroup
						label="Is this deck In Progress?"
						name="inProgress"
						id="inProgress"
						value="true"
						checked={props.deck.inProgress}
						onChange={props.onChange}
					/>

					{/* Description */}
					<TextAreaGroup
						label="Description:"
						name="description"
						id="description"
						value={props.deck.description}
						rows="4"
					/>

					{/* Main List */}
					<TextAreaGroup
						label="Mainboard:"
						name="mainboard"
						id="mainboard"
						value={props.deck.mainboard}
						rows="15"
					/>

					{/* Sideboard */}
					<TextAreaGroup
						label="Sideboard:"
						name="sideboard"
						id="sideboard"
						value={props.deck.sideboard}
						rows="10"
					/>

					<button class="control-btn" type="submit">Add Deck</button>
				</form>
			</div>
		)
}

export default SimpleAddDeckForm;