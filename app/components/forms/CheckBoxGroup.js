import React, { PropTypes } from 'react';

const CheckBoxGroup = ({ id, label, onChange, onBlur, value, checked, name, error }) => {
	return (
		<div class={['form-group checkbox-group', error ? 'has-error' : ''].join(' ')}>
			<label for={id} class="control-label">{label}</label>
			<input 
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				name={name}
				id={id}
				type="checkbox"
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
	value: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
}

export default CheckBoxGroup;