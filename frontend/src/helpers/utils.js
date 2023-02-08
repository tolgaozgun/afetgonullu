// // Severity is between 0-5 where 5 is the highest severity
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
    getCustomIconColor,
};

