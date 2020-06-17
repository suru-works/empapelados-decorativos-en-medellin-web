import React, { Component } from 'react';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Gallery from './GalleryComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

class Main extends Component {


    componentDidMount() {

    }

    render() {

        const HomePage = () => {
            return (
                <Home />
            );
        }

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/inicio" component={HomePage} />
                    <Route path="/galeria" component={() => <Gallery />} />
                    <Route exact path='/acerca-de-nosotros' component={() => <About />} />
                    <Route exact path='/contacto' component={() => <Contact />} />
                    <Redirect to="/inicio"></Redirect>
                </Switch>
                <Footer />

            </div>
        );
    }
}

export default Main;