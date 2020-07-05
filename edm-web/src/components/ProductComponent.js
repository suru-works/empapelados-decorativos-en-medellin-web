import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';


class Product extends Component {


    constructor(props) {

        super(props);
        this.state = {
            product: this.props.product
        };

        this.toggleModal = this.toggleModal.bind(this);
 
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    render() {

        {console.log("Imprimeme un producto pls " + this.props.product)}

        return (

            

            <div className="col-12 col-lg-3 col-md-4 col-sm-6" key={this.props.product._id}>


                <Card onClick={this.toggleModal}>
                    <CardBody>
                        <CardTitle>{this.props.product.name}</CardTitle>

                        <CardImg width="100%" src={baseFrontUrl + this.props.product.imageUrl} alt={this.props.product.name} />

                        <CardText>  {this.props.product.description}  </CardText>
                        <CardText>  Precio: {this.props.product.price}  </CardText>
                        <CardText>  Unidades: {this.props.product.units}  </CardText>

                    </CardBody>
                </Card>

                {console.log("imprimo a ver si esto le puedo poner una key " + this.props.product._id)}

            

            
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>

                    <ModalHeader toggle={this.toggleModal}>Ingresar</ModalHeader>

                    <ModalBody>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xm-12 m-1">

                                <Card key={this.props.product._id}>
                                    <CardImg top src={baseFrontUrl + this.props.product.imageUrl} alt={this.props.product.name} />

                                    <CardBody>
                                        <CardTitle>{this.props.product.name}</CardTitle>
                                        <CardText>{this.props.product.description}</CardText>
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

export default Product;   