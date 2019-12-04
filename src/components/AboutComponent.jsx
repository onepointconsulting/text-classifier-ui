import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const AboutDialogue = ({displayAbout, onHide, closeAboutdialogue}) => {
    return (
        <Modal show={displayAbout} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>About Sentiment Analysis</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                    The model used here in this simple demonstrator is based on a <b>deep neural network supported
                    by a
                    pre-trained language model</b>. This demonstrator can predict the text sentiment using 5 stars
                    and you can
                    also use the supporting language model to generate English text at random.
                </p>
                <p>
                    It differs from the "classic" examples of sentiment analysis models, because it does not use a
                    binary classification, but instead it uses 5 stars.
                </p>
                <p>
                    In order to train this model we have used the <a href="https://www.fast.ai/"
                                                                     target="_blank">fast.ai</a> library and a data
                    set provided by <a href="https://www.yelp.co.uk/london">Yelp</a>.
                    The data set can be downloaded from here:
                    &nbsp;<a href="https://s3.amazonaws.com/fast-ai-nlp/yelp_review_full_csv.tgz"
                             target="_blank">https://s3.amazonaws.com/fast-ai-nlp/yelp_review_full_csv.tgz</a>.
                    It contains 1,569,264 samples from the Yelp Dataset Challenge 2015.
                    This full dataset has 130,000 training samples and 10,000 testing samples in each star.
                </p>
                <p>
                    The algorithm used for training the sentiment analysis model is called
                    "<a href="https://arxiv.org/abs/1801.06146" target="_blank">ULMFiT</a>" and was developed by
                    &nbsp;<a href="https://en.wikipedia.org/wiki/Jeremy_Howard_(entrepreneur)">Jeremy Howard</a> and
                    Sebastian Ruder.
                </p>
                <p>
                    This is how the model was trained using the <a href="https://arxiv.org/abs/1801.06146"
                                                                   target="_blank">ULMFiT</a>
                    &nbsp;algorithm:
                    <ol>
                        <li>Download a pre-trained language model trained on a large corpus
                            such as Wikipedia (a "language model" is any model that learns to predict the next word
                            of a sentence)
                        </li>
                        <li>Fine-tune this language model using your target corpus (in this case, <a
                            href="https://www.yelp.co.uk/london">Yelp</a> reviews)
                        </li>
                        <li>Extract the encoder from this fine tuned language model, and pair it with a classifier.
                            Then fine-tune this model for the final classification task (in this case, sentiment
                            analysis).
                        </li>
                    </ol>
                </p>
                <figure className="figure">
                    <img src="assets/images/ULMFiT_diagramme.png" alt="ULMFiT diagramme" className="img-fluid"/>
                    <figcaption className="figure-caption text-right">From lesson4 of
                        &nbsp;<a href="http://course.fast.ai/" target="_blank">Practical Deep Learning for
                            Coders</a>
                        &nbsp;<a href="https://www.fast.ai/">fast.ai</a> course
                    </figcaption>
                </figure>
                <p>
                    This small demo was written using <a href="https://reactjs.org/" target="_blank">React</a> for the user interface and
                    &nbsp;<a href="https://www.fullstackpython.com/flask.html" target="_blank">Flask</a> for implementing the REST API
                    which interfaces with the language and classifier modelss.
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeAboutdialogue}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};