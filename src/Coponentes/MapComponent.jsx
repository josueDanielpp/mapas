// src/MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

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
    const [positions, setPositions] = useState([
        { latitud: 51.505, longitud: -0.09 },
        { latitud: 51.51, longitud: -0.1 },
        { latitud: 51.51, longitud: -0.08 }
    ]);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await axios.get('https://api-proxy-ie.onrender.com/location/get_all');
                console.log('response:', response.data);
                if (response.data?.length == 0 || response.data?.length == undefined || response.data?.length == null || !response.data) {
                    return console.log('No data found');
                } else {
                    setPositions(response.data);
                }

            } catch (error) {
                console.error('Error fetching positions:', error);
            }
        };

        fetchPositions();
    }, []);

    return (
        <div style={{ width: "100%" }}>
            <div style={{display:"flex", justifyContent:"center"}}>
                <h1>UBICACIÓN EN EL MAPA</h1>
            </div>

            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {positions?.map((position, index) => (
                    <Marker key={index} position={[position.latitud, position.longitud]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
