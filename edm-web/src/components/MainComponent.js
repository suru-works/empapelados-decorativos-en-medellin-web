import React, { Component } from 'react';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {


    componentDidMount() {
        
    }

    render() {
        
        return (
            <div>
                <Header />
                                            
                <Footer />

            </div>
        );
    }
}

export default Main;