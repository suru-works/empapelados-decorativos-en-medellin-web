import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-4 col-sm-2">
                        <h5>Navegar</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/inicio" className="link" style={{color: '#FFFFFF' }}> Inicio </Link></li>
                            <li><Link to="/galeria" className="link" style={{color: '#FFFFFF' }}> Galeria </Link></li>
                            <li><Link to="/acerca-de-nosotros" className="link" style={{color: '#FFFFFF' }}> Acerca de Nosotros </Link></li>
                            <li><Link to="/contacto" className="link" style={{color: '#FFFFFF' }}> Contactenos </Link></li>
                        </ul>
                    </div>

                    <div className="col-7 col-sm-5">
                        <h5>Nuestra Dirección</h5>
                        <address style={{color: '#FFFFFF' }}>
                            Calle 20 sur # 37 - 228.<br />
                                Sector los yarumos, Poblado, Medellín, Antioquia<br />
                            <i className="fa fa-mobile fa-lg"></i>: 319 582 31 66<br />
                            <i className="fa fa-mobile fa-lg"></i>: 301 207 15 91<br />
                            <i className="fa fa-envelope fa-lg"></i>: yepesalbeiro800@gmail.com
                        </address>
                    </div>

                    <div className="col-12 col-sm-4">
                        <div className="text-center">
                            <h5>Conéctate con Nosotros</h5>
                            <br></br>
                            <a className="btn btn-social-icon btn-facebook" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Empapelados-decorativos-112685423470018" style={{ margin: 5 }}><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-instagram" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/empapelados_decorativos/" style={{ margin: 5 }}><i className="fa fa-instagram"></i></a>
                            <a className="btn btn-social-icon btn-google" target="_blank" rel="noopener noreferrer" href="mailto:" style={{ margin: 5 }}><i className="fa fa-envelope-o"></i></a>
                            <a className="btn btn-social-icon btn-whatsapp " aria-hidden="true" rel="noopener noreferrer" target="_blank" href="https://wa.me/573122110979" style={{ margin: 5 }}><i className="fa fa-whatsapp"></i></a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-auto">
                        <p>© 2020 empapelados decorativos en medellin. todos los derechos reservados.</p>
                        <p>desarrollado por suruworks.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;