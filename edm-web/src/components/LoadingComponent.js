import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

export const Loading = () => {
    return(

        <div>

            <div className="row justify-content-center" >            
                <Spinner  animation="border" variant="danger" />
            </div>

            <div className="row justify-content-center" >            
                <p >Cargando . . .</ p >
            </div>

        </div>

    );
};
