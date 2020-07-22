import React, { Component, useEffect, useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';

import clienteAxios from 'axios';
import { baseBackUrl } from '../shared/baseUrl';


//dropzone image preview settings

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




class EditProductComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            hasImageChanged: false,
            price: props.product.price,
            units: props.product.units,
            featured: props.product.featured,
            name: props.product.name,
            description: props.product.description
        };
        this.updateImageFile = this.updateImageFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.form = React.createRef()
    }

    updateImageFile(imageFile) {
        //getting the image data from imagePicker
        if (!this.state.hasImageChanged) {
            this.setState({
                hasImageChanged: true
            });
        }
        this.setState({
            selectedFile: imageFile
        });

    }

    async uploadChanges(productData) {
        if (this.state.hasImageChanged) {
            const imageId = this.props.product.imageUrl.split('/').slice(-1)[0];


            await clienteAxios.delete(baseBackUrl + 'media/image/' + imageId);
            const resultado = await clienteAxios.post(baseBackUrl + 'media/image', productData.image);
            productData.finalProductData.imageUrl = '/public/images/products/' + resultado.data.archivo;
        }
         else{
            productData.finalProductData.imageUrl = this.props.product.imageUrl;
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }

        const resultadoFinal = await clienteAxios.put(baseBackUrl + 'products/'+productData.finalProductData.productId , productData.finalProductData, {
            headers: headers
        }); 
    }

    handleSubmit(event) {

        const formData = new FormData();

        if (this.state.hasImageChanged) {
            console.log('este es el archivo en el estado');
            console.log(this.state.selectedFile);

            formData.append("file", this.state.selectedFile);

        }


        const productData = {
            image: formData,
            finalProductData: {
                productId:this.props.product._id,
                price: this.state.price,
                units: this.state.units,
                featured: this.state.featured,
                name: this.state.name,
                description: this.state.description
            }
        }

        this.uploadChanges(productData);

        console.log('este es el nombre del archivo ya subido');
        console.log(productData);
        event.preventDefault();

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div className="d-flex space-around">

                <Card className=" mr-2" >
                    <Dropzone updateImageFile={this.updateImageFile} />
                </Card>
                <Form onSubmit={this.handleSubmit} ref={this.form}>
                    <Card>

                        <CardBody>
                            <CardTitle> Ingresa los datos del producto </CardTitle>

                            <Label htmlFor="name">Nombre</Label>
                            <Input type="text" id="name" name="name" value={this.state.name} onChange={event => this.handleInputChange(event)} required/>
                            <Label htmlFor="price">Precio</Label>
                            <Input type="number" id="price" name="price" value={this.state.price} onChange={event => this.handleInputChange(event)} />
                            <Label htmlFor="units">Unidades disponibles</Label>
                            <Input type="number" id="units" name="units" value={this.state.units} onChange={event => this.handleInputChange(event)} />
                            <Label check>destacar</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="featured" name="featured" checked={this.state.featured} onChange={event => this.handleInputChange(event)} />
                                    {' '}
                                    destacar
                                </Label>
                            </FormGroup>
                            <Label htmlFor="description">Descripcion del producto</Label>
                            <Input type="textarea" id="description" name="description" value={this.state.description} onChange={event => this.handleInputChange(event)} />

                        </CardBody>
                    </Card>
                    <Button type="submit" value="submit" color="primary" >Guardar</Button>
                </Form>

            </div>
        );
    }

}

const EditProduct = EditProductComponent;

export default EditProduct;