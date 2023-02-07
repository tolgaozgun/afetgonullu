import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Map from "../components/Map";
import NearestHelpCentersList from '../components/NearestHelpCentersList';

const HelpCenters = () => {
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
			const response = await fetch('/api/locations')
			const data = await response.json()
			console.log(data)
			setMarkingPoints(data)
		}

		getMarkingPoints()
	}, [])


	return (
		<div>
			<NearestHelpCentersList />
			<Map
				markingPoints={markingPoints}
				center={currentPosition}
			/>
		</div>
	);
}

export default HelpCenters