import React, { Component } from 'react';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Gallery from './GalleryComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts())
});

class Main extends Component {


    componentDidMount() {
        this.props.fetchProducts();
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));