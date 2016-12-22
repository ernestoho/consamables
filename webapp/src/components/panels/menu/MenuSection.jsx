import React from 'react';

import MenuItem from './MenuItem';

export default class MenuSection extends React.Component {
    render() {
        return (
            <div className="menu-section">
                <div className="menu-section-name">{this.props.name}</div>
                {this.props.items.map(item =>
                    <MenuItem key={item.get('name')} {...item.toJS()}/>
                )}
            </div>
        );
    }
}
