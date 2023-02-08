/* eslint-disable import/no-webpack-loader-syntax */
// // Severity is between 0-5 where 5 is the highest severity
// eslint-disable-next-line import/no-webpack-loader-syntax
import BlueMarker from "../img/squat-marker-blue.png"
import GreenMarker from "../img/squat-marker-green.png"
import GreyMarker from "../img/squat-marker-grey.png"
import OrangeMarker from "../img/squat-marker-orange.png"
import RedMarker from "../img/squat-marker-red.png"
import YellowMarker from "../img/squat-marker-yellow.png"

const calcCrow = (lat1, lon1, lat2, lon2) => 
{
  let R = 6371; // km
  let dLat = toRad(lat2-lat1);
  let dLon = toRad(lon2-lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

const severityMap = {
    "0": "red",
    "1": 'orange',
    "2": "yellow",
    "3": "green",
    "4": "gray",
    "5": "blue",
}

const markerAddressLookup = (severity) => {
    return `../img/marker-pin-${severityMap[severity]}`
}

const getCustomIconColor = (severity) => {
    switch (severity) {
        case "0":
            return "#0000FF"
        case "1":
            return "#808080"
        case "2":
            return "#00FF00"
        case "3":
            return "#FFFF00"
        case "4":
            return "#FFA500"
        case "5":
            return "#FF0000"
        default:
            return "#808080"
        
    }
}

export {
    calcCrow,
    markerAddressLookup,
    getCustomIconColor
}

