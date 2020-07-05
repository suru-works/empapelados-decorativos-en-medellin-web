import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';

function RenderGallery(props) {

    return (

        //si quiere que sea cada carta de un ancho especifico ponerle de estilo a la card   style={{ width: '22rem' }}  , pero no es adaptativo
        //mas que todo lo uso para hacer pruebas de que si salga X cards en tal pantalla

        <Card onClick={props.onClick}>
            <CardBody>
                <CardTitle>{props.item.name}</CardTitle>

                <CardImg width="100%" src={baseFrontUrl + props.item.imageUrl} alt={props.item.name} />

                <CardText>  {props.item.description}  </CardText>
                <CardText>  Precio: {props.item.price}  </CardText>
                <CardText>  Unidades: {props.item.units}  </CardText>

            </CardBody>
        </Card>
    );
}

class Gallery extends Component {


    constructor(props) {

        super(props);
        this.state = {
            isModalOpen: false,
            selectedProduct: this.props.products[0]
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.showProduct = this.showProduct.bind(this);
    }

    showProduct(product) {
        this.setState({
            selectedProduct: product
        });
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    render() {

        const galeria = this.props.products.map((product) => {
            try {
                return (
                    <div className="col-12 col-lg-3 col-md-4 col-sm-6" key={product._id}>
                        <Card onClick={(product) => this.showProduct(product)}>
                            <CardBody>
                                <CardTitle>{product.name}</CardTitle>

                                <CardImg width="100%" src={baseFrontUrl + product.imageUrl} alt={product.name} />

                                <CardText>  {product.description}  </CardText>
                                <CardText>  Precio: {product.price}  </CardText>
                                <CardText>  Unidades: {product.units}  </CardText>

                            </CardBody>
                        </Card>
                    </div>
                );
            }
            catch (err) {
                console.log(err);
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
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Ingresar</ModalHeader>

                    <ModalBody>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xm-12 m-1">

                                <Card key={this.state.selectedProduct._id}>
                                    <CardImg top src={baseFrontUrl + this.state.selectedProduct.imageUrl} alt={this.state.selectedProduct.name} />

                                    <CardBody>
                                        <CardTitle>{this.state.selectedProduct.name}</CardTitle>
                                        <CardText>{this.state.selectedProduct.description}</CardText>
                                    </CardBody>
                                </Card>

                            </div>

                        </div>


                    </ModalBody>
                </Modal>

            </div>

        )
    }

}

export default Gallery;   