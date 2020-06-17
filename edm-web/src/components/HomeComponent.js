import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselIndicators, CarouselControl, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

const items = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/368px-Adobe_Premiere_Pro_CC_icon.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/180px-Adobe_Photoshop_CC_icon.svg.png"
]

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
            const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
            this.setState({ activeIndex: nextIndex });
        }
	}
    
    previous() {
		if (!this.animating) {
            const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
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
        const images = items.map((item) => {
            return(
                <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item}>
                    <img src={item} alt="puto el que lo lea" />
                </CarouselItem>
            );
        });

        return (
            <Carousel activeIndex={this.state.activeIndex} next={this.next} previous={this.previous}>
                <CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                {images}
                <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
				<CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
            </Carousel>
        );
    }
}

function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <ImageCarousel />
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
                <div className="col-12 col-md">
                    
                </div>
            </div>
        </div>
    )
}

export default Home;   