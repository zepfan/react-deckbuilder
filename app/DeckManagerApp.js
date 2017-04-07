// react jazz
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { RouteTransition } from 'react-router-transition';

// firebase
import { auth } from './util/firebaseClient';

// stores
import userStore from './stores/userStore';

// components
import Header from './components/Header';

class DeckManagerApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: userStore.getUser()
		};

		this.onUserChange = this.onUserChange.bind(this);
	}

	/** ======================= LIFECYCLE ======================= */

	componentWillMount() {
		userStore.on('change', this.onUserChange);
	}

	componentWillUnmount() {
		userStore.removeListener('change', this.onUserChange);
	}

	/** ======================= METHODS ======================= */

	/**
	 * ----------------------------------------
	 * Update the state when the user store does
	 * ----------------------------------------
	 */

	onUserChange(e) {
		this.setState({
			user: userStore.getUser()
		});
	}

	/** ======================= RENDER ======================= */

	render() {
		const { user } = this.state;

		return (
			<div>
				<Header 
					isLoggedIn={user.isLoggedIn}
					userId={user.userId}
					userName={user.userName}
				/>

				<RouteTransition
					pathname={this.props.location.pathname}
					atEnter={{ translateY: 500 }}
					atLeave={{ translateY: -100 }}
					atActive={{ translateY: 0 }}
					mapStyles={styles => {
						if (styles.translateY < 0) {
							return { display: 'none' }
						}
							return { transform: `translateY(${styles.translateY}%)` }
						}
					}
				>
					<div class="app-interior">
						{ React.cloneElement(this.props.children, {
							appState: this.state
						}) }
					</div>
				</RouteTransition>
			</div>
		);
	}
}

export default DeckManagerApp;