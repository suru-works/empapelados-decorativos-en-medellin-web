import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';

import Loading from './LoginComponent';
import { logout, logoutReset } from '../redux/ActionCreators';

const LogOutComponent = (props) => {
    const error = useSelector(state => state.auth.errMess);
    const result = useSelector(state => state.auth.result);
    const loading = useSelector(state => state.auth.isLoading);

    const dispatch = useDispatch();


    const toogleAndReset = () => {
        dispatch(logoutReset());
        props.toggle();
    }

    const doLogout = () => dispatch(logout());

    const handleLogout = event => {
        event.preventDefault();
        doLogout();
    }

    if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Salir</ModalHeader>
                <ModalBody>
                    <p>Hubo un error cerrando sesion.</p>
                </ModalBody>
            </Modal>
        );
    }
    if(loading){
        return(
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Salir</ModalHeader>
                <ModalBody>
                    <Loading/>
                </ModalBody>
            </Modal>
        );
    }
    if (result) {
        if(result.success){
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
                    <ModalBody>
                        <p>Cierre de sesion exitoso</p>
                    </ModalBody>
                    <Button onClick={toogleAndReset}>Aceptar</Button>
                </Modal>
            );
        }
        

    }
    else {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Salir</ModalHeader>

                <ModalBody>
                    <p>Esta seguro de que quiere cerrar sesion?</p>
                </ModalBody>
                <Button onClick={handleLogout}>Cerrar sesion</Button>
            </Modal>
        );
    }
};

LogOutComponent.propTypes = {};

export default LogOutComponent;