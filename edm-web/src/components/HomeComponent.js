import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import '../styles.css'; // Tell webpack that HomeComponent.js uses these styles
import { Loading } from './LoadingComponent';
import { useSelector } from 'react-redux';
import Map from './MapComponent';


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
                containerElement={<div style={{ height: `400px`, width:`auto`}} />}
                mapElement={<div style={{ height: `100%`, width:`100%` }} />}
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
            <div>
                <div className="row justify-content-center">
                    <div className="col-12 ">
                        <h1 style={{textAlign: 'center'}}>Donde encontrarnos:</h1>
                            <RenderMap></RenderMap>
                    </div>
                </div>
            </div>
        );
    }
}

function Home(props) {

    

    function getFeaturedProducts(product) {
        return product.featured;
    }

    const featuredProducts = props.products.filter(getFeaturedProducts);

    const images = featuredProducts.map((item) => {
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
                            <h1 className="text-center">Servicio garantizado, seriedad y compromiso</h1>
                                <h3 className="text-center">denos el gusto de atenderlo, y cambie la apariencia por ese estilo que siempre soñó.</h3>
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

                    <div className="row">

                        <div className="mt-3 col-12 col-lg-6 col-md-12 justify-content-center">
                            <RenderRandomLeader leader={featuredLeader} />
                        </div>
                        <div className="mt-3 col-12 col-lg-6 col-md-12 justify-content-center">

                        <div style={{ padding: 30, marginTop: 70}}>
                            <h1 className="text-center">"Excelente asesoría y atención al cliente"</h1>
                                <p className="text-center">Ismael Restrepo.  2020.</p>
                                <h3 className="text-center">Habla con nosotros para saber mejor que necesitas</h3>
                                <br></br>

                            <Link to='/contacto' >
                              
                              <div className="d-flex justify-content-center">
                                  <Button className="primary-button">Contáctanos</Button>{' '}
                              
                              </div>
                          </Link>
                            
                        </div>
                                                        
                        </div>
                        
                    </div>

            </div>
        )

    }



}

export default Home;   