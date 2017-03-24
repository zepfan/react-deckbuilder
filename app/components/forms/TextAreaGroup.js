import React, { PropTypes } from 'react';

const TextAreaGroup = ({ id, className, label, onChange, onBlur, value, name, rows, error, onClick }) => {
	return (
		<div id={`${id}-group`} class={['form-group textarea-group', error ? 'has-error' : ''].join(' ')}>
			<label 
				id={`${id}-tab`}
				for={id}
				onClick={onClick}
				class={"control-label", className}
			>
				{label}
			</label>

			<textarea 
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				name={name}
				id={id}
				rows={rows}
				class={"control-input", className}
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