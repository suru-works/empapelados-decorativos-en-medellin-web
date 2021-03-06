import React, { Component} from 'react';
import { FormGroup, Alert, Card, CardImg, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, Form, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import EditProductComponent from './EditProductComponent';
import SessionExpiredComponent from './SessionExpiredComponent';
import { baseFrontUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

import { postcomment, commentReset, fetchProducts  } from '../redux/ActionCreators';
import { useFormik } from "formik";

import * as yup from "yup";

function RenderOptions(props) {
    if (props.areEditOptionsActived) {
        return (
            <div className='mt-3 d-flex justify-content-center'>
                <Button className="primary-button" onClick={() => props.toggleEditModal()}>Editar</Button>
                <Button className="secondary-button" onClick={() => props.toggleDeleteModal()}>Eliminar</Button>
            </div>
        );
    }
    else {
        return (
            <div className='mt-3 d-flex justify-content-center'>
                <Button className="primary-button" onClick={() => props.toggleDetailsModal()}>Ver más</Button>
            </div>
        );
    }
}


const validationSchema = yup.object(
    {
        newComment: yup
            .string()
            .min(2,"el comentario debe ser de minimo 2 caracteres")
            .max(280,"el comentario debe ser de maximo 280 caracteres")
            .required("Este campo es obligatorio"),
    });


const CanIComment = (props) => {

    const error = useSelector(state => state.comment.errMess);
    const result = useSelector(state => state.comment.comment);
    const loading = useSelector(state => state.comment.isLoading);

    const dispatch = useDispatch();

    const doComment = (comment) => dispatch(postcomment(comment));

    const doCommentReset = () => dispatch(commentReset());

    const doFetch= () => dispatch(fetchProducts());

    function doResetandShow(){
        doCommentReset();
        doFetch();
    }

    const submit = (values) => {
        const commentData = {
            productId: props.productId,
            comment: values.newComment
        };
        doComment(commentData);

    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            newComment: ''
        },
        validationSchema,
        onSubmit(values) {
            submit(values);
        }
    });

    if (localStorage.getItem('token')) {
        if (error) {
            return (
                <div>

                    <div className="d-flex justify-content-center">
                        <label>Hubo un error publicando el comentario</label>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Button onClick={doCommentReset} className="primary-button" >Aceptar</Button>
                    </div>
                    
                </div>
            );
        }
        else if (loading) {
            return (
                <Loading></Loading>
            );
        }
        else if (result) {
            
            return (
                <div>

                    <div className="d-flex justify-content-center">
                        <label>Comentario publicado correctamente</label>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Button onClick={doResetandShow} className="primary-button" >Aceptar</Button>
                    </div>
                    
                </div>
            );
        }
        else {
            return (
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input className="mb-1 form-control" type="text" id="newComment" name="newComment"  values={values.newComment}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Input>
                        { (touched.newComment && errors.newComment) ? (<Alert color="danger">{errors.newComment}</Alert>) : null}
                    
                    </FormGroup>
                    <div className="d-flex justify-content-center">
                        <Button type="submit" value="submit" className="primary-button" >Comentar</Button>
                    </div>
                </Form>
            );
        }

    }
    else {
        return (
            <Form onSubmit={handleSubmit}>
                <Input className="mb-1" type="text" required disabled={true} ></Input>
                <div className="d-flex justify-content-center">
                    <Button type="submit" className="primary-button" disabled={true} tooltip={"Ingresa para poder comentar"}>Comentar</Button>
                </div>
            </Form>
        );
    }
}


const ShowComments = (props) => {

    if (props.comments.length === 0 ) {
        return( 
            <CardText>Este producto aún no tiene comentarios, se el primero en opinar!</CardText>
        );
    }
    else {

        const oneComment = props.comments.map((item) => {
            return (
                <CardText>"{item.comment}" - {new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'

                }).format(new Date(item.updatedAt))}</CardText>
            );
        });
        
        return (
            <div>
                {oneComment}
            </div>
        );
    }

}

