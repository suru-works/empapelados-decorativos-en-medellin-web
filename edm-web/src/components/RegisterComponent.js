import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';

import Loading from './LoadingComponent';
import { register, registerReset } from '../redux/ActionCreators';


const RegisterComponent = (props) => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    const dispatch = useDispatch();

    const error = useSelector(state => state.register.errMess);
    const result = useSelector(state => state.register.result);
    const loading = useSelector(state => state.register.isLoading);

    const toogleAndReset = () => {
        dispatch(registerReset());
        props.toggle();
    }

    const doRegister = data => dispatch(register(data));

    const handleRegister = event => {
        event.preventDefault();
        doRegister({ username: user, password: password, admin: false, name: name, phoneNumber: phoneNumber });
    }

    if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                <ModalBody>
                    <p>Hubo un error registrandose.</p>
                </ModalBody>
            </Modal>
        );
    }
    if(loading){
        return(
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
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
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                    <ModalBody>
                        <p>Registro exitoso, verifica tu correo electronico para poder ingresar.</p>
                    </ModalBody>
                </Modal>
            );
        }
        

    }
    else {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>

                    <ModalBody>
                        <Form onSubmit={handleRegister}>
                            <FormGroup>
                                <Label htmlFor="user">Correo electrónico</Label>
                                <Input type="user" id="user" name="user"
                                     onChange={e => setUser(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Contraseña*</Label>
                                <Input type="password" id="password" name="password"
                                    onChange={e => setPassword(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="name">Nombre</Label>
                                <Input type="text" id="name" name="name"
                                    onChange={e => setName(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="phoneNumber">Número de teléfono (ejemplo: +573002312301)</Label>
                                <Input type="tel" id="phoneNumber" name="phoneNumber"
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    pattern="^\+[1-9]{1}[0-9]{3,14}$"
                                />
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Registrarse</Button>
                        </Form>
                    </ModalBody>
            </Modal>
        );
    }
};

RegisterComponent.propTypes = {};

export default RegisterComponent;