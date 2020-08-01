import React, { Component, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
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
                        <i className="fa fa-plus fa-2x"></i>
                    </div >
                </FloatingButtonLink>
                <FloatingButtonLink tooltip="Editar">
                    <div onClick={props.openEditOptions} style={{ width: 35, height: 35, marginRight: 0, marginLeft: 15, marginTop: 6, marginBottom: 0 }}>
                        <i className="fa fa-pencil fa-1x"></i>
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
        if (!(this.props.products.length > 0)) {
            return (
                <div className="container">

                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/inicio">Inicio</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Galería</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Galería de productos</h3>
                            <hr />
                        </div>
                    </div>

                    <div className="row col-12">
                        <p> No se encontraron productos en oferta. </p>

                    </div>

                    <AddProduct isOpen={this.state.isAddProductModalOpen} toggle={this.toggleAddProductModal} reloadData={this.props.reloadData}></AddProduct>

                    <RenderAdminOptions toggleAddProductModal={this.toggleAddProductModal} openEditOptions={this.openEditOptions}></RenderAdminOptions>
                </div>
            );
        }
        else {
            const galeria = this.props.products.map((product) => {
                try {

                    return (
                        <Product product={product} key={product._id}
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

                <div className="container justify-content-center">

                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/inicio">Inicio</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Galería</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Galería de productos</h3>
                            <hr />
                        </div>
                    </div>

                    <div className="row">

                       
                                {galeria}
                        


                        
                    </div>

                    

                    <AddProduct isOpen={this.state.isAddProductModalOpen} toggle={this.toggleAddProductModal} reloadData={this.props.reloadData}></AddProduct>

                    <RenderAdminOptions toggleAddProductModal={this.toggleAddProductModal} openEditOptions={this.openEditOptions}></RenderAdminOptions>

                </div>



            )
        }


    }

}


export default Gallery;   