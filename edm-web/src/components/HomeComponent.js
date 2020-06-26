import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselIndicators, CarouselControl, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';
import { NavLink, Link } from 'react-router-dom';

class ImageCarousel extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        }

        this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
    }

    onExiting() {
		this.animating = true;
    }

    onExited() {
		this.animating = false;
	}

	next() {
		if (!this.animating) {
            const nextIndex = this.state.activeIndex === this.props.products.length - 1 ? 0 : this.state.activeIndex + 1;
            this.setState({ activeIndex: nextIndex });
        }
	}
    
    previous() {
		if (!this.animating) {
            const nextIndex = this.state.activeIndex === 0 ? this.props.products.length - 1 : this.state.activeIndex - 1;
            this.setState({
                activeIndex: nextIndex
            });
        }
	}

	goToIndex(newIndex) {
		if (!this.animating) {
            this.setState({
                activeIndex: newIndex
            });
        }
    }
    
    render() {
        if (this.props.productsLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <h1></h1>
                    </div>
                </div>
            );
        } else if (this.props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h1>No le compilo pinche n00b</h1>
                    </div>
                </div>
            );
        } else {
            const images = this.props.products.map((item) => {
                return(
                    <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item}>
                        <img src={baseFrontUrl + item.imageUrl} alt="featured products" />
                    </CarouselItem>
                );
            });

            return (
                <Carousel activeIndex={this.state.activeIndex} next={this.next} previous={this.previous}>
                    <CarouselIndicators items={this.props.products} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                    {images}
                    <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
                    <CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
                </Carousel>
            );
        }
    }
}

function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <ImageCarousel
                    products={props.products}
                    productsLoading={props.isLoading}
                    productsErrMess={props.errMess}
                />
            </div>
            <div className="row col-12 align-items-center justify-content-center">
                <Link to='/galeria'>
                    <Button color="warning">Ordena ahora!</Button>{' '}
                </Link>
                    
            </div>
            <div className="row align-items-center">
                <div className="col-12 col-md-9">
                    <Card>
                        <CardImg
                            className="col-3"
                            src="https://minas.medellin.unal.edu.co/images/minas/equipo/directores-departamento/jndVelas.jpg"
                        />
                        <CardBody className="col">
                            <CardTitle>Jefesito</CardTitle>
                            <CardText>Guzmalsito is here</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home;   