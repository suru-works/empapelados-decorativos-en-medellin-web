import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Alert, Label
} from 'reactstrap';


import { Loading } from './LoadingComponent';
import { register, registerReset } from '../redux/ActionCreators';

import { useFormik } from "formik";

import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = Yup.object(
    {   
        user: Yup
        .string()
        .email("Ingresa un correo electronico valido.")
        .required("Este campo es obligatorio"),
        password: Yup
            .string()
            .min(8, "la contraseña debe ser de minimo 8 caracteres")
            .max(40, "la contraseña debe ser de maximo 40 caracteres")
            .required("Este campo es obligatorio"),
        name: Yup
        .string(),
        phoneNumber: Yup
        .string()
        .matches(phoneRegExp, 'Ingresa un telefono valido'),
    });


const RegisterComponent = (props) => {

    const dispatch = useDispatch();

    const error = useSelector(state => state.register.errMess);
    const result = useSelector(state => state.register.result);
    const loading = useSelector(state => state.register.isLoading);

    const toogleAndReset = () => {
        dispatch(registerReset());
        props.toggle();
    }

    const doRegister = data => dispatch(register(data));

    const handleRegister = values => {
        doRegister({ username: values.user, password: values.password, admin: false, name: values.name, phoneNumber: values.phoneNumber });
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            user: '',
            password: '',
            name: '',
            phoneNumber: ''
        },
        validationSchema,
        onSubmit(values) {
            handleRegister(values);
        }
    });

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
    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    if (result) {
        if (result.success) {
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
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="user">Correo electrónico</Label>
                            <Input type="user" id="user" name="user" className="form-control" values={values}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.user && errors.user) ? (<Alert color="danger">{errors.user}</Alert>) : null}

                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="password">Contraseña*</Label>
                            <Input type="password" id="password" name="password" className="form-control" values={values}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.password && errors.password) ? (<Alert color="danger">{errors.password}</Alert>) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="name">Nombre</Label>
                            <Input type="text" id="name" name="name" className="form-control" values={values}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.name && errors.name) ? (<Alert color="danger">{errors.name}</Alert>) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="phoneNumber">Número de teléfono (ejemplo: +573002312301)</Label>
                            <Input type="tel" id="phoneNumber" name="phoneNumber" className="form-control" values={values}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.phoneNumber && errors.phoneNumber) ? (<Alert color="danger">{errors.phoneNumber}</Alert>) : null}
                        </FormGroup>

                        <div className="d-flex justify-content-center">
                            <Button type="submit" value="submit" className="primary-button">Registrarse</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
};

RegisterComponent.propTypes = {};

export default RegisterComponent;