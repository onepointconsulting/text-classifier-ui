import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Rating from "react-rating";
import {createURLWithParams} from "./functions/fetchSupport";
import {AboutDialogue} from "./AboutComponent";
import {textSamples} from "./textSamples";

class SentimentComponent extends React.Component {

    initialText = textSamples[0];

    sampleTexts = [...textSamples];

    lowProbColor = '#ff2e00';

    mediumProbColor = '#ffbf00';

    highProbColor = '#85cc00';

    constructor(props) {
        super(props);
        this.state = {
            predictText: this.initialText,
            predictedStars: 0,
            errMessage: null,
            predictedProbabilities: [],
            displayAbout: false,
        };
    }

    loopProbabilities = (renderFunc) => {
        return (
            this.state.predictedProbabilities.map(renderFunc)
        )
    };

    renderProbabilities() {
        return (
            <div className="row">
                <div className="col-1" style={{maxWidth: "12px"}}>
                    {this.loopProbabilities((prob, i) => {
                        return (
                            <div key={`${i}`}>{i + 1}</div>
                        );
                    })}
                </div>
                <div className="col-11">
                    {this.state.predictedProbabilities.map((prob, i) => {
                        const percentage = prob * 100.0;
                        return (
                            <div key={i}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#dadada',
                                    borderRadius: '2px'
                                }}
                            >
                                <div key={`${i}percent`} style={{
                                    width: `${percentage}%`,
                                    whiteSpace: 'nowrap',
                                    backgroundColor: prob > .66 ? this.highProbColor
                                        : prob > .33 ? this.mediumProbColor
                                            : this.lowProbColor
                                }}
                                     dangerouslySetInnerHTML={{
                                         __html: `${percentage.toFixed(2)} %`
                                     }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    renderProbsLegend = (hasPredictedProbabilities) => {
        if (hasPredictedProbabilities) {
            return (
                <div className="row probabilities">
                    <div style={{width: '20px', backgroundColor: this.lowProbColor}}/>
                    &nbsp;Low&nbsp;
                    <div style={{width: '20px', backgroundColor: this.mediumProbColor}}/>
                    &nbsp;Medium&nbsp;
                    <div style={{width: '20px', backgroundColor: this.highProbColor}}/>
                    &nbsp;High&nbsp;
                </div>
            );
        }
    };

    ellipsis = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

   

    render() {
        const hasPredictedProbabilities = this.state.predictedProbabilities.length > 0;
        return (
            <div className="container">
                <div className="row">
                    <h3>Sentiment Analysis Demonstrator</h3>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-right">
                        <Button className="btn btn-info"
                                style={{borderRadius: "50%", paddingLeft: "15px", paddingRight: "15px"}}
                                onClick={() => this.setState({displayAbout: true})}>
                            ?
                        </Button>
                    </div>
                </div>
                <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                    <Form.Group controlId="examples">
                        <Form.Label>Select example review</Form.Label>
                        <Form.Control as="select" onChange={(e) => this.setState({predictText: e.target.value})}>
                            {this.sampleTexts.map((text, i) =>
                                <option key={i} value={text}>{this.ellipsis(text, 150)}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Or enter your text</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.predictText}
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <div className="row">
                        <div className="col-sm-2">
                            <Button variant="primary" type="submit">
                                Predict
                            </Button>
                        </div>
                        
                    </div>
                </Form>
                {hasPredictedProbabilities ?
                    <div className="row">
                        <div className="col-12">
                            <br/>
                            <Rating initialRating={this.state.predictedStars}
                                    emptySymbol={<img src="assets/images/star-empty.png" className="icon"
                                                      alt="Empty star"/>}
                                    fullSymbol={<img src="assets/images/star-full.png" className="icon"
                                                     alt="Full star"/>}/>
                        </div>
                    </div>
                    : <></>
                }
                {hasPredictedProbabilities ?
                    <div className="row probabilities">
                        <h5>Probabilities</h5>
                    </div>
                    : <></>
                }
                {this.renderProbabilities()}
                {this.renderProbsLegend(hasPredictedProbabilities)}                
                {this.renderErrorMessage()}
                {this.renderAboutDialogue()}
            </div>
        );
    }

    handleSubmit = (e) => {
        const url = createURLWithParams('predict', {sentence: this.state.predictText});
        fetch(url)
            .then((result) => result.json())
            .then((json) => {
                console.log('json', json);
                const probabilitiesStr = json.prediction.replace(/.*?(\[.+?]).+/, "$1");
                const predictedProbabilities = JSON.parse(probabilitiesStr);
                console.log('predictedProbabilities', predictedProbabilities);
                this.setState({
                    predictedStars: json.pred_class,
                    predictedProbabilities: predictedProbabilities,
                });
            })
            .catch((e) => {
                this.setState({
                    errMessage: `Request failed: ${e.toString()}`
                })
            });
        e.preventDefault();
    };

    handleChange = (e) => {
        this.setState({
            predictText: e.target.value
        });
    };

  

    renderErrorMessage = () => {
        return (
            <div className="row">
                <div className="col-12">
                    {this.state.errMessage}
                </div>
            </div>
        );
    };

    renderAboutDialogue = () => {
        return (
            <AboutDialogue displayAbout={this.state.displayAbout}
                           closeAboutdialogue={() => this.setState({displayAbout: false})}
                           onHide={this.closeAboutdialogue}/>
        );
    };

    
    closeAboutdialogue = () => {
        this.setState({displayAbout: false});
        console.log('test');
    }
}

export default SentimentComponent;