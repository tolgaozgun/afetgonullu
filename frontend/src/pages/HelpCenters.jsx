import { Box, Button, Grid, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Map from "../components/Map";
import NearestHelpCentersList from '../components/NearestHelpCentersList';

const HelpCenters = () => {
    const [helpCenters, setHelpCenters] = useState([])
	const [currentPosition, setCurrentPosition] = useState(null) // Position of
	const [mapView, setMapView] = useState(null)
	const [center, setCenter] = useState([39.028, 33.882])
	const [selectedCity, setSelectedCity] = useState({})

	
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
		// alert(err.message);
	  } else {
		// alert(err);
	  }
	}
	
	useEffect(() => {
		// Get and set the current position of the user
		const setGeolocation = (position) => {
			setCurrentPosition({
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			})
		}
		navigator.geolocation.getCurrentPosition(
			setGeolocation,
			error,
			options
		)
		
		// Get the help centers from the API
		const getMarkingPoints = async () => {
			// const response = await fetch('http://127.0.0.1:8000/api/locations')
			const response = await fetch('/api/locations')

			const data = await response.json()
			console.log(data)
			setHelpCenters(data)
		}

		getMarkingPoints()

		const latest_city = localStorage.getItem("latest_city", null)

		if(latest_city !== null){
			let city_json = JSON.parse(latest_city)
			setCenter([city_json.lat, city_json.lon])
		}

	}, [])


	return (
		<Stack>
			<NearestHelpCentersList 
				userPosition={currentPosition}
				helpCenterPositions={helpCenters}
				setMapView={setMapView}
				setCenter={setCenter}
				/>
			<Map
				markingPoints={helpCenters}
				mapView={mapView}
				center={center}
				/>
		</Stack>
	);
}

export default HelpCenters