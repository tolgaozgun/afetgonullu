import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ActivePoint from "./ActivePoint";
import "./Map.css";
import RecenterMap from './RecenterMap';

function Map({ markingPoints, mapView, center }) {
    // markingPoints is an 
    const [activePoint, setActivePoint] = useState(null)

    markingPoints = [{
        "id": 4,
        "name": "Gulcimen Aspava",
        "latitude": 39.9276529,
        "longitude": 32.8094168,
        "needs_people": true,
        "needs_donation": true,
        "help_message": "Yardim",
        "latest_information_date": "2023-02-07T22:50:47.893307Z",
        "geometry": {
            "lat": 39.9276529,
            "lon": 32.8094168
        },
        "help": {
            "needed": true,
            "message": "Yardim"
        },
        "properties": {
            "name": "Gulcimen Aspava"
        }
    }]

    return (
        <MapContainer center={center} zoom={7} zoomSettings={{ enable: true, toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'] }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {
                activePoint && (
                    <Popup
                        position={[
                            activePoint.geometry.lat,
                            activePoint.geometry.lon,
                        ]}
                        onClose={() => {
                            setActivePoint(null)
                        }}
                    >   
                        <ActivePoint {...activePoint} />
                    </Popup>
                )
            }
            {
                markingPoints.map(point => (
                    <Marker
                        key={point.id}
                        position={
                            [
                                point.geometry.lat,
                                point.geometry.lon
                            ]
                        }
                        eventHandlers={{
                            click: (e) => {
                                setActivePoint(point)
                            },
                        }}
                />
                ))
            }
            <RecenterMap center={center}/>
        </MapContainer>
    );
}

export default Map;