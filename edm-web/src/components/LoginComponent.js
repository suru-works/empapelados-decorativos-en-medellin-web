import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';

import {Loading} from './LoadingComponent';
import { login, loginReset, restorePassword} from '../redux/ActionCreators';


const LoginComponent = (props) => {

    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [restore, setRestore] = useState(false);

    const dispatch = useDispatch();

    const error = useSelector(state => state.auth.errMess);
    const result = useSelector(state => state.auth.result);
    const loading = useSelector(state => state.auth.isLoading);

    const restoreError = useSelector(state => state.restore.errMess);
    const restoreResult = useSelector(state => state.restore.result);
    const restoreLoading = useSelector(state => state.restore.isLoading);


    const toogleAndReset = () => {
        dispatch(loginReset());
        setRestore(false);
        setUser(null);
        setPassword(null);
        props.toggle();
    }

    const doRestorePassword = user => dispatch(restorePassword(user));
    const doLogin = credentials => dispatch(login(credentials));

    const handleLogin = event => {
        event.preventDefault();
        doLogin({ username: user, password: password });
    }

    const handleRestore = event => {
        event.preventDefault();
        doRestorePassword({ username: user});
    }

    if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
                <ModalBody>
                    <p>Hubo un error ingresando</p>
                </ModalBody>
            </Modal>
        );
    }
    if(loading){
        return(
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
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
                        <p>Ingreso exitoso</p>
                    </ModalBody>
                </Modal>
            );
        }
        

    }
    else {
        if(restore){
            if (restoreError) {
                return (
                    <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                        <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
                        <ModalBody>
                            <p>Hubo un error Restableciendo contraseña</p>
                        </ModalBody>
                    </Modal>
                );
            }
            if(restoreLoading){
                return(
                    <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                        <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
                        <ModalBody>
                            <Loading/>
                        </ModalBody>
                    </Modal>
                );
            }
            if (restoreResult) {
                if(restoreResult.success){
                    return (
                        <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                            <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
                            <ModalBody>
                                <p>Si tu correo es correcto y esta registrado recibiras un correo con instrucciones para restablecer tu contraseña</p>
                            </ModalBody>
                        </Modal>
                    );
                }
                
        
            }
            else{
                return(
                    <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
    
                    <ModalBody>
                        <Form onSubmit={handleRestore}>
                            <FormGroup>
                                <Label htmlFor="user">Correo electrónico</Label>
                                <Input type="user" id="user" name="user" className="form-control" value={user}
                                    onChange={e => setUser(e.target.value)} />
                            </FormGroup>
                            <Button color="primary" onClick={setRestore(false)}>Cancelar</Button>
                            <Button type="submit" value="submit" color="primary">Restablecer</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                );
            }
            
        }
        else{
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
    
                    <ModalBody>
                        <Form onSubmit={handleLogin}>
                            <FormGroup>
                                <Label htmlFor="user">Correo electrónico</Label>
                                <Input type="user" id="user" name="user" className="form-control" value={user}
                                    onChange={e => setUser(e.target.value)} />
                            </FormGroup>
    
                            <FormGroup>
                                <Label htmlFor="password">Contraseña</Label>
                                <Input type="password" id="password" className="form-control" name="password" value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </FormGroup>
    
                            <Button type="submit" value="submit" color="primary">Ingresar</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            );
        }
        
        
    }

};

LoginComponent.propTypes = {};

export default LoginComponent;