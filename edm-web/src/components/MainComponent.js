import React, { Component } from 'react';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Gallery from './GalleryComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Forgot from './ForgotComponent';
import { connect } from 'react-redux';
import { fetchProducts, fetchLeaders, fetchMapsKey, login, register, logout, postFeedback, authenticated,postProduct, deleteProduct,
        postLeader, deleteLeader } from '../redux/ActionCreators';
import { baseBackUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        products: state.products,
        leaders: state.leaders,
        maps: state.maps,
        auth: state.auth
    }
};
const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchMapsKey: () => dispatch(fetchMapsKey()),
    login: (credentials) => dispatch(login(credentials)),
    register: (user) => dispatch(register(user)),
    logout: () => dispatch(logout()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    postProduct: (product) => dispatch(postProduct(product)),
    deleteProduct: (productId) => dispatch(deleteProduct(productId)),
    postLeader: (leader) => dispatch(postLeader(leader)),
    deleteLeader: (leaderId) => dispatch(deleteLeader(leaderId))
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchLeaders();
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
                    postProduct={this.props.postProduct}
                    products={this.props.products.products}
                    productsLoading={this.props.products.isLoading}
                    productsErrMess={this.props.products.errMess}
                    deleteProduct={this.props.deleteProduct}
                    reloadData={this.props.fetchProducts}
                />
            );
        }
        const ContactPage = () => {
            return (
                <Contact 
                    feedbackSubmitFunction={this.props.postFeedback}
                />
            )
        }

        const AboutPage = () => {
            return (
                <About 
                    postLeader={this.props.postLeader}
                    leaders={this.props.leaders.leaders}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                    deleteLeader={this.props.deleteLeader}
                    reloadData={this.props.fetchLeaders}
                />
            )
        }

        return (
            <div>
                <Header
                    auth={this.props.auth}
                    loginFunction={this.props.login}
                    registerFunction={this.props.register}
                    logoutFunction={this.props.logout}
                />
                <Switch>
                    <Route path="/inicio" component={HomePage} />
                    <Route path="/restablecer-contraseña/:token" component={() => <Forgot/>} />
                    <Route path="/galeria" component={GalleryPage} />
                    <Route exact path='/acerca-de-nosotros' component={AboutPage} />
                    <Route exact path='/contacto' component={ContactPage} />
                    <Redirect to="/inicio"></Redirect>
                </Switch>
                <Footer />

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));