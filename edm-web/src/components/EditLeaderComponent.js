import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';
import { useSelector, useDispatch } from 'react-redux';
import SessionExpiredComponent from './SessionExpiredComponent';
import {Loading} from './LoadingComponent';
import { leaderReset, postLeader, updateLeader, updateFileReset} from '../redux/ActionCreators';


const EditLeaderComponent = (props) => {
    
    const [name, setName] = useState(null);
    const [designation, setDesignation] = useState(null);
    const [description, setDescription] = useState(null);

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
            name: name,
            designation: designation,
            description: description
        }
        if (leaderData.featured == 'on') {
            leaderData.featured = true;
        }
        else {
            leaderData.featured = false;
        }
        if(updateFileResult){
            leaderData.imageUrl = '/public/images/leaders/' + updateFileResult.data.archivo;
        }
        else{
            leaderData.imageUrl = props.leader.imageUrl;
        }

        doUpdateLeader(leaderData);
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
                                    <Input type="text" id="name" name="name" value={name} onChange={event => setName(event.target.value)} required />
                                    <Label htmlFor="designation">Cargo</Label>
                                    <Input type="text" id="designation" name="designation" value={designation} onChange={event => setDesignation(event.target.value)} />
                                    <Label htmlFor="description">Descripcion del lider</Label>
                                    <Input type="textarea" id="description" name="description" value={description} onChange={event => setDescription(event.target.value)} />
                                    
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