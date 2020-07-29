import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
    return(
        <div className="col-12">
            <Spinner animation="border" variant="danger" />
            <p >Cargando . . .</ p >
        </div>
    );
};

export default Loading; 