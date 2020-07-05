import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Product from './ProductComponent';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';


class Gallery extends Component {


    constructor(props) {
        super(props);
    }

    render() {

        const galeria = this.props.products.map((product) => {
            try {
                
                return (
                    <Product product={product}/>
                );
            }
            catch (err) {
                console.log(err);
            }


        });

        return (
            <div className="container">

                <div className="row">
                    <div className="col-12">
                        <h3>Galeria que se adapta a tu pantalla</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12">
                    {galeria}
                </div>
                
                

            </div>

        )
    }

}

export default Gallery;   