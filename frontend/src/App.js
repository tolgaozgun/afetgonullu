// https://www.tecforfun.com/frameworks/how-to-integrate-openstreetmap-into-react-apps/

import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
export default function App() {
	const [markingPoints, setMarkingPoints] = useState([])
	const [currentPosition, setCurrentPosition] = useState({})

	// Fetch points from the database
	const options = {
	  enableHighAccuracy: true,
	  maximumAge: 30000,
	  timeout: 27000
	};
	
	function error(err) {
	  if (
		err.code === 1 || //if user denied accessing the location
		err.code === 2 || //for any internal errors
		err.code === 3 //error due to timeout
	  ) {     
		alert(err.message);
	  } else {
		alert(err);
	  }
	}
	
	useEffect(() => {
		// Get and set the current position of the user
		const setCurrentPosition = (position) => {
			setCurrentPosition({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			})
		}
		navigator.geolocation.getCurrentPosition(
			setCurrentPosition,
			error,
			options
		)
		
		// Get the help centers from the API
		const getMarkingPoints = async () => {
			const response = await fetch('/')
			const data = response.json()
			console.log(data)
		}

		getMarkingPoints()
	}, [])


  // //send the data on the state to the API
  // function getData(url) {
  //   fetch(url, {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Access-Control-Allow-Origin": "https://www.afetgonullu.com.tr"
  //     }
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       setName(data[0].display_name);
  //       setCorrds({
  //         latitude: data[0].lat,
  //         longitude: data[0].lon
  //       });
  //     })
  //     .catch(() => error("Please Check your input"));
  // }

  // //set form input( data entered ) to state on form submit
  // function submitHandler(e) {
  //   e.preventDefault();
  //   console.log(address);

  //   let url = `https://nominatim.openstreetmap.org/search?
  //     street=${address.street}
  //     &city=${address.city}
  //     &country=Turkey`

  //   getData(url);
  // }

  return (
    <div className="App">
      <Map 
	  	markingPoints={markingPoints}
		center={currentPosition}
	  />
    </div>
  );
}