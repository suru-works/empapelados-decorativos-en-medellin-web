import React, { Component, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Button, Modal, ModalHeader, ModalBody, FormFeedback, Form, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import EditProduct from './EditProductComponent';
import SessionExpiredComponent from './SessionExpiredComponent';
import { baseFrontUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

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
                <Button onClick={() => props.toggleDetailsModal()}>Ver mas</Button>
            </div>
        );
    }
}

function RenderDetailModal(props) {
    if (props.type == 'options') {
        return (
            <Modal className="modal-lg" isOpen={props.isDetailsModalOpen} toggle={props.toggleDetailsModal}>

                <ModalHeader toggle={props.toggleDetailsModal}>{props.product.name}</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">

                        <div className="col-12 col-md-6 mb-2 mb-md-0 inline-block">
                            <img className='detail-size' src={baseFrontUrl + props.product.imageUrl} alt={props.product.name} />
                        </div>

                        <Card className="col ml-3 ml-md-0 mr-3">

                            <CardBody>
                                <CardTitle> Detalles del producto </CardTitle>
                                <div className="info-size scroll">
                                    <CardText>  Precio: {props.product.price}  </CardText>
                                    <CardText>  Unidades: {props.product.units}  </CardText>
                                    <CardText>  {props.product.description}  </CardText>
                                </div>
                                <CardText>  Comentarios: {props.product.comments}  </CardText>
                                <div className="comment-size scroll mb-3">
                                    
                                    <CardImg width="100%" src="https://media.tenor.com/images/fe3826b59f80f5e6c7cc04eb474fb44d/tenor.gif" alt="chika dance" />
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                    <CardText>Speedwagon best waifu</CardText>
                                </div>

                                <Form>
                                    <Input className="mb-1" type="text" required></Input>
                                    <div className="d-flex justify-content-end">
                                        <Button type="submit" color="primary">Comentar</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>

                    </div>

                </ModalBody>
            </Modal>
        );
    }
}

function RenderDeleteModal(props) {
    const dispatch = useDispatch();
    
    const error = useSelector(state => state.product.errMess);

    const resetTypeAndToggle = () => {
        dispatch({ type: 'PRODUCT_RESET' });
        props.toggleDeleteModal();
    }

    /* useEffect(() => {
        this.setState({
            productDeleteError: error
        })
    }, [error]) */
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
                                <Button onClick={props.toggleDeleteModal}>Cancelar</Button>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </Modal>

        );
    }
    else if (error == null) {
        return (
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
                                <Button onClick={props.reloadData}>Aceptar</Button>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        if(error.status == 401){
            return(
                <SessionExpiredComponent isOpen={props.isDeleteModalOpen} toggle={resetTypeAndToggle}/>
            );            
        }
        return (
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={resetTypeAndToggle}>

                <ModalHeader toggle={resetTypeAndToggle}>{props.product.name}</ModalHeader>

                <ModalBody>

                    <p>Ha ocurrido un error eliminando el producto.</p>
                    <Button onClick={resetTypeAndToggle}>Aceptar</Button>
                </ModalBody>
            </Modal>
        );
    }
}

function RenderEditModal(props) {
    if (props.type == 'options') {
        return (
            <Modal className="modal-lg" isOpen={props.isEditModalOpen} toggle={props.toggleEditModal}>

                <ModalHeader toggle={props.EditModal}>Editar informacion de producto</ModalHeader>

                <ModalBody>

                    <EditProduct product={props.product} toggleEditModal={props.toggleEditModal}/>

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
            editModalType: 'options',
            productDeleteError: null
        };

        this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateEditModalType = this.updateEditModalType.bind(this);

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
            .then(() => {
                this.setState({
                    deleteModalType: 'error'
                });
            }
            )
    }

    resetDeleteModalState() {
        this.setState({
            deleteModalType: 'options'
        });
    }

    resetDetailModalState() {
        this.setState({
            detailsModalType: 'options'
        });
    }

    resetEditModalState() {
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

                        <CardImg className='display-image-size' onClick={this.toggleDetailsModal} src={baseFrontUrl + this.props.product.imageUrl} alt={this.props.product.name} />
                        <RenderOptions areEditOptionsActived={this.props.areEditOptionsActived} toggleDetailsModal={this.toggleDetailsModal} toggleDeleteModal={this.toggleDeleteModal} toggleEditModal={this.toggleEditModal}></RenderOptions>
                    </CardBody>
                </Card>


                <RenderDetailModal
                    type={this.state.detailsModalType}
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
                    type={this.state.editModalType}
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