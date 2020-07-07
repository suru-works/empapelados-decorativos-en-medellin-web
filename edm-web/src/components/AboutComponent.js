import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

function About() {

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/inicio">Inicio</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Acerca de Nosotros</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Acerca de Nosotros</h3>
                    <hr />
                </div>
            </div>

            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Nuestra Historia</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>

                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Cualidades que nos distinguen</CardHeader>
                        <CardBody>
                            <h6> <i className="fa fa-check-square-o" aria-hidden="true"></i> Asesorias personalizadas. </h6>
                            <br></br>
                            <h6> <i className="fa fa-check-square-o" aria-hidden="true"></i> Más de 30 años de experiencia.</h6>
                            <br></br>
                            <h6> <i className="fa fa-check-square-o" aria-hidden="true"></i> Gran variedad de diseños.</h6>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>
                        {}
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    