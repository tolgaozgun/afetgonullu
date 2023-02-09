import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { getCustomIconColor } from "../../helpers/utils";
import ActivePoint from "../ActivePoint";
import "./Map.css";
import RecenterMap from '../RecenterMap';

function Map({ markingPoints, center, zoom }) {
    // markingPoints is an 
    const [activePoint, setActivePoint] = useState(null)
    
    useEffect(() => {
        setActivePoint(null)
    }, [markingPoints])

    return (
        <MapContainer 
            center={center} 
            zoom={zoom}>
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
                        eventHandlers={{
                            remove: (e) => {
                                setActivePoint(null)
                            }
                        }}
                    >   
                        <ActivePoint {...activePoint} />
                    </Popup>
                )
            }
            { markingPoints &&
                markingPoints.map(point => {
                    const markerColor = getCustomIconColor(point.severity.toString())
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