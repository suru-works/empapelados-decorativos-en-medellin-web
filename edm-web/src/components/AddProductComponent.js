import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';
import { useSelector, useDispatch } from 'react-redux';
import SessionExpiredComponent from './SessionExpiredComponent';
import { Loading } from './LoadingComponent';
import { productReset, postProduct, uploadFileReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(

    {
        newName: yup
            .string()
            .min(4, "El nombre debe ser de mínimo 4 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres")
            .required("Este campo es obligatorio"),
        newPrice: yup
            .number()
            .max(9999999999999999999999999, "La cifra debe ser de máximo 25 números")
            .required("Este campo es obligatorio"),
        newUnits: yup
            .number()
            .max(9999999999999999999999999, "La cifra debe ser de máximo 25 números")
            .required("Este campo es obligatorio"),
        newDescription: yup
            .string()
            .min(10, "La descripción debe ser de mínimo 10 caracteres")
            .max(280, "La descripción debe ser de maximo 280 caracteres")
            .required("Este campo es obligatorio"),
    });

const AddProductComponent = (props) => {

    const [featured, setFeatured] = useState(null);

    const error = useSelector(state => state.product.errMess);
    const result = useSelector(state => state.product.product);
    const loading = useSelector(state => state.product.isLoading);

    const fileSuccess = useSelector(state => state.uploadFile.result);

    const readyToPostProduct = () => {
        if (fileSuccess) {
            return true;
        }
        else {
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

    const productSubmit = (values) => {

        if (fileSuccess) {
            const productData = {

                name: values.newName,
                price: values.newPrice,
                units: values.newUnits,
                description: values.newDescription,

                featured: featured

            }
            if (productData.featured === 'on') {
                productData.featured = true;
            }
            else {
                productData.featured = false;
            }
            productData.imageUrl = '/public/images/products/' + fileSuccess.data.archivo;

            doAddProduct(productData);
        }
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            newName: '',
            newPrice: '',
            newUnits: '',
            newDescription: ''
        },
        validationSchema,
        onSubmit(values) {
            productSubmit(values);
        }
    });

    if (error) {
        if (error.response) {
            if (error.response.status === 401) {
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
    if (result) {

        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>
                <ModalBody>
                    <p>Producto añadido correctamente.</p>
                </ModalBody>
                <Button className="primary-button" onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }



    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">

                        <Card className="col-12 col-lg-6  inline-block" style={{ padding: 12 }}  >
                            <Dropzone type={'media/image'} destination={'/products'} />
                        </Card>

                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}>
                            <Card style={{ padding: 11 }}>

                                <CardBody style={{ padding: 8 }}>
                                    <CardTitle> Ingresa los datos del producto </CardTitle>

                                    <Label htmlFor="name">Nombre</Label>
                                    <Input type="text" id="newName" name="newName" values={values.newName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {(touched.newName && errors.newName) ? (<Alert color="danger">{errors.newName}</Alert>) : null}

                                    <Label htmlFor="price">Precio</Label>
                                    <Input type="number" id="newPrice" name="newPrice" values={values.newPrice}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.newPrice && errors.newPrice) ? (<Alert color="danger">{errors.newPrice}</Alert>) : null}

                                    <Label htmlFor="units">Unidades disponibles</Label>
                                    <Input type="number" id="newUnits" name="newUnits" values={values.newUnits}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.newUnits && errors.newUnits) ? (<Alert color="danger">{errors.newUnits}</Alert>) : null}

                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" id="featured" name="featured"
                                                onChange={e => setFeatured(e.target.value)} />
                                            {' '}
                                                 Destacar
                                        </Label>
                                    </FormGroup>

                                    <Label htmlFor="description">Descripcion del producto</Label>
                                    <Input type="textarea" id="newDescription" name="newDescription" values={values.newDescription}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.newDescription && errors.newDescription) ? (<Alert color="danger">{errors.newDescription}</Alert>) : null}

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