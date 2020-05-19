import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser())
});




class Main extends Component {

    componentDidMount() {

    }

    render() {
        const HomePage = () => {
            return (
                <Home />
            );
        }
        
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
          );

        return (
            <div>
                <Header auth={this.props.auth} 
                        loginUser={this.props.loginUser}    
                        logoutUser={this.props.logoutUser}/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <PrivateRoute exact path="/home" component={() => <Home/>} />
                            <Redirect to="/home"></Redirect>
                        </Switch>
                    </CSSTransition>


                </TransitionGroup>
                <Footer />

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
