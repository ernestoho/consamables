import React from 'react';

export default class RestaurantToolbar extends React.Component {
    render() {
        const {
            open,
            onMenuClick, onStartClick, onSuggestClick
        } = this.props;

        if (open) {
            return (
                <div className="toolbar">
                    <button className="button" onClick={onMenuClick}>View Menu</button>
                    <button className="button" onClick={onStartClick}>Start Order</button>
                    <button className="button" onClick={onSuggestClick}>Suggest Order</button>
                </div>
            );
        } else {
            return (
                <div className="toolbar">
                    <button className="button" onClick={onMenuClick}>View Menu</button>
                </div>
            );
        }
    }
}
