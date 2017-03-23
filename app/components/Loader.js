import React, { PropTypes } from 'react';

const Loader = () => {
	return (
		<img class="spinning-loader" src={require("../../public/img/spinning-loader-dark.gif")} />
	);
}

Loader.propTypes = {}

export default Loader;