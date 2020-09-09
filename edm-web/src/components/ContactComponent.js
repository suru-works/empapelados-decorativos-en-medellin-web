import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Label, Col, Card, CardBody, CardText, CardHeader, UncontrolledCollapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Map from './MapComponent';

import { useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);



const RenderMap = () => {
    const mapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=`;


    const error = useSelector(state => state.maps.errMess);
    const result = useSelector(state => state.maps.maps);
    const loading = useSelector(state => state.maps.isLoading);

    if (error) {
        return (
            <label>Error cargando el mapa</label>
        );

    }
    else if (loading) {
        return (
            <Loading></Loading>
        );

    }
    else if (result) {
        return (


            <Map zoom={15} center={{ lat: 6.182236, lng: -75.5735974 }}
                withMarker={true}
                googleMapURL={mapUrl + `${result.key}`}
                containerElement={<div style={{ height: `400px`, width: `auto` }} />}
                mapElement={<div style={{ height: `100%`, width: `100%` }} />}
                mapType='roadmap'
                loadingElement={<Loading />}

            />


        );
    }
    else {
        return (
            <div></div>
        );
    }

}

class Contact extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.name = React.createRef();
        this.phoneNumber = React.createRef();
        this.email = React.createRef();
        this.agree = React.createRef();
        this.feedback = React.createRef();
        this.contactType = React.createRef();

    }

    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }

    handleSubmit(values) {
        const feedbackData = {
            feedback: values.feedback,
            name: values.name,
            phoneNumber: values.phoneNumber,
            email: values.email,
            agree: values.agree,
            contactType: values.contactType
        }
        this.props.feedbackSubmitFunction(feedbackData);
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


                    <div className="row col-12 ">

                        <div className="col-12 col-sm-6">
                            <h5>Nuestra dirección</h5>

                            <address>
                                Calle 20 sur # 37 - 228.<br />
                                Sector los yarumos, Poblado, Medellín, Antioquia<br />
                                <i className="fa fa-mobile fa-lg"></i>: 319 582 31 66<br />
                                <i className="fa fa-mobile fa-lg"></i>: 301 207 15 91<br />
                                <i className="fa fa-envelope fa-lg"></i>: yepesalbeiro800@gmail.com
                            </address>
                            <div className="col-12 col-sm-11 offset-sm-1">
                                <div className="btn-group" role="group">
                                    <a role="button" className="btn btn-primary" target="_blank" rel="noopener noreferrer" href="tel:+573122110979"><i className="fa fa-phone"></i> Call</a>
                                    <a role="button" className="btn btn-success" target="_blank" rel="noopener noreferrer" href="https://wa.me/573122110979"><i className="fa fa-whatsapp"></i> Whatsapp </a>
                                    <a role="button" className="btn btn-info" target="_blank" rel="noopener noreferrer" href="mailto:yepesalbeiro800@gmail.com"><i className="fa fa-envelope-o"></i> Email</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 ">

                            <h5>Mapa de nuestra localización</h5>
                            <RenderMap></RenderMap>

                        </div>

                    </div>

                </div>

                <div className="row row-content">
                    <div className="col-12 col-md-6">
                        <h3>Preguntas frecuentes</h3>

                        <Card style={{ marginBottom: '1rem' }}>
                            <CardHeader id="toggler0"><h4>¿Cuales son los métodos de pago?</h4></CardHeader>
                            <UncontrolledCollapse toggler='#toggler0'>
                                <CardBody>
                                    <CardText>El metodo de pago sera pactado directamente con el asesor.</CardText>
                                </CardBody>
                            </UncontrolledCollapse>
                        </Card>

                        <Card style={{ marginBottom: '1rem' }}>
                            <CardHeader id="toggler1"><h4>¿Cómo es el envío?</h4></CardHeader>
                            <UncontrolledCollapse toggler='#toggler1'>
                                <CardBody>
                                    <CardText>Tenemos mensajeros disponibles para actuar en nuesta area de cobertura, pero por lo general el mismo instalador se encargara de llevar el producto.</CardText>
                                </CardBody>
                            </UncontrolledCollapse>
                        </Card>

                        <Card style={{ marginBottom: '1rem' }}>
                            <CardHeader id="toggler2"><h4>¿Como son las instalaciones?</h4></CardHeader>
                            <UncontrolledCollapse toggler='#toggler2'>
                                <CardBody>
                                    <CardText>Enviaremos a un instalador experto cuando compres nuestro producto</CardText>
                                </CardBody>
                            </UncontrolledCollapse>
                        </Card>

                        <Card style={{ marginBottom: '1rem' }}>
                            <CardHeader id="toggler3"><h4>Vivo fuera de la ciudad de Medellín, ¿cuales son las areas de cobertura del servicio?</h4></CardHeader>
                            <UncontrolledCollapse toggler='#toggler3'>
                                <CardBody>
                                    <CardText>Por lo general prestamos nuestro servicio en el departamento de Antioquia, pero se puede pactar para prestar el servicio en lugares mas alejados.</CardText>
                                </CardBody>
                            </UncontrolledCollapse>
                        </Card>
                    </div>

                    <div className="col-12 col-md-6">
                        <h3>Envíanos tus comentarios</h3>

                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Nombre</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Nombre"
                                        className="form-control"
                                        ref={this.name}
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Obligatorio',
                                            minLength: 'Tiene que ser mayor a 3 caracteres',
                                            maxLength: 'Tiene que ser maximo 15 caracteres'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="phoneNumber" md={2}>Contacto Tel.</Label>

                                <Col md={10}>
                                    <Control.text model=".phoneNumber" id="phoneNumber" name="phoneNumber"
                                        placeholder="Telefono"
                                        className="form-control"
                                        ref={this.phoneNumber}
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".phoneNumber"
                                        show="touched"
                                        messages={{
                                            required: 'Obligatorio',
                                            minLength: 'tiene que ser mayor a 2 caracteres',
                                            maxLength: 'Tiene que ser maximo 15 caracteres',
                                            isNumber: 'tiene que ser un numero valido'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>

                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        ref={this.Email}
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
                                            required: 'Obligatorio.',
                                            validEmail: 'Es necesaria una direccion de correo valida.'
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
                                                ref={this.agree}
                                            />

                                            {' '}
                                            <strong>¿Deberiamos contactarte?</strong>
                                        </Label>
                                    </div>
                                </Col>

                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control"
                                        ref={this.contactType}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Tu recomendacion o duda</Label>

                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        ref={this.feedback}
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" className="primary-button">
                                        Enviar
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