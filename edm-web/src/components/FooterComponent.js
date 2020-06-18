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
                            <li><Link to="/inicio"> Inicio </Link></li>
                            <li><Link to="/galeria"> Galeria </Link></li>
                            <li><Link to="/acerca-de-nosotros"> Acerca de Nosotros </Link></li>
                            <li><Link to="/contacto"> Contactenos </Link></li>
                        </ul>
                    </div>

                    <div className="col-7 col-sm-5">
                        <h5>Nuestra Dirección</h5>
                        <address>
                            Cra. 76b #107a-34,<br />
                            Santander, Medellín, Antioquia<br />
                            <i className="fa fa-mobile fa-lg"></i>: 312 211 09 79<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="yepesalbeiro800@gmail.com">
                            yepesalbeiro800@gmail.com</a>
                        </address>
                    </div>

                    <div className="col-12 col-sm-4">
                        <div className="text-center">
                            <h5>Conectate con Nosotros</h5>
                            <br></br>
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+" style={{ margin: 5 }}><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id=" style={{ margin: 5 }}><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/" style={{ margin: 5 }}><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/" style={{ margin: 5 }}><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/" style={{ margin: 5 }}><i className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:" style={{ margin: 5 }}><i className="fa fa-envelope-o"></i></a>
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