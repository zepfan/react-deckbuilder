// react jazz
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { RouteTransition } from 'react-router-transition';

// components
import Header from './components/Header';
import Footer from './components/Footer';

class DeckManagerApp extends Component {
	constructor() {
		super();

		this.state = {};
	}

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