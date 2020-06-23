import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Label, Col, Card, CardBody, CardHeader, UncontrolledCollapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/inicio">Inicio</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contáctanos</BreadcrumbItem>
                    </Breadcrumb>

                    <div className="col-12">
                        <h3>Contáctanos</h3>
                        <hr />
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Información de localización</h3>
                    </div>

                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Nuestra dirección</h5>

                        <address>
                            Cra. 76b #107a-34,<br />
                            Santander, Medellín, Antioquia<br />
                            <i className="fa fa-mobile fa-lg"></i>: 312 211 09 79<br />
                            <i className="fa fa-envelope fa-lg"></i>: yepesalbeiro800@gmail.com
                        </address>
                    </div>

                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Mapa de nuestra localización</h5>
                    </div>

                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+573122110979"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-success" href="tel:+573122110979"><i className="fa fa-whatsapp"></i> Whatsapp </a>
                            <a role="button" className="btn btn-info" href="mailto:"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12 col-md-6">
                        <h3>Preguntas frecuentes</h3>

                        <Card style={{ marginBottom: '1rem' }}>
                            <CardHeader id="toggler0"><h4>Por que tu madre es tan puta?</h4></CardHeader>
                            <UncontrolledCollapse toggler='#toggler0'>
                                <CardBody>Por que me la cogí anoche.</CardBody>
                            </UncontrolledCollapse>
                        </Card>

                        <Card style={{ marginBottom: '1rem' }}>
                            <CardHeader id="toggler1"><h4>Por que tu madre es tan perra?</h4></CardHeader>
                            <UncontrolledCollapse toggler='#toggler1'>
                                <CardBody>Por que me la cogí anoche.</CardBody>
                            </UncontrolledCollapse>
                        </Card>

                        <Card style={{ marginBottom: '1rem' }}>
                            <CardHeader id="toggler2"><h4>Por que tu madre es tan zorra?</h4></CardHeader>
                            <UncontrolledCollapse toggler='#toggler2'>
                                <CardBody>Por que me la cogí anoche.</CardBody>
                            </UncontrolledCollapse>
                        </Card>

                        <Card style={{ marginBottom: '1rem' }}>
                            <CardHeader id="toggler3"><h4>Por que tu madre es tan ramera?</h4></CardHeader>
                            <UncontrolledCollapse toggler='#toggler3'>
                                <CardBody>Por que me la cogí anoche.</CardBody>
                            </UncontrolledCollapse>
                        </Card>
                    </div>

                    <div className="col-12 col-md-6">
                        <h3>Envíanos tus comentarios</h3>

                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>

                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>

                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                            />

                                            {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>

                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>

                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;