import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';
import { useSelector, useDispatch } from 'react-redux';
import SessionExpiredComponent from './SessionExpiredComponent';
import {Loading} from './LoadingComponent';
import { leaderReset, postLeader, uploadFileReset } from '../redux/ActionCreators';

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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (fileSuccess) {
            const leaderData = {
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
            leaderData.imageUrl = '/public/images/leaders/' + fileSuccess.data.archivo;

            doAddLeader(leaderData);
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
                                    <Input type="text" id="name" name="name"
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                    <Label htmlFor="designation">Cargo</Label>
                                    <Input type="text" id="designation" name="designation"
                                        onChange={e => setDesignation(e.target.value)}
                                        required
                                    />

                                    <Label htmlFor="description">Descripción del lider</Label>
                                    <Input type="textarea" id="description" name="description"
                                        onChange={e => setDescription(e.target.value)} />
                                    
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