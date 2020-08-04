import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';

import SessionExpiredComponent from './SessionExpiredComponent';
import {Loading} from './LoadingComponent';
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
        if(error.response){
            if(error.response.status===401){
                return (
                    <SessionExpiredComponent isOpen={props.isOpen} toggle={toogleAndReset}/>
                );
            }
        }
        
        else{
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Salir</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error cerrando sesion.</p>
                    </ModalBody>
                </Modal>
            );
        }
        
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
                </Modal>
            );
        }
    }
    else {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Salir</ModalHeader>

                <ModalBody>
                    <p>¿Está seguro de que quiere cerrar sesión?</p>
                    <div className="d-flex justify-content-center">
                        <Button onClick={handleLogout} className="primary-button">Cerrar sesion</Button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
};

LogOutComponent.propTypes = {};

export default LogOutComponent;