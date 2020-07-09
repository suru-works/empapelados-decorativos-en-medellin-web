import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Product from './ProductComponent';
import AddProduct from './AddProductComponent';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';



import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';


class Gallery extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isAddProductModalOpen: false
        }
        this.toggleAddProductModal = this.toggleAddProductModal.bind(this);
    }


    toggleAddProductModal() {
        this.setState({
            isAddProductModalOpen: !this.state.isAddProductModalOpen
        });
    }

    render() {

        const galeria = this.props.products.map((product) => {
            try {

                return (
                    <Product product={product} />
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
                        <h3>Galeria de productos</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12">
                    {galeria}
                </div>

                <Modal className="modal-lg" isOpen={this.state.isAddProductModalOpen} toggle={this.toggleAddProductModal}>

                    <ModalHeader toggle={this.toggleAddProductModal}>Añadir un producto</ModalHeader>

                    <ModalBody>

                        <AddProduct upload={this.props.upload} postProduct={this.props.postProduct} toggle={this.toggleAddProductModal}></AddProduct>

                    </ModalBody>
                </Modal>

                <FloatingButtonContainer>

                    <FloatingButtonLink href="#"
                        tooltip="Añadir un producto"
                        icon="fa fa-plus"
                        onClick={() => this.toggleAddProductModal()}
                    />

                    <FloatingButton
                        tooltip="Editar galeria"
                        icon="fa fa-pencil"
                        rotate={true}
                        styles={{ backgroundColor: darkColors.lighterRed, color: lightColors.white }}
                        onClick={() => this.toggleAddProductModal()} />
                </FloatingButtonContainer>

            </div>



        )
    }

}
export default Gallery;   