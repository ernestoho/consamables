import React from 'react';
import { Link } from 'react-router';

export default class RestaurantToolbar extends React.Component {
    render() {
        const {
            id, loggedIn, open,
            onMenuClick, onStartClick, onSuggestClick
        } = this.props;

        if (loggedIn && open) {
            return (
                <div className="toolbar">
                    <Link to={`/menu/${id}`} className="button" onClick={onMenuClick}>
                        View Menu
                    </Link>
                    <Link to={`/start/${id}`} className="button" onClick={onStartClick}>
                        Start Order
                    </Link>
                    <Link to={`/suggest/${id}`} className="button" onClick={onSuggestClick}>
                        Suggest Order
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="toolbar">
                    <Link to={`/menu/${id}`} className="button" onClick={onMenuClick}>
                        View Menu
                    </Link>
                </div>
            );
        }
    }
}