function RenderDetailModal(props) {
    if (props.type === 'options') {
        if (localStorage.getItem('admin') === 'true') {
            return (
                <Modal className="modal-lg" isOpen={props.isDetailsModalOpen} toggle={props.toggleDetailsModal}>
    
                    <ModalHeader toggle={props.toggleDetailsModal}>{props.product.name}</ModalHeader>
    
                    <ModalBody>
    
                        <div className="d-flex space-around row">
    
                            <Card className="col-12 col-lg-6  inline-block" style={{ padding: 12 }} >
                                <CardImg src={baseFrontUrl + props.product.imageUrl} alt={props.product.name} />
                            </Card>
    
                            <Card className="col" style={{ padding: 12 }} >
    
                                <CardBody style={{ padding: 8 }}>
                                    <CardTitle className="text-danger"> Detalles del producto </CardTitle>
                                    <div className="info-size scroll">
                                        <CardText>  Precio: {props.product.price}  </CardText>
                                        <CardText>  Unidades: {props.product.units}  </CardText>
                                        <CardText>  {props.product.description}  </CardText>
                                    </div>
                                    <CardText>  Comentarios:  </CardText>
                                    <div className="comment-size scroll mb-3" style={{ paddingRight: 30 }}>
    
                                        <ShowComments comments={props.product.comments}/>
    
                                    </div>
    
                                    <CanIComment productId={props.product._id}/>
    
                                </CardBody>
                            </Card>
    
                        </div>
    
                    </ModalBody>
                </Modal>
            );
        }
        else{
            return (
                <Modal className="modal-lg" isOpen={props.isDetailsModalOpen} toggle={props.toggleDetailsModal}>
    
                    <ModalHeader toggle={props.toggleDetailsModal}>{props.product.name}</ModalHeader>
    
                    <ModalBody>
    
                        <div className="d-flex space-around row">
    
                            <Card className="col-12 col-lg-6  inline-block" style={{ padding: 12 }} >
                                <CardImg src={baseFrontUrl + props.product.imageUrl} alt={props.product.name} />
                            </Card>
    
                            <Card className="col" style={{ padding: 12 }} >
    
                                <CardBody style={{ padding: 8 }}>
                                    <CardTitle className="text-danger"> Detalles del producto </CardTitle>
                                    <div className="info-size scroll">
                                        <CardText>  {props.product.description}  </CardText>
                                    </div>
                                    <CardText>  Comentarios:  </CardText>
                                    <div className="comment-size scroll mb-3" style={{ paddingRight: 30 }}>
    
                                        <ShowComments comments={props.product.comments}/>
    
                                    </div>
    
                                    <CanIComment productId={props.product._id}/>
    
                                </CardBody>
                            </Card>
    
                        </div>
    
                    </ModalBody>
                </Modal>
            );
        }
        
    }
}

