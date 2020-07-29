import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';
import { useSelector, useDispatch } from 'react-redux';
import SessionExpiredComponent from './SessionExpiredComponent';
import {Loading} from './LoadingComponent';
import { productReset, postProduct, updateProduct, updateFileReset} from '../redux/ActionCreators';


const EditProductComponent = (props) => {
    const [price, setPrice] = useState(props.product.price);
    const [units, setUnits] = useState(props.product.units);
    const [featured, setFeatured] = useState(props.product.featured);
    const [name, setName] = useState(props.product.name);
    const [description, setDescription] = useState(props.product.description);

    const error = useSelector(state => state.product.errMess);
    const result = useSelector(state => state.product.product);
    const loading = useSelector(state => state.product.isLoading);

    const updateFileResult = useSelector(state => state.updateFile.result);
    const updateFileError = useSelector(state => state.updateFile.errMess);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(productReset());
        dispatch(updateFileReset());
        props.reloadData();
        props.toggle();
    }

    const updateFileData = {
        type: '/image',
        id: props.product.imageUrl.split('/').slice(-1)[0],
        initialPreview: props.product.imageUrl
    }

    const doUpdateProduct = (productData) => dispatch(updateProduct(productData));

    const uploadChanges = (event) => {
        event.preventDefault();
        const productData = {
            productId: props.product._id,
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
        if(updateFileResult){
            productData.imageUrl = '/public/images/products/' + updateFileResult.data.archivo;
        }
        else{
            productData.imageUrl = props.product.imageUrl;
        }

        doUpdateProduct(productData);
    }




    if (updateFileError) {
        if (updateFileError.response) {
            if (updateFileError.response.status == 401) {
                return (
                    <SessionExpiredComponent isOpen={props.isOpen} toggle={toogleAndReset} />
                );
            }
            else {
                return (
                    <div> error desconocido {updateFileError.response}</div>
                );
            }
        }

        else {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Actualizar un producto</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error actualizando la imagen del producto.</p>
                    </ModalBody>
                </Modal>
            );
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
                    <ModalHeader toggle={toogleAndReset}>Actualizar un producto</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error actualizando el producto.</p>
                    </ModalBody>
                </Modal>
            );
        }

    }
    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Actualizar un producto</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    if (result) {
        {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Actualizar un producto</ModalHeader>
                    <ModalBody>
                        <p>Producto actualizado correctamente.</p>
                    </ModalBody>
                    <Button onClick={toogleAndReset}>Aceptar</Button>
                </Modal>
            );
        }


    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Actualizar un producto</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around">

                        <Card className=" mr-2" >
                            <Dropzone type={'media/image'} updateFileData={updateFileData} />
                        </Card>
                        <Form onSubmit={uploadChanges} >
                            <Card>

                                <CardBody>
                                    <CardTitle> Ingresa los datos del producto </CardTitle>

                                    <Label htmlFor="name">Nombre</Label>
                                    <Input type="text" id="name" name="name" value={name} onChange={event => setName(event.target.value)} required />
                                    <Label htmlFor="price">Precio</Label>
                                    <Input type="number" id="price" name="price" value={price} onChange={event => setPrice(event.target.value)} />
                                    <Label htmlFor="units">Unidades disponibles</Label>
                                    <Input type="number" id="units" name="units" value={units} onChange={event => setUnits(event.target.value)} />
                                    <Label check>destacar</Label>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" id="featured" name="featured" checked={featured} onChange={event => setFeatured(event.target.value)} />
                                            {' '}
                                    destacar
                                </Label>
                                    </FormGroup>
                                    <Label htmlFor="description">Descripcion del producto</Label>
                                    <Input type="textarea" id="description" name="description" value={description} onChange={event => setDescription(event.target.value)} />

                                </CardBody>
                            </Card>
                            <Button type="submit" value="submit" color="primary" >Guardar</Button>
                        </Form>

                    </div>

                </ModalBody>
            </Modal>


        );
    }
};

EditProductComponent.propTypes = {};

export default EditProductComponent;