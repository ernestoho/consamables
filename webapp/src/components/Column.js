import '../styles/column.scss'

import React from 'react';
import Title from './Title';
import {
	CurrentOrderPanel,
	PendingOrderPanel,
	YourOrderPanel,
	RestaurantPanel,
	CredentialsPanel
} from './Panel'
import Helper from './Helper'

class LeftColumn extends React.Component {
	render() {
		return (
			<div className="column-left">
				<CurrentOrderPanel/>
				<PendingOrderPanel/>
			</div>
		);
	}
}

class CenterColumn extends React.Component {
	render() {
		return (
			<div className="column-center">
				<Title/>
				<YourOrderPanel/>
				<Helper/>
			</div>
		)
	}
}

class RightColumn extends React.Component {
	render() {
		return (
			<div className="column-right">
				<RestaurantPanel/>
				<CredentialsPanel/>
			</div>
		)
	}
}

export { LeftColumn, CenterColumn, RightColumn };