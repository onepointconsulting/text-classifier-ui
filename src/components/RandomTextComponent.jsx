import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createURLWithParams } from "./functions/fetchSupport";
import { AboutDialogue } from "./AboutComponent";

class RandomTextComponent extends React.Component {

    initialText = 'I really enjoyed the consultation with Dr. XYZ. The clinic was clean and uncluttered and the staff very professional.';

    sampleTexts = [this.initialText,
        'This is a very good product. I would highly recommend it',
        'This product is not fit for purpose. It is a complete disapointment. Save your money and buy something else.',
        'This is not the best product, but at the same time it is also not the worst one. I will do the job, but has not the wow factor.',
        'I bought this book to understand about the "technical" thought process in Ansel\'s mind. But was disappointed to see that all that has been explained is about the stories behind those photographs. But like the print quality of the book and the photographs!',
        'This is truly a fantastic resource for those who want to "step into" the mind of a master photographer. On a different note, it is also an interesting historical perspective from somebody who has lived through the technological changes in photography and several different "movements" in art. Beyond just providing you with basic "EXIF" or exposure information on his shots, Adams has provided insight into, among other things, what lead up to "seeing" the shot, how he considered technical aspects (especially as it related to his Zone System), how he felt about the scene and his surroundings, and what he did in the darkroom in order to bring out the best in the shot. You also get a very good sense of Adams\' philosophy on photography and just life in general.'
    ];


    constructor(props) {
        super(props);
        this.state = {
            predictText: this.initialText,
            errMessage: null,
            generatedText: null,
            displayAbout: false,
            generatingText: false,
            dots: '. . .'
        };
    }

    ellipsis = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };



    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3>Random Text Generator</h3>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-right">
                        <Button className="btn btn-info"
                            style={{ borderRadius: "50%", paddingLeft: "15px", paddingRight: "15px" }}
                            onClick={() => this.setState({ displayAbout: true })}>
                            ?
                        </Button>
                    </div>
                </div>
                <Form model="feedback">
                    <Form.Group controlId="examples">
                        <Form.Label>Select example review</Form.Label>
                        <Form.Control as="select" onChange={(e) => this.setState({ predictText: e.target.value })}>
                            {this.sampleTexts.map((text, i) =>
                                <option key={i} value={text}>{this.ellipsis(text, 150)}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Or enter your text</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.predictText}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <div className="col-sm-10 text-right">
                        <Button className="btn btn-info" onClick={this.generateRandomText}>
                            Generate random text
                            </Button>&nbsp;
                            {this.state.generatedText ?
                            <Button className="btn btn-light" onClick={() => {
                                this.setState({
                                    generatedText: null
                                })
                            }}>
                                Hide random text
                                </Button>
                            : ''
                        }
                    </div>
                </Form>
                
                {this.renderGeneratingText()}
                {this.renderGeneratedText()}
                {this.renderErrorMessage()}
                {this.renderAboutDialogue()}
            </div>
        );
    }

    generateRandomText = (e) => {
        this.generatingTextInterval = setInterval(() => {
            this.setState({
                dots: this.state.dots + " ."
            })
        }, 50);
        const url = createURLWithParams('generate', { text: this.state.predictText });
        this.setState({
            predictedProbabilities: [],
            generatingText: true
        }, () => {
            fetch(url)
                .then((result) => result.json())
                .then((json) => {
                    this.setState({
                        generatedText: json.text
                    });
                })
                .catch((e) => {
                    this.setState({
                        errMessage: `Text generation request failed: ${e.toString()}`
                    })
                })
                .finally(() => {
                    this.setState({
                        generatingText: false,
                        dots: '. . .'
                    }, () => {
                        clearInterval(this.generatingTextInterval);
                        console.log('this.generatingTextInterval cleared', this.generatingTextInterval)
                    });
                });
        });
        e.preventDefault();
    };

    renderGeneratingText = () => {
        if (this.state.generatingText) {
            return (
                <div className="row">
                    <div className="col-12">
                        <p>{this.state.dots}</p>
                    </div>
                </div>
            )
        }
    };

    renderGeneratedText = () => {
        if (this.state.generatedText) {
            return (
                <div className="row">
                    <div className="col-12">
                        <br />
                        <Form.Label>Random text:</Form.Label>
                        <Form.Control as="textarea" rows="5" value={this.state.generatedText}
                            onChange={this.handleChange} />
                    </div>
                </div>
            );
        }
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
                closeAboutdialogue={() => this.setState({ displayAbout: false })}
                onHide={this.closeAboutdialogue} />
        );
    };


    closeAboutdialogue = () => {
        this.setState({ displayAbout: false });
        console.log('test');
    }
}

export default RandomTextComponent;