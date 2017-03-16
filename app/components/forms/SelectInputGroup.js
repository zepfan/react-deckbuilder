import React, { PropTypes } from 'react';

const SelectInputGroup = ({ id, label, onChange, onBlur, value, name, error, options, placeholder }) => {
	return (
		<div class={['form-group select-group', error ? 'has-error' : ''].join(' ')}>
			<label for={id} class="control-label">{label}</label>
			<select 
				onChange={onChange}
				onBlur={onBlur}
				name={name}
				id={id}
				class="control-input"
				defaultValue={placeholder ? placeholder : value}
			>
				{placeholder ? <option value={placeholder} disabled>{placeholder}</option> : null}

				{options.map((option, index) => (
					<option key={index} value={option}>{option}</option>
				))}
			</select>
			{error ? <div class="error-block">{error}</div> : ''}
		</div>
	);
}

SelectInputGroup.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
}

export default SelectInputGroup;