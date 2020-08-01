import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Loading} from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import { useParams } from "react-router-dom";

import { changePassword} from '../redux/ActionCreators';

const ForgotComponent = (props) => {
    let params = useParams();
    const dispatch = useDispatch();
    const [password1, setPassword1] = useState(null);
    const [password2, setPassword2] = useState(null);

    const error = useSelector(state => state.changePassword.errMess);
    const result = useSelector(state => state.changePassword.result);
    const loading = useSelector(state => state.changePassword.isLoading);
    
    const doChangePassword = data => dispatch(changePassword(data));

    const handleSubmit = (event) => {
        event.preventDefault();
        const changePasswordData = {
            token: params.token,
            newPassword: password1
        }
        doChangePassword(changePasswordData);
    }

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
    else if (loading){

    }
    else if (result){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Cambiar contraseña</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    <Loading/>
                </div>
            </div>
        );
    }
    else{
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
                            <Label htmlFor="password">Nueva contraseña</Label>
                            <Input type="password" id="password1" className="form-control" name="password1" value={password1}
                                onChange={e => setPassword1(e.target.value)} />
                            <Label htmlFor="password">Repite la contraseña</Label>
                            <Input type="password" id="password2" className="form-control" name="password2" value={password2}
                                        onChange={e => setPassword2(e.target.value)} />
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