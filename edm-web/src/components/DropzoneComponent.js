import React, { Component, useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { uploadFile } from '../redux/ActionCreators';
import Loading from './LoginComponent';

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
    const [fileForPreview, setFileForPreview] = useState([]);
    const [fileForUpload, setFileForUpload] = useState(null);
    const [blockSubmit, setBlockSubmit] = useState(true);

    const error = useSelector(state => state.uploadFile.errMess);
    const result = useSelector(state => state.uploadFile.result);
    const loading = useSelector(state => state.uploadFile.isLoading);

    const dispatch = useDispatch();
    const doFileUpload = (fileData) => dispatch(uploadFile(fileData));

    const handleUpload = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", fileForUpload);
        const data = {
            type: props.type,
            file: formData
        };
        doFileUpload(data);
    }

    const onDrop = useCallback(async (acceptedFiles) => {

        setFileForUpload(acceptedFiles[0]);
        setFileForPreview(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        if (blockSubmit) {
            setBlockSubmit(false);
        }

    }, []);

    const thumbs = fileForPreview.map(file => (
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
    if (error) {
        if (error.response) {
            if (error.response.status == 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                localStorage.removeItem("username");
                return (
                    <section className="container">
                        <p>Hubo un error, pues tu sesion ya estaba vencida</p>
                        <p>inicia sesion de nuevo.</p>
                    </section>
                );
            }
            else {
                return (
                    <section className="container"> <p>error desconocido {error.message}</p></section>
                );
            }
        }
    }
    if (loading) {
        return (
            <Loading />
        );
    }
    if (result) {
            return (
                <div>
                    <p>Archivo subido correctamente correctamente.</p>
                </div>
            );
    }
    else {
        return (
            <section className="container">
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Arrastra una imagen aqui o presiona para seleccionar una.</p>
                </div>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
                <Button onClick={handleUpload} disabled={blockSubmit}>Aceptar</Button>
            </section>
        );
    }

}

export default Dropzone;