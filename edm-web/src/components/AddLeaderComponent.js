import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';
import { useSelector, useDispatch } from 'react-redux';
import SessionExpiredComponent from './SessionExpiredComponent';
import {Loading} from './LoadingComponent';
import { leaderReset, postLeader, uploadFileReset } from '../redux/ActionCreators';
import { useFormik } from "formik";

import * as yup from "yup";

const validationSchema = yup.object(
    {
        newName: yup
            .string()
            .min(4,"El nombre debe ser de mínimo 4 caracteres")
            .max(25,"El nombre debe ser de máximo 25 caracteres")
            .required("Este campo es obligatorio"),
        newDesignation: yup
            .string()
            .min(4,"El cargo debe ser de mínimo 4 caracteres")
            .max(25,"El cargo debe ser de máximo 25 caracteres")
            .required("Este campo es obligatorio"),
        newDescription: yup
            .string()
            .min(10,"La descripción debe ser de mínimo 10 caracteres")
            .max(280,"La descripción debe ser de maximo 280 caracteres")
            .required("Este campo es obligatorio"),
    });

const AddLeaderComponent = (props) => {

    const [name, setName] = useState(null);
    const [designation, setDesignation] = useState(null);
    const [description, setDescription] = useState(null);

    const error = useSelector(state => state.leader.errMess);
    const result = useSelector(state => state.leader.leader);
    const loading = useSelector(state => state.leader.isLoading);

    const fileSuccess = useSelector(state => state.uploadFile.result);

    const readyToPostLeader = () => {
        if(fileSuccess){
            return true;
        }
        else{
            return false;
        }
    }

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(leaderReset());
        dispatch(uploadFileReset());
        props.reloadData();
        props.toggle();
    }

    const doAddLeader = (leaderData) => dispatch(postLeader(leaderData));

    const leaderSubmit = (values) => {

        if (fileSuccess) {
            const leaderData = {

                name: values.newName,
                designation: values.newDesignation,
                description: values.newDescription
            }
            
            leaderData.imageUrl = '/public/images/leaders/' + fileSuccess.data.archivo;

            doAddLeader(leaderData);
        }
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            newName: '',
            newDesignation: '',
            newDescription: ''
        },
        validationSchema,
        onSubmit(values) {
            leaderSubmit(values);
        }
    });

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
                    <ModalHeader toggle={toogleAndReset}>Añadir un lider</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error añadiendo el lider.</p>
                    </ModalBody>
                </Modal>
            );
        }

    }
    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un lider</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    if (result) { {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un lider</ModalHeader>
                <ModalBody>
                    <p>Lider añadido correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }


    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Añadir un lider</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">

                        <Card className="col-12 col-lg-6  inline-block" style={{  padding: 12}}  >
                            <Dropzone type={'media/image'} destination= {'/leaders'}/>
                        </Card>

                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1}}>
                            <Card style={{ padding: 11}}>

                                <CardBody style={{ padding: 8}}>
                                    <CardTitle> Ingresa los datos del lider </CardTitle>

                                    <Label htmlFor="name">Nombre</Label>
                                    <Input type="text"  id="newName"  name="newName"  values={values.newName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    { (touched.newName && errors.newName) ? (<Alert color="danger">{errors.newName}</Alert>) : null}
                                    <Label htmlFor="designation">Cargo</Label>
                                    <Input type="text"  id="newDesignation"  name="newDesignation"  values={values.newDesignation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    { (touched.newDesignation && errors.newDesignation) ? (<Alert color="danger">{errors.newDesignation}</Alert>) : null}
                                    <Label htmlFor="description">Descripción del lider</Label>
                                    <Input type="textarea"  id="newDescription"  name="newDescription"  values={values.newDescription}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    { (touched.newDescription && errors.newDescription) ? (<Alert color="danger">{errors.newDescription}</Alert>) : null}
                                    <div class="d-flex justify-content-center" >
                                        <Button type="submit" value="submit" className="secondary-button" disabled={!readyToPostLeader()}>Añadir</Button>
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

AddLeaderComponent.propTypes = {};

export default AddLeaderComponent;