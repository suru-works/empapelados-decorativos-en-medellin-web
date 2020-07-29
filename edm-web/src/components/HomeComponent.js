import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselIndicators, CarouselControl, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';
import { NavLink, Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';      //Si esta linea no sirve pegue en el cmd:     npm install react-image-gallery
import '../styles.css'; // Tell webpack that HomeComponent.js uses these styles
import { Loading } from './LoadingComponent';

function Home(props) {

    const images = props.products.map((item) => {
        return(
            {
                original: baseFrontUrl + item.imageUrl,
                thumbnail: baseFrontUrl + item.imageUrl
              }
            
        );
    });

    if (props.products.isLoading) {
        return(
            <Loading />
        );
    }
    else if (props.products.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.products.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }


    else{
        return(
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <ImageGallery items={images} showBullets={true} autoPlay={true} slideDuration={600} />
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    <Link to='/galeria'>
                        <Button color="warning">Ordena ahora!</Button>{' '}
                    </Link>
                        
                </div>
                <div className="row align-items-center">
                    <div className="col-12 col-md-9">
                        
                        <Card>
                            <CardImg
                                className="col-3"
                                src="https://minas.medellin.unal.edu.co/images/minas/equipo/directores-departamento/jndVelas.jpg"
                            />
                            <CardBody className="col">
                                <CardTitle>Jefesito</CardTitle>
                                <CardText>Guzmalsito is here</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )

    }


    
}

export default Home;   