import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// eslint-disable-next-line import/no-webpack-loader-syntax
import { getCustomIconColor } from "../helpers/utils";
import ActivePoint from "./ActivePoint";
import "./Map.css";
import RecenterMap from './RecenterMap';

function Map({ markingPoints, center }) {
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
        "severity": "3",
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
                        minWidth={250}
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
                markingPoints.map(point => {
                    const markerColor = getCustomIconColor(point.severity)
                    const markerHtmlStyles = `
                    background-color: ${markerColor};
                        width: 3rem;
                        height: 3rem;
                        display: block;
                        left: -1.5rem;
                        top: -1.5rem;
                        position: relative;
                        border-radius: 3rem 3rem 0;
                        transform: rotate(45deg);
                        border: 1px solid #FFFFFF`

                    const icon = L.divIcon({
                        className: "my-custom-pin",
                        iconAnchor: [0, 24],
                        labelAnchor: [-6, 0],
                        popupAnchor: [0, -36],
                        html: `<span style="${markerHtmlStyles}" />`
                    })
                    return (
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
                            icon={icon}
                        />
                    )}
                )
            }
            <RecenterMap center={center}/>
        </MapContainer>
    );
}

export default Map;