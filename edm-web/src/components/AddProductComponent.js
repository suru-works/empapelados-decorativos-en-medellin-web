import React, { Component, useEffect, useState } from 'react';
import {  Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';

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

    async uploadImageFile(productData){
        const resultado = await clienteAxios.post(baseBackUrl + 'media/image', productData.image);
        productData.finalProductData.imageUrl='/public/images/products/'+resultado.data.archivo;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('token')
          }
          
        const resultadoFinal = await clienteAxios.post(baseBackUrl + 'products', productData.finalProductData,{
            headers: headers
          });
        //this.props.postProduct(productData.finalProductData);
    }

    handleSubmit(event) {
        
        console.log('este es el archivo en el estado');
        console.log(this.state.selectedFile);
        
        const formData = new FormData();
        formData.append("file", this.state.selectedFile);

        const productData = {
            image: formData,
            finalProductData:{
                price: this.price.value,
                units: this.units.value,
                featured: this.featured.value,
                name: this.name.value,
                description: this.description.value
            }
        }
        
        this.uploadImageFile(productData);

        console.log('este es el nombre del archivo ya subido');
        console.log(productData);
        event.preventDefault();
        
        this.props.toggle();

        
    }
    render() {
        return (
            <div className="d-flex space-around">

                <Card className=" mr-2" >
                    <Dropzone  updateImageFile={this.updateImageFile} />
                </Card>

                <Card>

                    <CardBody>
                        <CardTitle> Ingresa los datos del producto </CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="name">Nombre</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="price">Precio</Label>
                                <Input type="price" id="price" name="price"
                                    innerRef={(input) => this.price = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="units">Unidades disponibles</Label>
                                <Input type="text" id="units" name="units"
                                    innerRef={(input) => this.units = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="featured" name="featured" innerRef={(input) => this.featured = input} />
                                    {' '}
                                    destacar
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="description">Descripcion del producto</Label>
                                <Input type="text" id="description" name="description"
                                    innerRef={(input) => this.description = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Añadir</Button>
                        </Form>
                    </CardBody>
                </Card>

            </div>
        );
    }

}

const AddProduct = AddProductComponent;

export default AddProduct;