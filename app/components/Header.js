import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Header = () => {
	return (
		<header id="app-header" class="container-1100">
			<div class="row">
				<div class="left-col">
					<div id="logo">
						<Link to="/">
							<img src={require('../../public/img/logo.png')} />
						</Link>
					</div>

					<div id="primary-navigation">
						<ul>
							<li><Link activeClassName="active" to="/dashboard">Your Decks</Link></li>
							<li><Link to="/dashboard/add-deck">Add New Deck</Link></li>
							<li><Link>Deck Builder</Link></li>
						</ul>
					</div>
				</div>

				<div class="right-col">
					<div id="user-control">
						logged in as <strong>username here</strong>
					</div>
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	
}

export default Header;