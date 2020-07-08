import React, { Component, useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
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


const Dropzone = () =>{
    const onDrop = useCallback( async (acceptedFiles) =>{
        console.log(acceptedFiles);

        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        const resultado = await clienteAxios.post(baseBackUrl + 'media/image', formData);
        console.log(resultado.data);
    },[])

    const { getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop})

    return(
        <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Arrastra una imagen aqui o presiona para seleccionar una.</p>
        </div>
    </section>
    );
}

export default Dropzone;