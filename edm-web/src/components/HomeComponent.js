import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselIndicators, CarouselControl, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';
import { NavLink, Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';      //Si esta linea no sirve pegue en el cmd:     npm install react-image-gallery
import '../styles.css'; // Tell webpack that HomeComponent.js uses these styles
import { Loading } from './LoadingComponent';
import { useSelector } from 'react-redux';

function RenderRandomLeader({ leader }) {
    if (leader) {
        return (
            <div >
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h1 style={{textAlign: 'center'}}>Nuestros líderes</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <Card >
                            <CardImg src={baseFrontUrl + leader.imageUrl} />
                            <CardTitle className="d-flex justify-content-center mt-3 mb-0 pb-1">{leader.name}</CardTitle>
                            <CardBody className="d-flex justify-content-center mt-0 pt-1 mb-0 pb-1">
                                <CardText>{leader.designation}</CardText>
                            </CardBody>
                            <div className="d-flex justify-content-center">
                                <Link to='/acerca-de-nosotros'>
                                    <Button style={{ width: '17vh', height: 'auto' }} className="primary-button">Aprende más</Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function Home(props) {

    const images = props.products.map((item) => {
        return (
            {
                original: baseFrontUrl + item.imageUrl,
                thumbnail: baseFrontUrl + item.imageUrl
            }

        );
    });

    const leaders = useSelector(state => state.leaders.leaders);
    const leaderIndex = Math.floor(Math.random() * leaders.length);
    const featuredLeader = leaders[leaderIndex];

    if (props.products.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.products.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.products.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }


    else {
        return (
            <div className="container justify-content-center">

                    <div className="col-12 row justify-content-center">
                        <div className="col-lg-6 col-md-12 " style={{ padding: 30}}>
                            <h1 className="text-center">Empapelados Decorativos en Medellin.</h1>
                                <p className="text-center">Venta e instalación de empapelados decorativos, cortinas y pinturas.</p>
                                <h3 className="text-center">Tenemos mas de 30 años de experiencia.</h3>
                                <br></br>
                        </div>
                    </div>

                    <div className="col-12 justify-content-center">
                        <ImageGallery items={images} showBullets={true} autoPlay={true} slideDuration={600} />
                    </div>
                    
                    <div className="col-12 justify-content-center">

                        <Link to='/galeria' >
                              
                            <div className="d-flex justify-content-center">
                                <Button className="primary-button">Ver más</Button>{' '}
                            
                            </div>
                        </Link>
                    </div>

                    <div className="mt-3 col-12 col-lg-6 col-md-12 justify-content-center">

                        <RenderRandomLeader leader={featuredLeader} />
                    </div>

                
                
            </div>
        )

    }



}

export default Home;   