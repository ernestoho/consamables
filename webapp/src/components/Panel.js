import '../styles/panel.scss'

import React from 'react';

class SidePanel extends React.Component {
	render() {
		return (
			<div className="panel-side">
				<div className="panel-header">{this.props.header}</div>
			</div>
		);
	}
}

class CenterPanel extends React.Component {
	render() {
		return (
			<div className="panel-center">
				<div className="panel-header">{this.props.header}</div>
			</div>
		)
	}
}

export { SidePanel, CenterPanel };