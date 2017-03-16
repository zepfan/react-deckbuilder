import React, { PropTypes } from 'react';

const CheckBoxGroup = ({ id, label, name, onChange, onBlur, value, checked, error }) => {
	return (
		<div class={['form-group checkbox-group', error ? 'has-error' : ''].join(' ')}>
			<label for={id} class="control-label">{label}</label>
			<input 
				onChange={onChange}
				onBlur={onBlur}
				name={name}
				id={id}
				type="checkbox"
				value={value}
				checked={checked}
				class="control-input"
			/>
			{error ? <div class="error-block">{error}</div> : ''}
		</div>
	);
}

CheckBoxGroup.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	error: PropTypes.string,
	id: PropTypes.string,
 	// value: PropTypes.something,
 	// checked: PropTypes.something,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
}

export default CheckBoxGroup;