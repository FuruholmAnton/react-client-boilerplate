import React from 'react';
import Transition from 'react-transition-group/Transition';
import {bind, entries, css} from 'Utils'

import routes from 'Routes';
const arrRoutes = Object.entries(routes);

const transitionStyles = {
	initial: { transform: 'none' },
};

/* Default styles before animating pages */
const defaultStyles = {
	position: 'fixed',
	minHeight: '100vh',
}

/* Default style in timelines */
const defaultTimeline = {
	ease: Power4.easeInOut
}

const timelineSpeed = .8;

/* Create new event for timeline */
const timelineFinishedEvent = new Event('timelineFinished');


const routePathMatchesPathname = (path, pathname) => {
	if (path == pathname) {
		return true
	} else if (path.includes(':')) {
		// Check the string before the wildcard
		let index = path.indexOf(':');
		let startPath = path.slice(0, index - 1);

		return pathname.startsWith(startPath);
	} else {
		return false;
	}
}

/**
 * Find the right route
 *
 * @param {String} path - ex. '/shop'
 * @param {string} [func='find'] = 'find' | 'findIndex'
 * @returns
 */
const findRoute = (path, func = 'find') => {
	const arr = arrRoutes[func](([key, route]) => {
		if (!('path' in route)) return false
		return routePathMatchesPathname(route.path, path);
	});

	return arr ? arr : [];
}

// REVIEW: Save history of routes?
let [lastKey, lastRoute] = findRoute(window.location.pathname);
let lastIndex = findRoute(window.location.pathname, 'findIndex');
let lastExitIndex = lastIndex;
let lastExitRoute = Object.assign({}, lastRoute);
let enterPathnames = [];
let exitPathnames = [];


export default class PageTransition extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			initial: true,
		};

		bind(this, 'removeNode', 'onEnter', 'onExit');
	}

	onEnter(node, isAppearing) {
		const tl = new TimelineMax();

		const [key,route] = findRoute(node.dataset.path);
		const routeIndex = findRoute(node.dataset.path, 'findIndex');

		const { history } = this.props.appData();

		// From right
		let xPosition = '100%';

		if ( route && 'direction' in route && 'from' in route.direction ) {
			xPosition = route.direction.from === 'left' ?  "-100%" : "100%"
		}

		css(node, defaultStyles);

		if (typeof route == 'object') {
			const { depth } = route;

			if (lastRoute && depth == lastRoute.depth) {
				if (routeIndex > lastIndex) {

				} else if (routeIndex == lastIndex) {
					// if user is going back in history
					if ( history.length > 1 && routePathMatchesPathname(node.dataset.path, history[history.length - 2].pathname) ) {
						xPosition = '-100%';
						if ( route && 'direction' in route && 'from' in route.direction ) {
							xPosition = route.direction.from === 'left' ?  "100%" : "-100%"
						}
					}
				} else {
					// From left
					xPosition = '-100%';
					if ( route && 'direction' in route && 'from' in route.direction ) {
						xPosition = route.direction.from === 'right' ?  "100%" : "-100%"
					}
				}
			} else {
				if (lastRoute && depth > lastRoute.depth) {
					node.style.zIndex = '3';
				} else {
					node.style.zIndex = '2';
					xPosition = '0%';
				}
			}
		}

		tl.from(node, timelineSpeed, {x: xPosition, ...defaultTimeline});

		tl.call(() => {
			node.dispatchEvent(timelineFinishedEvent);
		})
		.set(node, {clearProps: 'all'})


		lastIndex = routeIndex;
		lastRoute = route;
		enterPathnames.push(node.dataset.path);
	}

	onExit(node, isAppearing) {
		const tl = new TimelineMax();

		// Finding the route object and index
		const [key, route] = findRoute(window.location.pathname);
		const routeIndex = findRoute(window.location.pathname, 'findIndex');

		const { history } = this.props.appData();

		let [ exitingRouteKey, exitingRoute ] = findRoute( history[history.length - 1].pathname );

		if ( exitingRoute && exitingRoute.path !== this.props.path && history.length >= 2 ) {
			[ exitingRouteKey, exitingRoute ] = findRoute( history[history.length - 2].pathname );
		}

		// Default is translating to left
		let xPosition = '-100%';
		if ( exitingRoute && 'direction' in exitingRoute && 'to' in exitingRoute.direction ) {
			xPosition = exitingRoute.direction.to === 'left' ?  "-100%" : "100%"
		}

		// Set transition styles
		css(node, defaultStyles);

		if (typeof route == 'object') {
			// Depth is the hierarchy of the paths
			const { depth } = route;

			if (depth == lastExitRoute.depth) {
				// Same depth
				if (routeIndex < lastExitIndex) {
					// Go to the right
					xPosition = '100%';
					if ( exitingRoute && 'direction' in exitingRoute && 'to' in exitingRoute.direction ) {
						xPosition = exitingRoute.direction.to === 'left' ?  "-100%" : "100%"
					}
				} else if (routeIndex == lastExitIndex) {
					if ( history.length > 1 && routePathMatchesPathname(window.location.pathname, history[history.length - 2].pathname) ) {
						xPosition = '100%';
						if ( exitingRoute && 'direction' in exitingRoute && 'to' in exitingRoute.direction ) {
							xPosition = exitingRoute.direction.to === 'left' ?  "-100%" : "100%"
						}
					}
				}


			} else {
				// Different depths
				if (depth < lastExitRoute.depth) {
					// Go to the right
					node.style.zIndex = '3';
					xPosition = '100%';
					if ( exitingRoute && 'direction' in exitingRoute && 'to' in exitingRoute.direction ) {
							xPosition = exitingRoute.direction.to === 'left' ?  "-100%" : "100%"
						}
				} else {
					// Stay in the same position
					xPosition = '0%';
				}
			}
		}
		tl.to(node, timelineSpeed, {x: xPosition, ...defaultTimeline});

		tl.call(() => {
			node.dispatchEvent(timelineFinishedEvent);

			// Fire an event created by TransitionGroup
			this.props.onExited();
		})

		// Save it to use for checking on next page change
		lastExitIndex = routeIndex;
		lastExitRoute = route;
		exitPathnames.push(window.location.pathname);
	}

	removeNode() {
		this.props.onExited();
	}

	/**
	 * Transition event from react-transition-group
	 *
	 * @param {Element} node
	 * @param {Function} done
	 * @memberof PageTransition
	 */
	onEndListener(node, done) {
		node.addEventListener('timelineFinished', done, false);
	}

	render() {
		const inProp = this.props.in;

		return (
			<Transition
				key={this.props.key}
				in={inProp}
				onEnter={this.onEnter}
				onExit={this.onExit.bind(this)}
				addEndListener={this.onEndListener}
			>
				{(state) => {

					return (
						<div data-path={this.props.path}
							className={`page-transition-region transition-${state || 'normal'}`}
							style={{
								...transitionStyles[this.state.initial ? 'initial' : state]
							}}
						>
							{this.props.children}
						</div>
					)
				}}

			</Transition>
		)
	}
}
/*

timeout={{ enter: 1000, exit: 1000 }}
				onEnter={this.onEnter}
				onExit={this.onExit}
				onExiting={this.onExiting}
				onExited={this.onExited}
*/
