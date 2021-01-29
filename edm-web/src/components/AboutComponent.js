import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import Leader from './LeaderComponent';
import AddLeader from './AddLeaderComponent';


function RenderAdminOptions(props) {


    if (localStorage.getItem('admin') === 'true') {
        return (
            <FloatingButtonContainer>

                <FloatingButtonLink tooltip="Añadir un lider">
                    <div onClick={props.toggleAddLeaderModal} style={{ width: 35, height: 35, marginRight: 0, marginLeft: 8, marginTop: 5, marginBottom: 0 }}>
                        <i className="fa fa-plus fa-2x"></i>
                    </div >
                </FloatingButtonLink>
                <FloatingButtonLink tooltip="Editar">
                    <div onClick={props.openEditOptions} style={{ width: 35, height: 35, marginRight: 0, marginLeft: 15, marginTop: 6, marginBottom: 0 }}>
                        <i className="fa fa-pencil fa-1x"></i>
                    </div >
                </FloatingButtonLink>

                <FloatingButton
                    tooltip="Editar acerca de nosotros"
                    icon="fa fa-pencil-square-o fa-2x"
                    rotate={true}
                    styles={{ backgroundColor: darkColors.lighterRed, color: lightColors.white }} />
            </FloatingButtonContainer>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


const LeadersBoard = (props) => {


    if (props.leaders.length > 0) {

        const leaderList = props.leaders.map((leader) => {
            try {

                return (
                    <Leader leader={leader} key={leader._id}
                        areEditOptionsActived={props.areEditOptionsActived}
                        deleteLeader={props.deleteLeader}
                        leadersErrMess={props.leadersErrMess}
                        reloadData={props.reloadData}
                        toggleDeleteModal={props.toggleDeleteModal}
                    />
                );
            }
            catch (err) {
                return (
                    <Label>No se encontraron lideres</Label>
                );

            }
        });

        return (
            <div className="row row-content">
                <div className="col-12">
                    <h2>Lideres de nuestra compa­ñia</h2>
                </div>
                {leaderList}
            </div>
        );
    }
    else {
        return (
            <div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Nuestra experiencia y responsabilidad es de las mejores en el pais, animate y contactanos!</h2>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to='/contacto'>
                        <Button style={{ width: '17vh', height: 'auto' }} className="primary-button">Contactanos</Button>
                    </Link>
                </div>
            </div>

        );
    }
}

function About(props) {

    const [isAddLeaderModalOpen, setIsAddLeaderModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [areEditOptionsActived, setAreEditOptionsActived] = useState(false);

    const toggleAddLeaderModal = () => {
        setIsAddLeaderModalOpen(!isAddLeaderModalOpen);

    }

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    }

    const openEditOptions = () => {
        setAreEditOptionsActived(!areEditOptionsActived);
    }






    return (
        <div className="container">

            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/inicio">Inicio</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Acerca de Nosotros</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Acerca de Nosotros</h3>
                    <hr />
                </div>
            </div>

            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Nuestra Historia</h2>
                    <p>Nuestra empresa inicio en 1990, en Medellin Antioquia y rapidamente se convirtio en una empresa reconocida, Empapelados Decorativos en Medellin ha acompañado a los hogares Colombianos con excelencia y gran calidad de productos, ademas de que siempre vela por que el cliente quede satisfecho. Nuestro fundador y empleados, siempre estaran atentos a cualquier duda.</p>
                    <p>Al ser fundada, la empresa inicio como distribuidora de papel tapiz, pero ahora tiene una gran gama de productos, como lo son papeles de colgadura, jardines sintéticos, telas y vinilos personalizados.</p>
                </div>

                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader style={{ backgroundColor: '#29434e' }} className="text-white">Cualidades que nos distinguen</CardHeader>
                        <CardBody>
                            <h6> <i className="fa fa-check-square-o" aria-hidden="true"></i> Asesorias personalizadas. </h6>
                            <br></br>
                            <h6> <i className="fa fa-check-square-o" aria-hidden="true"></i> Más de 30 años de experiencia.</h6>
                            <br></br>
                            <h6> <i className="fa fa-check-square-o" aria-hidden="true"></i> Gran variedad de diseños.</h6>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <LeadersBoard leaders={props.leaders} areEditOptionsActived={areEditOptionsActived} deleteLeader={props.deleteLeader} leadersErrMess={props.leadersErrMess} reloadData={props.reloadData} toggleDeleteModal={toggleDeleteModal} />

            <AddLeader isOpen={isAddLeaderModalOpen} toggle={toggleAddLeaderModal} reloadData={props.reloadData} ></AddLeader>

            <RenderAdminOptions toggleAddLeaderModal={toggleAddLeaderModal} openEditOptions={openEditOptions}></RenderAdminOptions>


        </div>
    );
}

export default About;    