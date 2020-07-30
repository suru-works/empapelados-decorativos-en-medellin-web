import React from 'react';
import PropTypes from 'prop-types';
import {
    useParams
} from "react-router-dom";

const ForgotComponent = (props) => {
    const {id} = useParams();
    return (
        <div className="container">
            {id}
        </div>
    );
};

ForgotComponent.propTypes = {};

export default ForgotComponent;