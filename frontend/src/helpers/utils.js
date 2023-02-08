

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

export {
    calcCrow,
    markerAddressLookup
};

