import React, { Component } from 'react';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Gallery from './GalleryComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { connect } from 'react-redux';
import { fetchProducts, fetchMapsKey } from '../redux/ActionCreators';
const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchMapsKey: () => dispatch(fetchMapsKey())
});

class Main extends Component {


    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchMapsKey();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    products={this.props.products.products}
                    productsLoading={this.props.products.isLoading}
                    productsErrMess={this.props.products.errMess}
                />
            );
        }

        const GalleryPage = () => {
            return (
                <Gallery
                    products={this.props.products.products}
                    productsLoading={this.props.products.isLoading}
                    productsErrMess={this.props.products.errMess}
                />
            );
        }
        const AboutPage = () => {
            return (
                <About 
                    mapsKey={this.props.maps.key}
                />
            )
        }

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/inicio" component={HomePage} />
                    <Route path="/galeria" component={GalleryPage} />
                    <Route exact path='/acerca-de-nosotros' component={() => <AboutPage />} />
                    <Route exact path='/contacto' component={() => <Contact />} />
                    <Redirect to="/inicio"></Redirect>
                </Switch>
                <Footer />

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));