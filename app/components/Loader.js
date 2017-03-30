import React, { PropTypes } from 'react';

const Loader = ({ className }) => {
	return (
		<img class={`${className} spinning-loader`} src={require("../../public/img/spinning-loader-dark.gif")} />
	);
}

Loader.propTypes = {}

export default Loader;