import React from 'react';
import {GoogleMap,withScriptjs, withGoogleMap, Marker} from 'react-google-maps';



const Map = (props)=>{
    return (
        <GoogleMap zoom={props.zoom} center={props.center}>
            {props.withMarker ? null :(
                <Marker position={props.center}/>
            )
        }
        </GoogleMap>
    )
}

export default withScriptjs(withGoogleMap(Map));