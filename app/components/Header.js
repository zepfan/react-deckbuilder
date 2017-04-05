// react jazz
import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

// firebase
import * as viewActions from '../actions/viewActions';

const Header = ({ isLoggedIn, userId, userName }) => {

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
							<li><IndexLink activeClassName="active" to="/dashboard">Your Decks</IndexLink></li>
							<li><Link activeClassName="active" to="/dashboard/add-deck">Add New Deck</Link></li>
						</ul>
					</div>
				</div>

				{isLoggedIn &&
					<div class="right-col">
						<div id="user-control">
							logged in as <strong>{userName}</strong>

							<button onClick={viewActions.signUserOut} class="log-out btn">Log Out</button>
						</div>
					</div>
				}
			</div>
		</header>
	);
}

Header.propTypes = {
	isLoggedIn: PropTypes.bool,
	userId: PropTypes.string,
	userName: PropTypes.string
}

export default Header;