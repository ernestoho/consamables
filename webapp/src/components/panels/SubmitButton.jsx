import React from 'react';

export default class SubmitButton extends React.Component {
    render() {
        const {
            text, data,
            submit
        } = this.props;

        return (
            <button className="button" onClick={() => submit(data)}>{text}</button>
        );
    }
}
