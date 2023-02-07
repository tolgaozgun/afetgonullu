import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "./Map.css";

function Map({ markingPoints, center }) {
    // markingPoints is an 
    const [activePoint, setActivePoint] = useState(null)
    if (markingPoints.length === 0) {
        return <h1>Trouble accessing help center data</h1>
    }
    
    return (
        <MapContainer center={center || [37.579764350000005,36.93069649570153]} zoom={12} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {
                markingPoints.map(point => {
                    <Marker
                        key={point.id}
                        position={
                            [
                                point.geometry.lat,
                                point.geometry.lon
                            ]
                        }
                        onClick={() => {
                            setActivePoint(point)
                        }}
                    />
                })
            }
        </MapContainer>
    );
}

export default Map;

// [{
//         geometry: {
//             lat: Number,
//             lon: Number,
//         },
//         help: {
//             needed: Boolean,
//             message: String,
//         }
//         latestInformationDate: Date
//     }],