function RenderDeleteModal(props) {
    const dispatch = useDispatch();
 
    const error = useSelector(state => state.product.errMess);
    const loading = useSelector(state => state.product.isLoading);
    const success = useSelector(state => state.product.product);

    const resetTypeAndToggle = () => {
        dispatch({ type: 'PRODUCT_RESET' });
        props.toggleDeleteModal();
    }

    const finishTheFigth = () => {
        resetTypeAndToggle();
        dispatch(fetchProducts());
    }

    /* useEffect(() => {
        this.setState({
            productDeleteError: error
        })
    }, [error]) */
    
    if (success) {
        return (
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={props.toggleDeleteModal}>

                <ModalHeader toggle={props.toggleDeleteModal}>{props.product.name}</ModalHeader>

                <ModalBody>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                <p className="text-center">Se ha eliminado el producto correctamente.</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-3">
                                <Button className="primary-button" onClick={finishTheFigth}>Aceptar</Button>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        if (error.status === 401) {
            return (
                <SessionExpiredComponent isOpen={props.isDeleteModalOpen} toggle={resetTypeAndToggle} />
            );
        }
        return (
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={resetTypeAndToggle}>

                <ModalHeader toggle={resetTypeAndToggle}>{props.product.name}</ModalHeader>

                <ModalBody>

                    <p>Ha ocurrido un error eliminando el producto.</p>
                    <Button onClick={resetTypeAndToggle}>Aceptar</Button>
                </ModalBody>
            </Modal>
        );
    }
    else if (loading){
        return (
            <Loading />
        );
    }
    else {
        return (
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={props.toggleDeleteModal}>

                <ModalHeader toggle={props.toggleDeleteModal}>{props.product.name}</ModalHeader>

                <ModalBody>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                <p className="text-center">¿Seguro que desea eliminar el producto?</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-3">
                                <Button className="secondary-button" onClick={() => props.handleDelete(props.product._id)}>Confirmar</Button>
                            </div>
                            <div className="col-3">
                                <Button className="primary-button" onClick={props.toggleDeleteModal}>Cancelar</Button>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </Modal>

        );
    }
}


class Product extends Component {


    constructor(props) {

        super(props);
        this.state = {
            product: this.props.product,
            isDetailsModalOpen: false,
            isDeleteModalOpen: false,
            isEditModalOpen: false,
            deleteModalType: 'options',
            detailsModalType: 'options',
            editModalType: 'options',
            productDeleteError: null
        };

        this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateEditModalType = this.updateEditModalType.bind(this);

    }

    toggleDetailsModal() {
        this.setState({
            isDetailsModalOpen: !this.state.isDetailsModalOpen
        });
        this.resetDetailModalState();
    }

    toggleDeleteModal() {
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen
        });
        this.resetDeleteModalState();
    }

    toggleEditModal() {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen
        });
        this.resetEditModalState();
    }


    updateEditModalType(type) {
        this.setState({
            editModalType: type
        });
    }


    handleDelete(productId) {

        this.props.deleteProduct(productId);
    }

    resetDeleteModalState() {
        this.setState({
            deleteModalType: 'options'
        });
    }

    resetDetailModalState() {
        this.setState({
            detailsModalType: 'options'
        });
    }

    resetEditModalState() {
        this.setState({
            editModalType: 'options'
        });
    }

    render() {



        return (
            <div className="mt-3 col-12 col-lg-3 col-md-4 col-sm-6" key={this.props.product._id}>
                <Card >
                    <CardBody>
                        <CardTitle>{this.props.product.name}</CardTitle>

                        <CardImg onClick={this.toggleDetailsModal} src={baseFrontUrl + this.props.product.imageUrl} alt={this.props.product.name} />
                        <RenderOptions areEditOptionsActived={this.props.areEditOptionsActived} toggleDetailsModal={this.toggleDetailsModal} toggleDeleteModal={this.toggleDeleteModal} toggleEditModal={this.toggleEditModal}></RenderOptions>
                    </CardBody>
                </Card>


                <RenderDetailModal
                    type={this.state.detailsModalType}
                    isDetailsModalOpen={this.state.isDetailsModalOpen}
                    toggleDetailsModal={this.toggleDetailsModal}
                    product={this.props.product}
                />
                <RenderDeleteModal
                    type={this.state.deleteModalType}
                    isDeleteModalOpen={this.state.isDeleteModalOpen}
                    toggleDeleteModal={this.toggleDeleteModal}
                    handleDelete={this.handleDelete}
                    product={this.props.product}
                    resetDeleteModalState={this.resetDeleteModalState}
                    reloadData={this.props.reloadData}
                />
                <EditProductComponent product={this.props.product} reloadData={this.props.reloadData} isOpen={this.state.isEditModalOpen} toggle={this.toggleEditModal} />




            </div>
        )
    }

}

export default Product;