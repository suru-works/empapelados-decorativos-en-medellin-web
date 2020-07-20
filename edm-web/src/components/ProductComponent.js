import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Button, Modal, ModalHeader, ModalBody, FormFeedback } from 'reactstrap';
import  EditProduct  from './EditProductComponent';
import { baseFrontUrl } from '../shared/baseUrl';

function RenderOptions(props) {
    if (props.areEditOptionsActived) {
        return (
            <div className='mt-3'>
                <Button onClick={() => props.toggleEditModal()}>Editar</Button>
                <Button onClick={() => props.toggleDeleteModal()}>Eliminar</Button>
            </div>
        );
    }
    else {
        return (
            <div className='mt-3'>
                <Button onClick={() => props.toggleDeleteModal()}>Ver mas</Button>
            </div>
        );
    }
}

function RenderDetailModal(props){
    if(props.type=='options'){
        return(
            <Modal className="modal-lg" isOpen={props.isDetailsModalOpen} toggle={props.toggleDetailsModal}>

                    <ModalHeader toggle={props.toggleDetailsModal}>{props.product.name}</ModalHeader>

                    <ModalBody>

                        <div className="d-flex space-around">

                            <Card className=" mr-2" key={props.product._id}>
                                <CardImg top src={baseFrontUrl + props.product.imageUrl} alt={props.product.name} />
                            </Card>

                            <Card key={props.product._id}>

                                <CardBody>
                                    <CardTitle> Detalles del producto </CardTitle>
                                    <CardText>  Precio: {props.product.price}  </CardText>
                                    <CardText>  Unidades: {props.product.units}  </CardText>
                                    <CardText>  {props.product.description}  </CardText>
                                    <CardText>  Comentarios: {props.product.comments}  </CardText>
                                    <CardImg width="100%" src="https://media.tenor.com/images/fe3826b59f80f5e6c7cc04eb474fb44d/tenor.gif" alt="chika dance" />
                                </CardBody>
                            </Card>

                        </div>

                    </ModalBody>
                </Modal>
        );
    }
}

function RenderDeleteModal(props) {
    if (props.type == 'options') {
        return (
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={props.toggleDeleteModal}>

                <ModalHeader toggle={props.toggleDeleteModal}>{props.product.name}</ModalHeader>

                <ModalBody>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                <p className="text-center">¿Seguro que desea eliminar el producto?</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-3">
                                <Button onClick={() => props.handleDelete(props.product._id)}>Confirmar</Button>
                            </div>
                            <div className="col-3">
                                <Button onClick = {props.toggleDeleteModal}>Cancelar</Button>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </Modal>

        );
    }
    else if(props.type=='success'){
        return(
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={props.toggleDeleteModal}>

                <ModalHeader toggle={props.toggleDeleteModal}>{props.product.name}</ModalHeader>

                <ModalBody>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                <p className="text-center">Se ha eliminado el producto correctamente.</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-3">
                                <Button onClick = {props.reloadData}>Aceptar</Button>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        );
    }
    else if(props.type=='error'){
        return(
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={props.toggleDeleteModal}>

                <ModalHeader toggle={props.toggleDeleteModal}>{props.product.name}</ModalHeader>

                <ModalBody>

                    <p>Ha ocurrido un error eliminando el producto.</p>

                </ModalBody>
            </Modal>
        );
    }
}

function RenderEditModal(props){
    if(props.type=='options'){
        return(
            <Modal className="modal-lg" isOpen={props.isEditModalOpen} toggle={props.toggleEditModal}>

                    <ModalHeader toggle={props.EditModal}>Editar informacion de producto</ModalHeader>

                    <ModalBody>

                        <EditProduct product={props.product}/>

                    </ModalBody>
                </Modal>
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
            isEditModalOpen: false,
            deleteModalType: 'options',
            detailsModalType: 'options',
            editModalType: 'options'
        };

        this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateEditModalType =this.updateEditModalType.bind(this);

    }

    toggleDetailsModal() {
        this.setState({
            isDetailsModalOpen: !this.state.isDetailsModalOpen
        });
        this.resetDetailModalState();
    }

    toggleDeleteModal() {
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen
        });
        this.resetDeleteModalState();    
    }

    toggleEditModal() {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen
        });
        this.resetEditModalState();    
    }


    updateEditModalType(type) {
        this.setState({
            editModalType: type
        });
    }


    handleDelete(productId) {
        
        this.props.deleteProduct(productId)
        .then((result) => {
            console.log(result);
            if(this.props.productsErrMess){
                this.setState({
                    deleteModalType: 'error'
                });
            }
            else {
                this.setState({
                    deleteModalType: 'success'
                });
            }
        })
    }

    resetDeleteModalState(){
        this.setState({
            deleteModalType: 'options'
        });
    }

    resetDetailModalState(){
        this.setState({
            detailsModalType: 'options'
        });
    }
    
    resetEditModalState(){
        this.setState({
            editModalType: 'options'
        });
    }

    render() {


        return (
            <div className="mt-3 col-12 col-lg-3 col-md-4 col-sm-6" key={this.props.product._id}>
                <Card >
                    <CardBody>
                        <CardTitle>{this.props.product.name}</CardTitle>

                        <CardImg onClick={this.toggleDetailsModal} width="100%" src={baseFrontUrl + this.props.product.imageUrl} alt={this.props.product.name} />
                        <RenderOptions areEditOptionsActived={this.props.areEditOptionsActived} toggleDeleteModal={this.toggleDeleteModal} toggleEditModal={this.toggleEditModal}></RenderOptions>
                    </CardBody>
                </Card>


                <RenderDetailModal 
                    type = {this.state.detailsModalType}
                    isDetailsModalOpen={this.state.isDetailsModalOpen}
                    toggleDetailsModal={this.toggleDetailsModal}
                    product={this.props.product}
                />
                <RenderDeleteModal 
                    type={this.state.deleteModalType}
                    isDeleteModalOpen={this.state.isDeleteModalOpen}
                    toggleDeleteModal={this.toggleDeleteModal}
                    handleDelete={this.handleDelete}
                    product={this.props.product}
                    resetDeleteModalState={this.resetDeleteModalState}
                    reloadData={this.props.reloadData}
                />
                <RenderEditModal 
                    type = {this.state.editModalType}
                    isEditModalOpen={this.state.isEditModalOpen}
                    updateEditModalType={this.updateEditModalType}
                    toggleEditModal={this.toggleEditModal}
                    product={this.props.product}
                />
                


            </div>
        )
    }

}

export default Product;