import React, { Component, useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import {Button } from 'reactstrap';
import { uploadFile } from '../redux/ActionCreators';

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


const Dropzone = (props) => {
    const [fileForPreview,setFileForPreview]= useState([]);
    const [fileForUpload,setFileForUpload]= useState(null);
    const [fileHasChanged,setfileHasChanged] = useState(false);

    const dispatch = useDispatch();
    const doFileUpload = (fileData) => dispatch(uploadFile(fileData));

    const handleUpload = (event) =>{
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", fileForUpload);
        doFileUpload(formData);
    }

    const onDrop = useCallback(async (acceptedFiles) => {

        setFileForUpload(acceptedFiles[0]);
        setFileForPreview(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        if(!fileHasChanged){
            setfileHasChanged(true);
        }
        
    }, []);

    const thumbs = fileForPreview.map( file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));
    

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Arrastra una imagen aqui o presiona para seleccionar una.</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
            <Button onClick={handleUpload} enabled={fileHasChanged}>Aceptar</Button>
        </section>
    );
}

export default Dropzone;