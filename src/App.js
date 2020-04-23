import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    IndexRoute
} from "react-router-dom";
import MainComponent from './components/MainComponent';
import SentimentComponent from './components/SentimentComponent';
import RandomTextComponent from './components/RandomTextComponent';



function App() {
    console.log('Initializing app');
    return (
        <Router>
            <Route exact path='/' component={MainComponent} />
            <Route exact path='/index.html' component={MainComponent} />
            <Route path='/sentiment-analysis' component={SentimentComponent} />
            <Route path='/text-generator' component={RandomTextComponent} />
        </Router>
    );
}

export default App;


