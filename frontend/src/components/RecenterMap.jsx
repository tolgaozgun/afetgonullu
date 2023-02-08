import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterMap = ({ center }) => {
    const map = useMap()
    useEffect(() => {
        if(center !== undefined){
            map.setView(center)
            map.setZoom(12)
        }
    }, [center])
    return null
}
 
export default RecenterMap;