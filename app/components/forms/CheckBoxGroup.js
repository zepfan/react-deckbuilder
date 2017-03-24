import React, { PropTypes } from 'react';

const CheckBoxGroup = ({ id, label, name, onChange, onBlur, value, checked, error }) => {
	return (
		<div id={`${id}-group`} class={['form-group checkbox-group', error ? 'has-error' : ''].join(' ')}>
			<label for={id} class="control-label">{label}</label>
			<input 
				onChange={onChange}
				onBlur={onBlur}
				name={name}
				id={id}
				value={value}
				checked={checked}
				type="checkbox"
				class="control-input"
			/>
			{error ? <div class="error-block">{error}</div> : ''}
		</div>
	);
}

CheckBoxGroup.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	error: PropTypes.string,
	id: PropTypes.string,
 	value: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
}

export default CheckBoxGroup;