import React, {useState}from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
function RenderAdminOptions(props) {


    if (localStorage.getItem('admin')) {
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

function About(props) {

    const [isAddLeaderModalOpen, setIsAddLeaderModalOpen] = useState(false);
    const [areEditOptionsActived, setAreEditOptionsActived] = useState(false);

    const toggleAddLeaderModal = () => {
        setIsAddLeaderModalOpen(!isAddLeaderModalOpen);
    }

    const openEditOptions = () => {
        setAreEditOptionsActived(!areEditOptionsActived);
    }

    return (
        <div className="container">
            <RenderAdminOptions toggleAddLeaderModal={toggleAddLeaderModal} openEditOptions={openEditOptions}></RenderAdminOptions>
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
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>

                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Cualidades que nos distinguen</CardHeader>
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

            <div className="row row-content">
                <div className="col-12">
                    <h2>Lideres de nuestra compa­ñia</h2>
                </div>
                <div className="col-12">
                    <Media list>
                        {}
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    