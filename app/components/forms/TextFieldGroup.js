import React, { PropTypes } from 'react';

const TextFieldGroup = ({ id, label, onChange, onBlur, checked, type, name, error }) => {
	return (
		<div class={['form-group text-field-group', error ? 'has-error' : ''].join(' ')}>
			<label for={id} class="control-label">{label}</label>
			<input 
				onChange={onChange}
				onBlur={onBlur}
				checked={checked}
				value={checked}
				type={type}
				name={name}
				id={id}
				class="control-input"
			/>
			{error ? <div class="error-block">{error}</div> : ''}
		</div>
	);
}

TextFieldGroup.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	error: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
}

TextFieldGroup.defaultProps = {
	type: 'text'
}

export default TextFieldGroup;