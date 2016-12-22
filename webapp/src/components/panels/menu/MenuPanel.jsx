import '../../../styles/panels/menu-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import MenuSection from './MenuSection';
import { getRestaurantName, getMenu } from '../../../selectors';

class MenuPanel extends React.Component {
    render() {
        return (
            <div className="menu-panel">
                <div className="menu-name">{this.props.name}</div>
                {this.props.menu.map(section =>
                    <MenuSection
                        key={section.get('menuSectionId')}
                        name={section.get('name')}
                        items={section.get('items')}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    name: getRestaurantName(state, ownProps.id),
    menu: getMenu(state, ownProps.id)
});

export default connect(
    mapStateToProps
)(MenuPanel)
