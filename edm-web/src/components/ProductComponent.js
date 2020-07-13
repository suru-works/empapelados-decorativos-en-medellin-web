import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Button, Modal, ModalHeader, ModalBody, FormFeedback } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';


function RenderOptions (props) {
    if(props.areEditOptionsActived){
        return(
            <div className='mt-3'>
                        <Button>Editar</Button>
                        <Button>Eliminar</Button>
            </div>
        );
    }
    else{
        return(
            <div>

            </div>
        );
    }
}

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

        
        return (
            <div className="mt-3 col-12 col-lg-3 col-md-4 col-sm-6" key={this.props.product._id}>
                <Card >
                    <CardBody>
                        <CardTitle>{this.props.product.name}</CardTitle>

                        <CardImg onClick={this.toggleModal} width="100%" src={baseFrontUrl + this.props.product.imageUrl} alt={this.props.product.name} />
                        <RenderOptions areEditOptionsActived={this.props.areEditOptionsActived}></RenderOptions>
                    </CardBody>
                </Card>


                <Modal className="modal-lg" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>

                    <ModalHeader toggle={this.toggleModal}>{this.props.product.name}</ModalHeader>

                    <ModalBody>

                        <div className="d-flex space-around">

                            <Card className=" mr-2" key={this.props.product._id}>
                                <CardImg top src={baseFrontUrl + this.props.product.imageUrl} alt={this.props.product.name} />
                            </Card>

                            <Card key={this.props.product._id}>

                                <CardBody>
                                    <CardTitle> Detalles del producto </CardTitle>                                    
                                    <CardText>  Precio: {this.props.product.price}  </CardText>
                                    <CardText>  Unidades: {this.props.product.units}  </CardText>
                                    <CardText>  {this.props.product.description}  </CardText>
                                    <CardText>  Comentarios: {this.props.product.comments}  </CardText>
                                    <CardImg width="100%" src="https://media.tenor.com/images/fe3826b59f80f5e6c7cc04eb474fb44d/tenor.gif" alt="chika dance" />
                                </CardBody>
                            </Card>

                        </div>

                    </ModalBody>
                </Modal>


            </div>
        ) 
    }

}

export default Product;   