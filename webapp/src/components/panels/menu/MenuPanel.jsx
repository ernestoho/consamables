import '../../../styles/panels/menu-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import MenuSection from './MenuSection';
import MenuCloseButton from './MenuCloseButton';
import { getRestaurantName, getMenu } from '../../../selectors';

class MenuPanel extends React.Component {
    render() {
        const { name, menu } = this.props;

        return (
            <div className="menu-panel">
                <div className="menu-header">
                    <MenuCloseButton/>
                    <div className="menu-name">{`${name} Menu`}</div>
                </div>
                <div className="scrollable">
                    {menu.map(section =>
                        <MenuSection
                            key={section.get('menuSectionId')}
                            name={section.get('name')}
                            items={section.get('items')}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    name: getRestaurantName(state, state.centerColumn.menuId),
    menu: getMenu(state, state.centerColumn.menuId)
});

export default connect(
    mapStateToProps
)(MenuPanel)
