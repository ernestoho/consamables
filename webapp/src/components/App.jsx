import React from 'react';
import { LeftColumn, CenterColumn, RightColumn } from './Column';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <LeftColumn/>
                <CenterColumn/>
                <RightColumn/>
            </div>
        );
    }
}
