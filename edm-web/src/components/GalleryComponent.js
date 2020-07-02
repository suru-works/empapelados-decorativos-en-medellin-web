import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseFrontUrl } from '../shared/baseUrl';

function RenderGallery ({product}) {
    return (

        //si quiere que sea cada carta de un ancho especifico ponerle de estilo a la card   style={{ width: '22rem' }}  , pero no es adaptativo
        //mas que todo lo uso para hacer pruebas de que si salga X cards en tal pantalla

        <Card>
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
            <div className="col-12 col-lg-3 col-md-4 col-sm-6"  key={product.id}>
                <RenderGallery product={product}/>
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Galeria que se adapta a tu pantalla</h3>
                    <hr />
                </div>                
            </div>
            <div className="row col-12">
                {gallery}
            </div>
        </div>

    );

    
}

export default Gallery;   