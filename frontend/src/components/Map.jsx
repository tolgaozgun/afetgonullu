import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import RedMarker from "../img/squat-marker-red.svg";
import ActivePoint from "./ActivePoint";
import "./Map.css";
import RecenterMap from './RecenterMap';

function Map({ markingPoints, center }) {
    // markingPoints is an 
    const [activePoint, setActivePoint] = useState(null)

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
                    const icon = new L.icon({
                        iconUrl: RedMarker,
                        iconRetinaUrl: RedMarker,
                        iconAnchor: null,
                        popupAnchor: null,
                        shadowUrl: null,
                        shadowSize: null,
                        shadowAnchor: null,
                        iconSize: new L.Point(60, 75),
                        className: 'leaflet-div-icon'
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