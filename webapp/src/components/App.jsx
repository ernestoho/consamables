import React from 'react';

import LeftColumn from './LeftColumn';
import CenterColumn from './CenterColumn';
import RightColumn from './RightColumn';
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
