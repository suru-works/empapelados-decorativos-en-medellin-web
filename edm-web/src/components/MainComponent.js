import React, { Component } from 'react';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Gallery from './GalleryComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { connect } from 'react-redux';
import { fetchProducts, fetchMapsKey, login, register } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        products: state.products,
        maps: state.maps
    }
};
const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchMapsKey: () => dispatch(fetchMapsKey()),
    login: (credentials) => dispatch(login(credentials)),
    register:(user) => dispatch(register(user))
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
        const ContactPage = () => {
            return (
                <Contact 
                    mapsKey={this.props.maps.maps.key}
                />
            )
        }

        return (
            <div>
                <Header loginFunction={this.props.login} registerFunction={this.props.register}/>
                <Switch>
                    <Route path="/inicio" component={HomePage} />
                    <Route path="/galeria" component={GalleryPage} />
                    <Route exact path='/acerca-de-nosotros' component={() => <About />} />
                    <Route exact path='/contacto' component={ContactPage} />
                    <Redirect to="/inicio"></Redirect>
                </Switch>
                <Footer />

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));