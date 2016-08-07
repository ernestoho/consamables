import '../styles/panel.scss'

import React from 'react';

class CurrentOrderPanel extends React.Component {
	render() {
		return (
				<div className="current-order-panel">
					<PanelHeader name="Current Orders"></PanelHeader>
				</div>
		);
	}
}

class PendingOrderPanel extends React.Component {
	render() {
		return (
			<div className="pending-order-panel">
				<PanelHeader name="Pending Orders"></PanelHeader>
			</div>
		)
	}
}

class YourOrderPanel extends React.Component {
	render() {
		return (
			<div className="your-order-panel">
				<PanelHeader name="Your Order"></PanelHeader>
			</div>
		)
	}
}

class RestaurantPanel extends React.Component {
	render() {
		return (
			<div className="restaurant-panel">
				<PanelHeader name="Restaurants Nearby"></PanelHeader>
			</div>
		)
	}
}

class CredentialsPanel extends React.Component {
	render() {
		return (
			<div className="credentials-panel">
				<div className="signed-in">
					<div>Currently signed in as</div>
					<div className="email">sam@students.olin.edu</div>
					<div className="logout">
						<button className="button">Sign out</button>
					</div>
				</div>
			</div>
		)
	}
}

class PanelHeader extends React.Component {
	render() {
		return (
			<div className="panel-header">{this.props.name}</div>
		)
	}
}

export {
	CurrentOrderPanel,
	PendingOrderPanel,
	YourOrderPanel,
	RestaurantPanel,
	CredentialsPanel
};