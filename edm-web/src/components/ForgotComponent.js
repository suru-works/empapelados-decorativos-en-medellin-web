import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Loading } from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Form, FormGroup, Input, Label, Tooltip
} from 'reactstrap';
import { useParams } from "react-router-dom";

import { changePassword } from '../redux/ActionCreators';

import { useFormik } from "formik";

import * as yup from "yup";

const validationSchema = yup.object().shape(
    {
        password: yup
            .string()
            .min(8)
            .required(),
        confirm_password: yup
            .string()
            .required()
            .oneOf([yup.ref('password'), null], 'Las contraseñas deben de coincidir',),
    })

const ForgotComponent = (props) => {
    let params = useParams();
    const dispatch = useDispatch();

    const error = useSelector(state => state.changePassword.errMess);
    const result = useSelector(state => state.changePassword.result);
    const loading = useSelector(state => state.changePassword.isLoading);

    const doChangePassword = data => dispatch(changePassword(data));

    const submit = (data) => {

        const changePasswordData = {
            token: params.token,
            newPassword: data.password
        }
        doChangePassword(changePasswordData);

    }

    const { handleSubmit, handleChange, touched, values, errors } = useFormik({
        initialValues: {
            password: '',
            confirm_password: ''
        },
        validationSchema,
        onSubmit(values) {
            console.log(values);
            submit(values);
        }
    });



    if (error) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Cambiar contraseña</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    <label>Ha ocurrido un error cambiando la contraseña</label>
                </div>
            </div>
        );
    }
    else if (loading) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Cambiar contraseña</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    <Loading />
                </div>
            </div>

        );

    }
    else if (result) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Cambiar contraseña</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    <Label>Contraseña cambiada exitosamente!</Label>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Cambiar contraseña</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    <Form onSubmit={handleSubmit}>

                        <FormGroup>
                            <Input type="password" id="password" className="form-control" name="password" label="Nueva contraseña" values={values.password}
                                onChange={handleChange}
                            />
                            <Tooltip placement="right" isOpen={ touched.password && errors.password ? true : false} target="password">
                                {errors.confirm_password}
                            </Tooltip>
                            <Label htmlFor="password">Repite la contraseña</Label>
                            <Input type="password" id="confirm_password" className="form-control" name="confirm_password" value={values.confirm_password}
                                onChange={handleChange} />
                            <Tooltip placement="right" isOpen={ touched.confirm_password && errors.confirm_password ? true : false} target="confirm_password">
                                {errors.confirm_password}
                            </Tooltip>
                            
                        </FormGroup>

                        <div className="d-flex justify-content-center">
                            <Button type="submit" value="submit" className="primary-button">Cambiar contraseña</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }


};

ForgotComponent.propTypes = {};

export default ForgotComponent;