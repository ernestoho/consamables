import React from 'react';
import { LeftColumn, CenterColumn, RightColumn } from './Column';
import Modal from './Modal';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <LeftColumn/>
                <CenterColumn/>
                <RightColumn/>
                <Modal/>
            </div>
        );
    }
}
