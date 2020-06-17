import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + "Password: " + this.password.value + " Remember" + this.remember.checked)
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />

                        <NavbarBrand className="mr-auto" href="/"><img src='' height="" width="" alt='' /></NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/inicio'><span className="fa fa-home fa-lg"></span> Inicio </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to='/galeria'><span className="fa fa-info fa-lg"></span> Galeria </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to='/acerca-de-nosotros'><span className="fa fa-list fa-lg"></span> Acerca de Nosotros </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to='/contacto'><span className="fa fa-address-card fa-lg"></span> Contactenos </NavLink>
                                </NavItem>
                            </Nav>

                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline style={{ margin: 10 }} onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"> Login </span>
                                    </Button>
                                </NavItem>

                                <NavItem>
                                    <Button variant="contained" style={{ margin: 10 }} color="secondary">
                                        Sign In
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Jumbotron jumbo>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Empapelados Decorativos en Medellin.</h1>
                                <p>Venta e instalación de empapelados decorativos, cortinas y pinturas.</p>
                                <h3>Tenemos mas de 30 años de experiencia.</h3>
                                <br></br>
                                <Button variant="contained" color="primary">
                                    Aprende más
                                </Button>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>

                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember me
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