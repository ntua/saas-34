import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Navigation from '../../components/Navigation';
import {
    Container,
    Row,
    FormGroup,
    FormLabel,
    FormControl,
    Form,
    Button,
    Alert
} from 'react-bootstrap';
import { Upload } from './components/UploadComponent';
import './AskForm.css';
import { QUESTIONS_API, STATUS_OK } from '../../utils/const';

class AskFormComponent extends React.Component {
    public readonly props: any;
    public readonly state: any = {
        title: '',
        description: '',
        tags: '',
        media: null,
        errorMessage: '',
        successMessage: '',
    };

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateMediaIds = this.updateMediaIds.bind(this);
    }

    public render() {
        const errorDialog = this.state.errorMessage ? (
            <Alert className="mt-5" variant="danger">
                { this.state.errorMessage }
            </Alert>
        ) : null;

        const successDialog = this.state.successMessage ? (
            <Alert className="mt-5" variant="success">
                { this.state.successMessage }
            </Alert>
        ) : null;

        return (
            <form onSubmit={this.handleSubmit}>
                <Container className="mt-5">
                    <h1>Κάντε μία ερώτηση</h1>
                   
                    <div className="mt-5" />
                    <Container>
                        <Row>
                            <FormGroup>
                                <FormLabel>Τίτλος</FormLabel>
                                <FormControl
                                    onChange={this.handleChange.bind(
                                        this,
                                        'title'
                                    )}
                                    type="text"
                                />
                                <small className="text-muted">
                                Να είστε συγκεκριμένοι
                                </small>
                            </FormGroup>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Κύρια Ερώτηση</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    onChange={this.handleChange.bind(
                                        this,
                                        'description'
                                    )}
                                    rows="5"
                                />
                                <small className="text-muted">
                                Κάντε την ερώτηση σας με όσες περισσότερες λεπτομέρειες μπορείτε.
                                </small>
                            </Form.Group>
                        </Row>
                        <Row>
                            <FormGroup>
                                <FormLabel>Tags</FormLabel>
                                <FormControl
                                    onChange={this.handleChange.bind(
                                        this,
                                        'tags'
                                    )}
                                    type="text"
                                />
                                <small className="text-muted">
                                Μπορείτε να προσθέτε μέχρι 100 tags
                                </small>
                            </FormGroup>
                        </Row>
                        <Row>
                            <Upload updateMediaIds={ this.updateMediaIds } />
                        </Row>
                        <Row>
                            <Button
                                variant="primary"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Υποβολή
                            </Button>
                        </Row>
                    </Container>
                    { errorDialog }
                    { successDialog }
                </Container>
            </form>
        );
    }

    private async handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const body = {
            title: this.state.title,
            body: this.state.description,
            tags: this.state.tags.split(','),
            user: this.props.app.user.username,
            ...this.state.media && { media: this.state.media }
        }

        axios.defaults.withCredentials = true;
        try {
            const res = await axios.post(`${QUESTIONS_API}/add`, body, {
                headers: {
                    Cookie: `${this.props.app.token}; httpOnly;`
                }
            });
            if (res.data.status === STATUS_OK) {
                this.setState({
                    successMessage: 'Successfully posted question!'
                });
            } else {
                this.setState({
                    errorMessage: `Oops! Something went wrong. ${res.data.error}`
                });
            }
        } catch (e) {
            this.setState({
                errorMessage: e
            });
        }
    }

    private updateMediaIds(mediaIds: string[]) {
        this.setState({
            media: mediaIds
        });
        console.log(this.state.media);
    }

    private validateForm() {
        return this.state.title.length > 0 && this.state.description.length > 0 && this.state.tags.length > 0;
    }

    private handleChange(field: string, e: any) {
        const value = e.target.value;
        this.setState({
            [field]: value
        });
    }
}

function mapStateToProps(state: any) {
    return {
        app: state.appReducer,
        login: state.loginReducer
    };
}

export default connect(
    mapStateToProps,
    null
)(AskFormComponent);
