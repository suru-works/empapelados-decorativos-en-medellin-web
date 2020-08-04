import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import EditLeaderComponent from './EditLeaderComponent';
import SessionExpiredComponent from './SessionExpiredComponent';
import { baseFrontUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

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

function RenderDetailModal(props) {
    if (props.type === 'options') {
        return (
            <Modal className="modal-lg" isOpen={props.isDetailsModalOpen} toggle={props.toggleDetailsModal}>

                <ModalHeader toggle={props.toggleDetailsModal}>{props.leader.name}</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">

                        <Card className="col-12 col-lg-6  inline-block" style={{ padding: 12 }} >
                            <CardImg src={baseFrontUrl + props.leader.imageUrl} alt={props.leader.name} />
                        </Card>

                        <Card className="col" style={{ padding: 12 }} >

                            <CardBody style={{ padding: 8 }}>

                                <div className="info-size scroll">
                                    <CardText>  Cargo: {props.leader.designation}  </CardText>
                                    <CardText>  {props.leader.description}  </CardText>
                                </div>

                            </CardBody>
                        </Card>

                    </div>

                </ModalBody>
            </Modal>
        );
    }
}

function RenderDeleteModal(props) {
    const dispatch = useDispatch();

    const error = useSelector(state => state.leader.errMess);
    const success = useSelector(state => state.leader.leader);
    const loading = useSelector(state => state.leader.isLoading);

    const resetTypeAndToggle = () => {
        dispatch({ type: 'LEADER_RESET' });
        props.toggleDeleteModal();
    }

    if (success) {
        return (
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={props.toggleDeleteModal}>

                <ModalHeader toggle={props.toggleDeleteModal}>{props.leader.name}</ModalHeader>

                <ModalBody>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                <p className="text-center">Se ha eliminado el lider correctamente.</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-3">
                                <Button className="primary-button" onClick={props.reloadData}>Aceptar</Button>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        );
    }
    else if (loading) {
        return (
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={props.toggleDeleteModal}>

                <ModalHeader toggle={props.toggleDeleteModal}>{props.leader.name}</ModalHeader>

                <ModalBody>

                    <Loading />
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

                <ModalHeader toggle={resetTypeAndToggle}>{props.leader.name}</ModalHeader>

                <ModalBody>

                    <p>Ha ocurrido un error eliminando el lider.</p>
                    <Button className="primary-button" onClick={resetTypeAndToggle}>Aceptar</Button>
                </ModalBody>
            </Modal>
        );
    }
    else {
        return (
            <Modal className="modal-md" isOpen={props.isDeleteModalOpen} toggle={props.toggleDeleteModal}>

                <ModalHeader toggle={props.toggleDeleteModal}>{props.leader.name}</ModalHeader>

                <ModalBody>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                <p className="text-center">¿Seguro que desea eliminar el lider?</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-3">
                                <Button className="secondary-button" onClick={() => props.handleDelete(props.leader._id)}>Confirmar</Button>
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


class Leader extends Component {

    constructor(props) {

        super(props);
        this.state = {
            leader: this.props.leader,
            isDetailsModalOpen: false,
            isDeleteModalOpen: false,
            isEditModalOpen: false,
            deleteModalType: 'options',
            detailsModalType: 'options',
            editModalType: 'options',
            leaderDeleteError: null
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

    handleDelete(leaderId) {

        this.props.deleteLeader(leaderId);
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
            <div className="mt-3 col-12 col-lg-6 col-md-6 " key={this.props.leader._id}>
                <Card >
                    <CardBody>
                        <CardTitle>{this.props.leader.name}</CardTitle>

                        <CardImg onClick={this.toggleDetailsModal} src={baseFrontUrl + this.props.leader.imageUrl} alt={this.props.leader.name} />
                        <CardTitle>{this.props.leader.designation}</CardTitle>
                        <RenderOptions areEditOptionsActived={this.props.areEditOptionsActived} toggleDetailsModal={this.toggleDetailsModal} toggleDeleteModal={this.toggleDeleteModal} toggleEditModal={this.toggleEditModal}></RenderOptions>
                    </CardBody>
                </Card>


                <RenderDetailModal
                    type={this.state.detailsModalType}
                    isDetailsModalOpen={this.state.isDetailsModalOpen}
                    toggleDetailsModal={this.toggleDetailsModal}
                    leader={this.props.leader}
                />
                <RenderDeleteModal
                    type={this.state.deleteModalType}
                    isDeleteModalOpen={this.state.isDeleteModalOpen}
                    toggleDeleteModal={this.toggleDeleteModal}
                    handleDelete={this.handleDelete}
                    leader={this.props.leader}
                    resetDeleteModalState={this.resetDeleteModalState}
                    reloadData={this.props.reloadData}
                />
                <EditLeaderComponent leader={this.props.leader} reloadData={this.props.reloadData} isOpen={this.state.isEditModalOpen} toggle={this.toggleEditModal} />




            </div>
        )
    }

}

export default Leader;