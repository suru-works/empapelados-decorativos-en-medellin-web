import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';




function RenderGallery ({product}) {
    return (
        <Card bg= "secondary"
        text= "secondary">
            

            <CardBody>
                <CardTitle>{product.name}</CardTitle>


                <CardImg width="100%" src={baseFrontUrl + product.imageUrl} alt={product.name} />


                <CardText>  {product.description}  </CardText>
                <CardText>  Precio: {product.price}  </CardText>
                <CardText>  Unidades: {product.units}  </CardText>
                <CardText>  CÓMPRALO YA ANTES DE QUE HAYA INFLACIÓN  </CardText>
            </CardBody>
        </Card>
    );
}

const Gallery = (props) => {

    const gallery = props.products.map((product) => {
        return (
            <div className="col-12 col-md-5 m-1"  key={product.id}>
                <RenderGallery product={product}/>
            </div>
        );
    });

    if (props.products.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.products.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.products.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else

    return (
        <div className="container">
            <div className="row">
                
                <div className="col-12">
                    <h3>Galeria chaval</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                {gallery}
            </div>
        </div>
    );
}

export default Gallery;   