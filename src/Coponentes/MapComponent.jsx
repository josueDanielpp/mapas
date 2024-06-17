// src/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Ajuste para los íconos de Leaflet con React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadowUrl,
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
    const position = [51.505, -0.09]; // Coordenadas de ejemplo

    return (
        <div style={{width:"100%"}}>
            <h1>Ubicacion espacioal con GPS en tiempo real</h1>
            <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>

    );
};

export default MapComponent;
