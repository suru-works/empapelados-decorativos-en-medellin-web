import React, { Component, useEffect, useState } from 'react';
import {  Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useDropzone } from 'react-dropzone';

import Dropzone from './DropzoneComponent';

import axios from 'axios';

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


function ImagePicker(props) {
    const [files, setFiles] = useState([]);
    const make = (file) => {

        props.updateImageFile(file);
    }
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);


    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Arrastra una imagen aqui o presiona para seleccionar una.</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}


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
        console.log('actualizando parent props');
        console.log(this.state.selectedFile);
    }

    handleSubmit(event) {
        /* const formData = new FormData();
        formData.append('file', this.state.selectedFile); */
        console.log('este es el archivo en el estado');
        console.log(this.state.selectedFile);
        /* console.log('este es el archivo en el formData');
        console.log(formData);
        this.props.upload(formData); */
        /* const mediaData ={
            file: this.state.selectedFile
        }
        this.props.upload(mediaData); */
        this.props.upload(this.state.selectedFile);
        event.preventDefault();
        const productData = {
            
            price: this.price.value,
            units: this.units.value,
            featured: this.featured.value,
            name: this.name.value,
            description: this.description.value
        }
        this.props.toggle();

        
    }
    render() {
        return (
            <div className="d-flex space-around">

                <Card className=" mr-2" >
                    <ImagePicker updateImageFile={this.updateImageFile}></ImagePicker>
                    <Dropzone />
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