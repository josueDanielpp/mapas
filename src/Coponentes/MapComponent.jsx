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
        { latitud: 21.913456439561106, longitud: -102.31692698970566 },
        { latitud: 21.877062744222176, longitud: -102.30173232412855 },
        { latitud: 21.79458755788709, longitud: -102.37002223243829 }
    ]);

    // {
    //     "longitud": "-102.31692698970566",
    //     "latitud": "21.913456439561106"
    //   },
    //   {
    //     "longitud": "-102.30173232412855",
    //     "latitud": "21.877062744222176"
    //   },
    //   {
    //     "longitud": "-102.37002223243829",
    //     "latitud": "21.79458755788709"
    //   }
    

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/location/get_all');
                var locations = response.data.data;
                console.log('locations:', locations);
                console.log('locations.length', locations.length);
                if (locations.length == 0 || locations.length == undefined || locations.length == null || !locations) {
                    return console.log('No data found');
                } else {
                    setPositions(locations);
                }

            } catch (error) {
                console.error('Error fetching positions:', error);
            }
        };
        setInterval(fetchPositions, 60000);
        fetchPositions();
    }, []);

    return (
        <div style={{ width: "100%" }}>
            <div style={{display:"flex", justifyContent:"center"}}>
                <h1>UBICACIÓN EN EL MAPA</h1>
            </div>

            <MapContainer center={[21.913456439561106, -102.31692698970566]} zoom={13} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {positions&&positions?.map&&positions.map((position, index) => (
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
