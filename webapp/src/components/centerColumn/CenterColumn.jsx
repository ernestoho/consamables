import '../../styles/column.scss'

import React from 'react';
import { connect } from 'react-redux';

import Title from '../Title';

export default class CenterColumn extends React.Component {
    render() {
        return (
            <div className="column-center">
                <Title/>
                {this.props.children}
            </div>
        );
    }
}
