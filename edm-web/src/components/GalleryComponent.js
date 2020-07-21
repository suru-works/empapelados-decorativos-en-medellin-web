import React, { Component, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Product from './ProductComponent';
import AddProduct from './AddProductComponent';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';



import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';

function RenderAdminOptions(props) {
    

        if (localStorage.getItem('admin')) {
        return (
            <FloatingButtonContainer>



                <FloatingButtonLink tooltip="Añadir un producto">
                    <div onClick={props.toggleAddProductModal} style={{ width: 35, height: 35, marginRight: 0, marginLeft: 8, marginTop: 5, marginBottom: 0 }}>
                        <i class="fa fa-plus fa-2x"></i>
                    </div >
                </FloatingButtonLink>
                <FloatingButtonLink tooltip="Editar">
                    <div onClick={props.openEditOptions} style={{ width: 35, height: 35, marginRight: 0, marginLeft: 15, marginTop: 6, marginBottom: 0 }}>
                        <i class="fa fa-pencil fa-1x"></i>
                    </div >
                </FloatingButtonLink>

                <FloatingButton
                    tooltip="Editar galeria"
                    icon="fa fa-pencil-square-o fa-2x"
                    rotate={true}
                    styles={{ backgroundColor: darkColors.lighterRed, color: lightColors.white }} />
            </FloatingButtonContainer>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


class Gallery extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isAddProductModalOpen: false,
            areEditOptionsActived: false
        }
        this.toggleAddProductModal = this.toggleAddProductModal.bind(this);
        this.openEditOptions = this.openEditOptions.bind(this);
    }


    toggleAddProductModal() {
        this.setState({
            isAddProductModalOpen: !this.state.isAddProductModalOpen
        });
    }

    openEditOptions() {
        this.setState({
            areEditOptionsActived: !this.state.areEditOptionsActived
        });
    }

    render() {
        console.log(this.props.products.length);
        if (!(this.props.products.length > 0)) {
            return (
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <h3>Galeria de productos</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row col-12">
                        <p> No se encontraron productos en oferta.</p>

                    </div>
                    <Modal className="modal-lg" isOpen={this.state.isAddProductModalOpen} toggle={this.toggleAddProductModal}>

                        <ModalHeader toggle={this.toggleAddProductModal}>Añadir un producto</ModalHeader>

                        <ModalBody>

                            <AddProduct upload={this.props.upload} postProduct={this.props.postProduct} toggle={this.toggleAddProductModal}></AddProduct>

                        </ModalBody>
                    </Modal>
                    <RenderAdminOptions toggleAddProductModal = {this.toggleAddProductModal} openEditOptions={this.openEditOptions}></RenderAdminOptions>
                </div>
            );
        }
        else {
            const galeria = this.props.products.map((product) => {
                try {

                    return (
                        <Product product={product}
                            areEditOptionsActived={this.state.areEditOptionsActived}
                            deleteProduct={this.props.deleteProduct}
                            productsErrMess={this.props.productsErrMess}
                            reloadData={this.props.reloadData}
                        />
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

                    <RenderAdminOptions toggleAddProductModal = {this.toggleAddProductModal} openEditOptions={this.openEditOptions}></RenderAdminOptions>

                </div>



            )
        }


    }

}


export default Gallery;   