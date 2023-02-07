import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterMap = ({ lat, lon }) => {
    const map = useMap()
    useEffect(() => {
        map.setView([lat, lon])
    }, [lat, lon])
    return null
}
 
export default RecenterMap;