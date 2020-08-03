import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';
import { useSelector, useDispatch } from 'react-redux';
import SessionExpiredComponent from './SessionExpiredComponent';
import {Loading} from './LoadingComponent';
import { leaderReset, postLeader, updateLeader, updateFileReset} from '../redux/ActionCreators';
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

const EditLeaderComponent = (props) => {
    
    const [name, setName] = useState(props.leader.name);
    const [description, setDescription] = useState(props.leader.description);
    const [designation, setDesignation] = useState(props.leader.designation);

    const error = useSelector(state => state.leader.errMess);
    const result = useSelector(state => state.leader.leader);
    const loading = useSelector(state => state.leader.isLoading);

    const updateFileResult = useSelector(state => state.updateFile.result);
    const updateFileError = useSelector(state => state.updateFile.errMess);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(leaderReset());
        dispatch(updateFileReset());
        props.reloadData();
        props.toggle();
    }

    const updateFileData = {
        type: '/image',
        id: props.leader.imageUrl.split('/').slice(-1)[0],
        initialPreview: props.leader.imageUrl
    }

    const doUpdateLeader = (leaderData) => dispatch(updateLeader(leaderData));

    const uploadChanges = (event) => {
        event.preventDefault();
        const leaderData = {
            leaderId: props.leader._id,
            
            name: values.newName,
            designation: values.newDesignation,
            description: values.newDescription
        }

        if(updateFileResult){
            leaderData.imageUrl = '/public/images/leaders/' + updateFileResult.data.archivo;
        }
        else{
            leaderData.imageUrl = props.leader.imageUrl;
        }

        doUpdateLeader(leaderData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            newName: name,
            newDesignation: designation,
            newDescription: description

        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
        }
    });

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
                    <ModalHeader toggle={toogleAndReset}>Actualizar un lider</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error actualizando la imagen del lider.</p>
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
                    <ModalHeader toggle={toogleAndReset}>Actualizar un lider</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error actualizando el lider.</p>
                    </ModalBody>
                </Modal>
            );
        }

    }
    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Actualizar un lider</ModalHeader>
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
                    <ModalHeader toggle={toogleAndReset}>Actualizar un lider</ModalHeader>
                    <ModalBody>
                        <p>Lider actualizado correctamente.</p>
                    </ModalBody>
                    <Button onClick={toogleAndReset}>Aceptar</Button>
                </Modal>
            );
        }


    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Actualizar un lider</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">

                        <Card className="col-12 col-lg-6  inline-block" style={{  padding: 12}}  >
                            <Dropzone type={'media/image'} destination= {'/leaders'} updateFileData={updateFileData} />
                        </Card>

                        <Form onSubmit={uploadChanges} className="col" style={{ padding: 1}} >
                            <Card style={{ padding: 11}}>

                                <CardBody style={{ padding: 8}}>
                                    <CardTitle> Ingresa los datos del lider </CardTitle>

                                    <Label htmlFor="name">Nombre</Label>
                                    <Input type="text" id="newName" name="newName" value={values.newName}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.newName && errors.newName) ? (<Alert color="danger">{errors.newName}</Alert>) : null}
                                    
                                    <Label htmlFor="designation">Cargo</Label>
                                    <Input type="text" id="newDesignation" name="newDesignation" value={values.newDesignation}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.newDesignation && errors.newDesignation) ? (<Alert color="danger">{errors.newDesignation}</Alert>) : null}

                                    <Label htmlFor="description">Descripcion del lider</Label>
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

EditLeaderComponent.propTypes = {};

export default EditLeaderComponent;