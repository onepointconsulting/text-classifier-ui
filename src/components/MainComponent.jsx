import React from 'react';
import SentimentComponent from "./SentimentComponent";
import RandomTextComponent from "./RandomTextComponent";

/**
 * Main component
 */
export default class MainComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                < SentimentComponent />
                <br />
                <br />
                < RandomTextComponent />
            </>

        )
    }
}