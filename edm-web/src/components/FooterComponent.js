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
                            <li><Link to="/inicio" className="link"> Inicio </Link></li>
                            <li><Link to="/galeria" className="link"> Galeria </Link></li>
                            <li><Link to="/acerca-de-nosotros" className="link"> Acerca de Nosotros </Link></li>
                            <li><Link to="/contacto" className="link"> Contactenos </Link></li>
                        </ul>
                    </div>

                    <div className="col-7 col-sm-5">
                        <h5>Nuestra Dirección</h5>
                        <address>
                            Cra. 76b #107a-34,<br />
                            Santander, Medellín, Antioquia<br />
                            <i className="fa fa-mobile fa-lg"></i>: 312 211 09 79<br />
                            <i className="fa fa-envelope fa-lg"></i>: yepesalbeiro800@gmail.com
                        </address>
                    </div>

                    <div className="col-12 col-sm-4">
                        <div className="text-center">
                            <h5>Conectate con Nosotros</h5>
                            <br></br>
                            <a className="btn btn-social-icon btn-facebook" target="_blank" href="https://www.facebook.com/Empapelados-decorativos-112685423470018" style={{ margin: 5 }}><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-instagram" target="_blank" href="https://www.instagram.com/empapelados_decorativos/" style={{ margin: 5 }}><i className="fa fa-instagram"></i></a>
                            <a className="btn btn-social-icon btn-google" target="_blank" href="mailto:" style={{ margin: 5 }}><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-auto">
                        <p>© 2020 Bob's decorative wallpapers Inc. All right reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;