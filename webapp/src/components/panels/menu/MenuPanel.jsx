import '../../../styles/panels/menu-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import MenuSection from './MenuSection';
import CloseButton from '../CloseButton';
import { getRestaurantName, getMenu } from '../../../selectors';

class MenuPanel extends React.Component {
  render() {
    const { name, menu, viewOnly } = this.props;

    return (
      <div className="menu-panel">
        <div className="menu-header">
          <CloseButton/>
          <div className="menu-name">{`${name} Menu`}</div>
        </div>
        <div className="scrollable">
          {menu.map(section =>
            <MenuSection
              viewOnly={viewOnly}
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

const mapStateToProps = (state, ownProps) => ({
  name: getRestaurantName(state, ownProps.id),
  menu: getMenu(state, ownProps.id)
});

export default connect(
  mapStateToProps
)(MenuPanel);
