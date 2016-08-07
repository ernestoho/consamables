import '../styles/helper.scss';

import React from 'react';

export default class Helper extends React.Component {
	render() {
		return (
			<div className="helper">
				<div className="left-helper">
					<div className="helper-text">
						<div>Join an existing group</div>
						<div className="left-arrow">▼</div>
						<div className="right-arrow">▼</div>
					</div>
				</div>
				<div className="right-helper">
					<div className="helper-text">
						<div>Explore other options</div>
						<div className="left-arrow">▼</div>
						<div className="right-arrow">▼</div>
					</div>
				</div>
			</div>
		)
	}
}
