import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';



const Map = ({withMarker, zoom, center}) => {

    return (
        <GoogleMap zoom={zoom} center={center}>

            {
                withMarker && (<Marker position={center} />)
            }
        </GoogleMap>
    )
}

export default withScriptjs(withGoogleMap(Map));