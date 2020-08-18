import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Product from './ProductComponent';
import AddProduct from './AddProductComponent';



import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';

function RenderAdminOptions(props) {

    if (localStorage.getItem('admin') === 'true') {
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


const Gallery = (props) => {

    /*constructor(props) {
        super(props);
        this.state = {
            isAddProductModalOpen: false,
            areEditOptionsActived: false
        }
        this.toggleAddProductModal = this.toggleAddProductModal.bind(this);
        this.openEditOptions = this.openEditOptions.bind(this);
    }*/

    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [areEditOptionsActived, setAreEditOptionsActived] = useState(false);
    const [category, setCategory] = useState('empapelado');

    const toggleAddProductModal = () => {
        /*this.setState({
            isAddProductModalOpen: !this.state.isAddProductModalOpen
        });*/
        if (isAddProductModalOpen) {
            setIsAddProductModalOpen(false);
        } else {
            setIsAddProductModalOpen(true);
        }
    }

    const openEditOptions = () => {
        /*this.setState({
            areEditOptionsActived: !this.state.areEditOptionsActived
        });*/
        if (areEditOptionsActived) {
            setAreEditOptionsActived(false);
        } else {
            setAreEditOptionsActived(true);
        }
    }
    if (!(props.products.length > 0)) {
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

                <AddProduct isOpen={isAddProductModalOpen} toggle={toggleAddProductModal} reloadData={props.reloadData}></AddProduct>

                <RenderAdminOptions toggleAddProductModal={toggleAddProductModal} openEditOptions={openEditOptions}></RenderAdminOptions>
            </div>
        );
    }
    else {
        const galeria = props.products.filter(product => product.category === category).map((product) => {
            try {

                return (
                    <Product product={product} key={product._id}
                        areEditOptionsActived={areEditOptionsActived}
                        deleteProduct={props.deleteProduct}
                        productsErrMess={props.productsErrMess}
                        reloadData={props.reloadData}
                    />
                );
            }
            catch (err) {
                return (
                    <Label>No se encontraron productos</Label>
                );

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

                <div className="row justify-content-center">
                    <Button className={category === "empapelado" ? "primary-button" : "secondary-button"} onClick={() => setCategory("empapelado")}>Papeles de colgadura</Button>
                    <Button className={category === "jardin_sintetico" ? "primary-button" : "secondary-button"}  onClick={() => setCategory("jardin_sintetico")}>Jardines Artificiales</Button>
                    <Button className={category === "tela" ? "primary-button" : "secondary-button"}  onClick={() => setCategory("tela")}>Telas decorativas</Button>
                </div>

                <div className="row">

                    {galeria}

                </div>



                <AddProduct isOpen={isAddProductModalOpen} toggle={toggleAddProductModal} reloadData={props.reloadData}></AddProduct>

                <RenderAdminOptions toggleAddProductModal={toggleAddProductModal} openEditOptions={openEditOptions}></RenderAdminOptions>

            </div>



        )
    }

}


export default Gallery;   