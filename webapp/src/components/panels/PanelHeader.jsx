import React from 'react';

export default class PanelHeader extends React.Component {
  render() {
    return (
      <div className="panel-header">{this.props.name}</div>
    );
  }
}
