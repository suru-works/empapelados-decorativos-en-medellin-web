import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button
} from 'reactstrap';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { baseFrontUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import LoginComponent from './LoginComponent.js';
import LogOutComponent from './LogOutComponent.js';
import RegisterComponent from './RegisterComponent.js';


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false,
            isLogoutModalOpen: false,
            isRegisterModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleLogoutModal = this.toggleLogoutModal.bind(this);
        this.renderAuthOptions = this.renderAuthOptions.bind(this);
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

    toggleLogoutModal() {
        this.setState({
            isLogoutModalOpen: !this.state.isLogoutModalOpen
        });
    }

    renderAuthOptions() {
        if (this.props.auth.isLoading) {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Loading></Loading>
                    </NavItem>
                </Nav>
            );
        } else if (localStorage.getItem('token')) {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <p>{localStorage.username}</p>
                    </NavItem>
                    <NavItem>
                        <Button outline style={{ margin: 10, borderColor: '#f9683a', color: '#f9683a' }} onClick={this.toggleLogoutModal}>
                            <span className="fa fa-sign-in"> Cerrar sesión </span>
                        </Button>
                    </NavItem>
                </Nav>
            );
        } else {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline style={{ margin: 10, borderColor: '#f9683a', color: '#f9683a' }} onClick={this.toggleLoginModal}>
                            <span className="fa fa-sign-in"> Iniciar sesión </span>
                        </Button>
                    </NavItem>

                    <NavItem>
                        <Button variant="contained" style={{ margin: 10, backgroundColor: '#f9683a', color: '#ffffff' }} color="secondary" onClick={this.toggleRegisterModal}>
                            <span className="fa fa-user-circle-o" aria-hidden="true"> Regístrate </span>
                        </Button>
                    </NavItem>
                </Nav>
            );
        }
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

                            {this.renderAuthOptions()}
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
                                    <Button style={{ backgroundColor: '#f9683a', color: '#ffffff' }} variant="contained">
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
                
                <RegisterComponent isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}/>                             
                <LoginComponent isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}/>
                <LogOutComponent isOpen={this.state.isLogoutModalOpen} toggle={this.toggleLogoutModal}/>

                
            </div>
        );
    }
}
export default Header;