import React, { PropTypes } from 'react';

const TextAreaGroup = ({ id, label, onChange, onBlur, value, name, rows, error }) => {
	return (
		<div class={['form-group textarea-group', error ? 'has-error' : ''].join(' ')}>
			<label for={id} class="control-label">{label}</label>
			<textarea 
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				name={name}
				id={id}
				rows={rows}
				class="control-input"
			>
			</textarea>
			{error ? <div class="error-block">{error}</div> : ''}
		</div>
	);
}

TextAreaGroup.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	error: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	rows: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
}

export default TextAreaGroup;