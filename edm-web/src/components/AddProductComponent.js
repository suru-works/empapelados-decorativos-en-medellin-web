import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';
import { useSelector, useDispatch } from 'react-redux';
import SessionExpiredComponent from './SessionExpiredComponent';
import {Loading} from './LoadingComponent';
import { productReset, postProduct, uploadFileReset } from '../redux/ActionCreators';

const AddProductComponent = (props) => {

    const [price, setPrice] = useState(null);
    const [units, setUnits] = useState(null);
    const [featured, setFeatured] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    const error = useSelector(state => state.product.errMess);
    const result = useSelector(state => state.product.product);
    const loading = useSelector(state => state.product.isLoading);

    const fileSuccess = useSelector(state => state.uploadFile.result);

    const readyToPostProduct = () => {
        if(fileSuccess){
            return true;
        }
        else{
            return false;
        }
    }

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(productReset());
        dispatch(uploadFileReset());
        props.reloadData();
        props.toggle();
    }

    const doAddProduct = (productData) => dispatch(postProduct(productData));

    const handleSubmit = (event) => {
        event.preventDefault();

        if (fileSuccess) {
            const productData = {
                price: price,
                units: units,
                featured: featured,
                name: name,
                description: description

            }
            if (productData.featured == 'on') {
                productData.featured = true;
            }
            else {
                productData.featured = false;
            }
            productData.imageUrl = '/public/images/products/' + fileSuccess.data.archivo;

            doAddProduct(productData);
        }
    }

    if (error) {
        if (error.response) {
            if (error.response.status == 401) {
                return (
                    <SessionExpiredComponent isOpen={props.isOpen} toggle={toogleAndReset} />
                );
            }
            else {
                return (
                    <div> error desconocido {error.response}</div>
                );
            }
        }

        else {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error añadiendo el producto.</p>
                    </ModalBody>
                </Modal>
            );
        }

    }
    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    if (result) { {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>
                    <ModalBody>
                        <p>Producto añadido correctamente.</p>
                    </ModalBody>
                    <Button onClick={toogleAndReset}>Aceptar</Button>
                </Modal>
            );
        }


    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">

                        <Card className="col-12 col-lg-6  inline-block" style={{  padding: 12}}  >
                            <Dropzone type={'media/image'} destination= {'/products'} />
                        </Card>

                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1}}>
                            <Card style={{ padding: 11}}>

                                <CardBody style={{ padding: 8}}>
                                    <CardTitle> Ingresa los datos del producto </CardTitle>

                                    <Label htmlFor="name">Nombre</Label>
                                    <Input type="text" id="name" name="name"
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                    <Label htmlFor="price">Precio</Label>
                                    <Input type="number" id="price" name="price"
                                        onChange={e => setPrice(e.target.value)} />
                                    <Label htmlFor="units">Unidades disponibles</Label>
                                    <Input type="number" id="units" name="units"
                                        onChange={e => setUnits(e.target.value)} />
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" id="featured" name="featured"
                                                onChange={e => setFeatured(e.target.value)} />
                                                {' '}
                                                 Destacar
                                        </Label>
                                    </FormGroup>
                                    <Label htmlFor="description">Descripcion del producto</Label>
                                    <Input type="textarea" id="description" name="description"
                                        onChange={e => setDescription(e.target.value)} />
                                    
                                    <div class="d-flex justify-content-center" >
                                        <Button type="submit" value="submit" className="secondary-button" disabled={!readyToPostProduct()}>Añadir</Button>
                                    </div>
                                    

                                </CardBody>
                            </Card>
                        </Form>

                    </div>

                </ModalBody>
            </Modal>


        );
    }

};

AddProductComponent.propTypes = {};

export default AddProductComponent;