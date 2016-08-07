import React from 'react';
import { SidePanel, CenterPanel } from './Panel';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<SidePanel header="Current Orders"></SidePanel>
				<CenterPanel header="Your Order"></CenterPanel>
				<SidePanel header="Restaurants Nearby"></SidePanel>
			</div>
		);
	}
}
