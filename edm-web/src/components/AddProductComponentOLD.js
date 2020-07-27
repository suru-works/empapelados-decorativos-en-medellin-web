import React, { Component, useEffect, useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';

import { useDispatch } from 'react-redux'
import clienteAxios from 'axios';
import { baseBackUrl } from '../shared/baseUrl';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};




class AddProductComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null
        };
        this.updateImageFile = this.updateImageFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateImageFile(imageFile) {
        //getting the image data from imagePicker
        this.state = {
            selectedFile: imageFile
        };

    }

    async uploadImageFile(productData) {
        const resultado = await clienteAxios.post(baseBackUrl + 'media/image', productData.image);
        productData.finalProductData.imageUrl = '/public/images/products/' + resultado.data.archivo;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }

        const resultadoFinal = await clienteAxios.post(baseBackUrl + 'products', productData.finalProductData, {
            headers: headers
        });
    }

    handleSubmit(event) {

        const formData = new FormData();
        formData.append("file", this.state.selectedFile);

        const productData = {
            image: formData,
            finalProductData: {
                price: this.price.value,
                units: this.units.value,
                featured: this.featured.checked,
                name: this.name.value,
                description: this.description.value
            }
        }

        if (productData.finalProductData.featured == 'on') {
            productData.finalProductData.featured = true;
        }
        else {
            productData.finalProductData.featured = false;
        }

        this.uploadImageFile(productData);
        event.preventDefault();

        this.props.toggle();


    }
    render() {
        return (
            <div className="d-flex space-around">

                <Card className=" mr-2" >
                    <Dropzone updateImageFile={this.updateImageFile} />
                </Card>
                <Form onSubmit={this.handleSubmit}>
                    <Card>

                        <CardBody>
                            <CardTitle> Ingresa los datos del producto </CardTitle>

                            <Label htmlFor="name">Nombre</Label>
                            <Input type="text" id="name" name="name"
                                innerRef={(input) => this.name = input}
                                required
                            />
                            <Label htmlFor="price">Precio</Label>
                            <Input type="number" id="price" name="price"
                                innerRef={(input) => this.price = input} />
                            <Label htmlFor="units">Unidades disponibles</Label>
                            <Input type="number" id="units" name="units"
                                innerRef={(input) => this.units = input} />
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="featured" name="featured" innerRef={(input) => this.featured = input} />
                                    {' '}
                                    destacar
                                </Label>
                                <Label htmlFor="description">Descripcion del producto</Label>

                            </FormGroup>
                            <Input type="textarea" id="description" name="description"
                                innerRef={(input) => this.description = input} />
                            <Button type="submit" value="submit" color="primary">Añadir</Button>

                        </CardBody>
                    </Card>
                </Form>

            </div>
        );
    }

}

const AddProduct = AddProductComponent;

export default AddProduct;