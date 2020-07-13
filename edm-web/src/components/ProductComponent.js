import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Button, Modal, ModalHeader, ModalBody, FormFeedback } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';

function RenderOptions (props) {
    if(props.areEditOptionsActived){
        return(
            <div className='mt-3'>
                        <Button>Editar</Button>
                        <Button onClick={() => props.toggleDeleteModal()}>Eliminar</Button>
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
            product: this.props.product,
            isDetailsModalOpen: false,
            isDeleteModalOpen: false,
            isConfirmModalOpen: false,
            isErrorModalOpen: false
        };

        this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
        this.toggleErrorModal = this.toggleErrorModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    toggleDetailsModal() {
        this.setState({
            isDetailsModalOpen: !this.state.isDetailsModalOpen
        });
    }

    toggleDeleteModal() {
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen
        });
    }

    toggleConfirmModal() {
        console.log(this.state.isConfirmModalOpen);
        this.setState({
            isConfirmModalOpen: !this.state.isConfirmModalOpen
        });
        console.log(this.state.isConfirmModalOpen);
    }

    toggleErrorModal() {
        this.setState({
            isErrorModalOpen: !this.state.isErrorModalOpen
        });
    }

    handleDelete(productId) {
        this.props.deleteProduct(productId)
        .then(response => {
            console.log("santo el que lo lea");
            this.toggleDeleteModal();
            this.toggleConfirmModal();
        })
        .catch(error => {
            console.log("puto el que lo lea");
            this.toggleDeleteModal();
            this.toggleErrorModal();
        });
    }


    render() {

        
        return (
            <div className="mt-3 col-12 col-lg-3 col-md-4 col-sm-6" key={this.props.product._id}>
                <Card >
                    <CardBody>
                        <CardTitle>{this.props.product.name}</CardTitle>

                        <CardImg onClick={this.toggleDetailsModal} width="100%" src={baseFrontUrl + this.props.product.imageUrl} alt={this.props.product.name} />
                        <RenderOptions areEditOptionsActived={this.props.areEditOptionsActived} toggleDeleteModal={this.toggleDeleteModal}></RenderOptions>
                    </CardBody>
                </Card>


                <Modal className="modal-lg" isOpen={this.state.isDetailsModalOpen} toggle={this.toggleDetailsModal}>

                    <ModalHeader toggle={this.toggleDetailsModal}>{this.props.product.name}</ModalHeader>

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

                <Modal className="modal-md" isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>

                    <ModalHeader toggle={this.toggleDeleteModal}>{this.props.product.name}</ModalHeader>

                    <ModalBody>

                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col">
                                    <p className="text-center">¿Seguro que desea eliminar el producto?</p>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-3">
                                    <Button onClick={() => this.handleDelete(this.props.product._id)}>Confirmar</Button>
                                </div>
                                <div className="col-3">
                                    <Button>Cancelar</Button>
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                </Modal>

                <Modal className="modal-md" isOpen={this.isConfirmModalOpen} toggle={this.toggleConfirmModal}>

                    <ModalHeader toggle={this.toggleConfirmModal}>Eliminar</ModalHeader>

                    <ModalBody>

                        <p>Matarife</p>

                    </ModalBody>
                </Modal>

                <Modal className="modal-md" isOpen={this.isErrorModalOpen} toggle={this.toggleErrorModal}>

                    <ModalHeader toggle={this.toggleErrorModal}>Eliminar</ModalHeader>

                    <ModalBody>

                        <p>Task failed successfully</p>

                    </ModalBody>
                </Modal>

            </div>
        ) 
    }

}

export default Product;