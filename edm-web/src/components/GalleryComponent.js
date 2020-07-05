import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody  } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';

function RenderGallery ({product, toggleLoginModal}) {

    return (

        //si quiere que sea cada carta de un ancho especifico ponerle de estilo a la card   style={{ width: '22rem' }}  , pero no es adaptativo
        //mas que todo lo uso para hacer pruebas de que si salga X cards en tal pantalla

        <Card onClick={toggleLoginModal}>
            <CardBody>
                <CardTitle>{product.name}</CardTitle>

                <CardImg width="100%" src={baseFrontUrl + product.imageUrl} alt={product.name} />

                <CardText>  {product.description}  </CardText>
                <CardText>  Precio: {product.price}  </CardText>
                <CardText>  Unidades: {product.units}  </CardText>
                <CardText>  CÓMPRALO YA ANTES DE QUE HAYA INFLACIÓN  </CardText>
                
            </CardBody>
        </Card>
    );
}

function RenderModal ({isLoginModalOpen, toggleLoginModal, imagen}) {
    
    return (

        <Modal isOpen={isLoginModalOpen} toggle={toggleLoginModal}>
                    <ModalHeader toggle ={toggleLoginModal}>Ingresar</ModalHeader>

                    <ModalBody>

                    <CardImg
                            className="col-3"
                            src={imagen}
                        />
                    
                    </ModalBody>
                    </Modal>
    );
}

class Gallery extends Component{


    constructor(props) {
        
        super(props);
        this.state = {
            isLoginModalOpen: false,
            selectedProduct: "https://minas.medellin.unal.edu.co/images/minas/equipo/directores-departamento/jndVelas.jpg"
        };

        this.toggleLoginModal = this.toggleLoginModal.bind(this);
    }

    toggleLoginModal() {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }


    render(){

        const galeria = this.props.products.map((product) => {
            try {
                return (
                    <div className="col-12 col-lg-3 col-md-4 col-sm-6" id={product._id} key={product._id} >
                        <RenderGallery product={product} toggleLoginModal={this.toggleLoginModal} />
                    </div>
                );
            }
            catch(err) {
                console.log("No hizo el id ese")
            }    
            
            
        });

        return (
            <div className="container">
             
                <div className="row">
                    <div className="col-12">
                        <h3>Galeria que se adapta a tu pantalla</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row col-12">
                    {galeria}

                    
                </div>
                <RenderModal isLoginModalOpen={this.state.isLoginModalOpen} toggleLoginModal={this.toggleLoginModal} imagen={"https://minas.medellin.unal.edu.co/images/minas/equipo/directores-departamento/jndVelas.jpg"}/>

            </div>
    
        )
    }
  
}

export default Gallery;   