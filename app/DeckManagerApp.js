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
import Footer from './components/Footer';

class DeckManagerApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: userStore.getUser()
		};

		this.onUserChange = this.onUserChange.bind(this);
	}

	/** ================ LIFECYCLE =========================== */

	componentWillMount() {
		userStore.on('change', this.onUserChange);
	}

	componentWillUnmount() {
		userStore.removeListener('change', this.onUserChange);
	}

	/** ================ METHODS =========================== */

	/**
	 * ----------------------------------------
	 * Update the state when the user store does
	 * ----------------------------------------
	 */

	onUserChange(e) {
		this.setState({
			user: userStore.getUser()
		}, function() {
			console.log('onUserChange', this.state);
		});
	}

	/** ================ RENDER =========================== */

	render() {
		return (
			<div>
				<Header />

				<RouteTransition
					pathname={this.props.location.pathname}
					atEnter={{ translateY: 500 }}
					atLeave={{ translateY: -100 }}
					atActive={{ translateY: 0 }}
					mapStyles={styles => {
						if (styles.translateY < 0) {
							return { display: 'none' }
						}
							return { transform: `translateY(${styles.translateY}%)`  }
						}
					}
				>
					<div class="app-interior">
						{ React.cloneElement(this.props.children, {
							appState: this.state
						}) }
					</div>
				</RouteTransition>

				{/*<Footer />*/}
			</div>
		);
	}
}

export default DeckManagerApp;