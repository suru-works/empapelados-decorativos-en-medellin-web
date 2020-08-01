import React, { Component, useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { uploadFile, updateFile } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

//Afecta la foto al dar click sobre EDITAR el producto, actualmente estira lo que puede la altura y acomoda el ancho
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

//Afecta la foto normal al dar click sobre el producto, actualmente estira lo que puede la altura y acomoda el ancho
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
    const doFileUpdate = (fileData) => dispatch(updateFile(fileData));

    const handleUpload = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", fileForUpload);
        const data = {
            type: props.type,
            destination: props.destination,
            file: formData
        };
        if(props.updateFileData){
            data.id = props.updateFileData.id;
            doFileUpdate(data);
        }
        else{
            doFileUpload(data);
        }
        
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


    
//Este estilo se activa solo al EDITAR un producto
    const thumbs = () => {
        if(props.updateFileData && fileForPreview.length==0){
            return(
                
                        <img className='detail-size' 
                            src={baseFrontUrl+props.updateFileData.initialPreview}
                                    
                        />

            ); 
                
        }
        else{
            return(
                fileForPreview.map(file => (
                            <img className='detail-size' 
                                src={file.preview}

                            />
                ))
            ); 
        }
    }
    
    


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
                    <p className="text-primary">Arrastra una imagen aqui o presiona para seleccionar una.</p>
                </div>
                <aside>
                    {thumbs()}
                </aside>
                <div class="d-flex justify-content-center" >
                    <Button onClick={handleUpload} disabled={blockSubmit} className="primary-button" style={{borderRadius: 3, marginTop: 20}}>Aceptar</Button>
                </div>
                
            </section>
        );
    }

}

export default Dropzone;