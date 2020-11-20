import {GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import React from 'react';

function Map(){ 
  return (
    <GoogleMap 
    defaultZoom={10} 
    defaultCenter={{lat: 39.103119, lng:-84.512016 }} 
    /> 
  )
}
const WrappedMap = withScriptjs(withGoogleMap(Map));


function Mapp() {
  return (
    <div style={{width: "50vw", height: "50vh"}} className="mx-auto">
    <WrappedMap googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key={key}'}
    loadingElement={<div style={{ height: "100%"}} />}
    containerElement={<div style={{ height: "100%"}} />}
    mapElement={<div style={{ height: "100%"}} />}
    />
    </div>
  );
}

export default Mapp;
