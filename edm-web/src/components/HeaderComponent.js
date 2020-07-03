import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { baseFrontUrl } from '../shared/baseUrl';



class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false,
            isRegisterModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleRegisterModal() {
        this.setState({
            isRegisterModalOpen: !this.state.isRegisterModalOpen
        });
    }

    toggleLoginModal() {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }

    handleRegister(event) {
        var registerOptions = {
            username: this.email.value,
            password: this.password.value,
            admin: false,
            name: this.name.value,
            phoneNumber: this.phoneNumber.value

        }
        console.log("estas son las register options");
        console.log(registerOptions);
        this.props.registerFunction(registerOptions);
        this.toggleRegisterModal();
        event.preventDefault();
    }

    

    handleLogin(event) {
        var loginOptions = {
            username: this.email.value,
            password: this.password.value
        }
        //this.testLogin(loginOptions);
        this.props.loginFunction(loginOptions);
        this.toggleLoginModal();
        event.preventDefault();
    }

    render() {
        const colors = {
            primary: '#870000'
        };
        return (
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />

                        <NavbarBrand className="mr-auto" href="/"><img src={baseFrontUrl + "public/logo/shortwhiteLogoTransparent.png"} height="46" width="41" alt="small-company-logo" /></NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/inicio'><span className="fa fa-home fa-lg"></span> Inicio </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to='/galeria'><span className="fa fa-list fa-lg"></span> Galeria </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to='/acerca-de-nosotros'><span className="fa fa-info fa-lg"></span> Acerca de Nosotros </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to='/contacto'><span className="fa fa-address-card fa-lg"></span> Contáctanos </NavLink>
                                </NavItem>
                            </Nav>

                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline style={{ margin: 10, borderColor: '#f9683a',color: '#f9683a'  }} onClick={this.toggleLoginModal}>
                                        <span className="fa fa-sign-in"> Iniciar sesión </span>
                                    </Button>
                                </NavItem>

                                <NavItem>
                                    <Button variant="contained" style={{ margin: 10,backgroundColor: '#f9683a', color: '#ffffff' }} color="secondary" onClick={this.toggleRegisterModal}>
                                        <span className="fa fa-user-circle-o" aria-hidden="true"> Regístrate </span>
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Jumbotron jumbo='true'>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Empapelados Decorativos en Medellin.</h1>
                                <p>Venta e instalación de empapelados decorativos, cortinas y pinturas.</p>
                                <h3>Tenemos mas de 30 años de experiencia.</h3>
                                <br></br>

                                <Link to='/acerca-de-nosotros'>
                                    <Button style={{ backgroundColor: '#f9683a', color: '#ffffff'}} variant="contained">
                                        Aprende más
                                    </Button>
                                </Link>
                            </div>
                            <div className="ml-auto">

                                {window.innerWidth > 768 && (
                                    <img className="float-right" height="312" width="163" src={baseFrontUrl + "public/logo/blackLogo.png"} alt="company-logo"></img>
                                )
                                }

                            </div>
                        </div>

                    </div>
                </Jumbotron>

                <Modal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}>
                    <ModalHeader toggle={this.toggleRegisterModal}>Registro</ModalHeader>

                    <ModalBody>
                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Contraseña*</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="name">Nombre</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="phoneNumber">Número de teléfono</Label>
                                <Input type="text" id="phoneNumber" name="phoneNumber"
                                    innerRef={(input) => this.phoneNumber = input} />
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Registrarse</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Ingresar</ModalHeader>

                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Contraseña</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Recuerdame
                                </Label>
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default Header;