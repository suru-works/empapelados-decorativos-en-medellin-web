import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';
import { useSelector, useDispatch } from 'react-redux';
import SessionExpiredComponent from './SessionExpiredComponent';
import { Loading } from './LoadingComponent';
import { updateProduct, updateFileReset } from '../redux/ActionCreators';
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

const EditProductComponent = (props) => {
    const [price] = useState(props.product.price);
    const [units] = useState(props.product.units);
    const [featured, setFeatured] = useState(props.product.featured);
    const [name] = useState(props.product.name);
    const [description] = useState(props.product.description);
    const [category, setCategory] = useState(props.product.category);

    const error = useSelector(state => state.product.errMess);
    const result = useSelector(state => state.product.product);
    const loading = useSelector(state => state.product.isLoading);

    const updateFileResult = useSelector(state => state.updateFile.result);
    const updateFileError = useSelector(state => state.updateFile.errMess);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch({ type: 'PRODUCT_RESET' });
        dispatch(updateFileReset());
        props.reloadData();
    }

    const updateFileData = {
        type: '/image',
        id: props.product.imageUrl.split('/').slice(-1)[0],
        initialPreview: props.product.imageUrl
    }

    const doUpdateProduct = (productData) => dispatch(updateProduct(productData));

    const uploadChanges = (values) => {

        const productData = {
            productId: props.product._id,
            name: values.newName,
            price: values.newPrice,
            units: values.newUnits,
            description: values.newDescription,
            category: category,
            featured: featured

        }
        if (productData.featured === 'on') {
            productData.featured = true;
        }
        else {
            productData.featured = false;
        }
        if (updateFileResult) {
            productData.imageUrl = '/public/images/products/' + updateFileResult.data.archivo;
        }
        else {
            productData.imageUrl = props.product.imageUrl;
        }

        doUpdateProduct(productData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            newName: name,
            newPrice: price,
            newUnits: units,
            newDescription: description
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
        }
    });

    if (updateFileError) {
        if (updateFileError.response) {
            if (updateFileError.response.status === 401) {
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

        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Actualizar un producto</ModalHeader>
                <ModalBody>
                    <p>Producto actualizado correctamente.</p>
                </ModalBody>
                <Button className="primary-button" onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }



    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Actualizar un producto</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">

                        <Card className="col-12 col-lg-6  inline-block" style={{ padding: 12 }}  >
                            <Dropzone type={'media/image'} destination={'/products'} updateFileData={updateFileData} />
                        </Card>

                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                            <Card style={{ padding: 11 }}>

                                <CardBody style={{ padding: 8 }}>
                                    <CardTitle> Ingresa los datos del producto </CardTitle>

                                    <Label htmlFor="name">Nombre</Label>
                                    <Input type="text" id="newName" name="newName" value={values.newName}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.newName && errors.newName) ? (<Alert color="danger">{errors.newName}</Alert>) : null}

                                    <Label htmlFor="category">Categoría</Label>
                                    <Input type="select" id="category" name="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                                        <option value="empapelado">Empapelado</option>
                                        <option value="jardin_sintetico">Jardín Sintético</option>
                                        <option value="tela">Tela</option>
                                    </Input>

                                    <Label htmlFor="price">Precio</Label>
                                    <Input type="number" id="newPrice" name="newPrice" value={values.newPrice}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.newPrice && errors.newPrice) ? (<Alert color="danger">{errors.newPrice}</Alert>) : null}

                                    <Label htmlFor="units">Unidades disponibles</Label>
                                    <Input type="number" id="newUnits" name="newUnits" value={values.newUnits}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.newUnits && errors.newUnits) ? (<Alert color="danger">{errors.newUnits}</Alert>) : null}

                                    <Label check>destacar</Label>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" id="featured" name="featured" checked={featured} onChange={event => setFeatured(event.target.value)} />
                                            {' '}
                                        destacar
                                        </Label>
                                    </FormGroup>
                                    <Label htmlFor="description">Descripcion del producto</Label>
                                    <Input type="textarea" id="newDescription" name="newDescription" value={values.newDescription}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.newDescription && errors.newDescription) ? (<Alert color="danger">{errors.newDescription}</Alert>) : null}

                                    <div class="d-flex justify-content-center" >
                                        <Button className="secondary-button" type="submit" value="submit"  >Guardar</Button>
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

EditProductComponent.propTypes = {};

export default EditProductComponent;