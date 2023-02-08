import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Grid, Checkbox } from "@mui/material"
import { useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import calcCrow from "../helpers/utils"
import "./NearestHelpCentersList.css"
import Cities from "../il.json"
import Counties from "../ilce.json"
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import RecenterMap from "./RecenterMap"

const NearestHelpCentersList = ({ userPosition, helpCenterPositions, setMapView, setCenter}) => {
    const [selectedLocation, setSelectedLocation] = useState('')
    const [error, setError] = useState(null)
    const [nearestCenters, setNearestCenters] = useState([])
    const [needPeople, setNeedPeople] = useState(true)
    const [needDonation, setNeedDonation] = useState(true)

    const createNearestHelpCenters = async (lat, lon) => {
        const distances = []
        for (let i = 0; i < helpCenterPositions.length; i++) {
            const distance = calcCrow(lat, lon, helpCenterPositions[i].geometry.lat, helpCenterPositions[i].geometry.lon)
            distances.push({ 
                title: helpCenterPositions[i].properties.name,
                distance,
            })
        }

        setMapView(lat, lon)
        setNearestCenters(distances.sort((a, b) => a.distance - b.distance))
    }

    const getCoords = async (cityName) => {
        if (!cityName) {
            setError("Şehir boş bırakılamaz")
            return null
        }

        const url = `http://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
        const response = await fetch(url)
        const data = await response.json()
        
        if (!data || !data[0] || !data[0].lon || !data[0].lat) {
            setError("Şehir verisi bulunamadı")
            return null
        }
        return { lat: data[0].lat, lon: data[0].lon }
    }

    const center = (lat, long) => {
        // const map = useMap()
        // map.setView([lat,long])
        setCenter([lat,long])
        
    }



    useEffect(() => {
        const createBasedOnGeolocation = async() => {
            await createNearestHelpCenters(userPosition.lat, userPosition.lon)
        }
        
        if (userPosition) {
            createBasedOnGeolocation()
        }

    }, [userPosition])
    
	const handleList = async (selectedLocation) => {
        if (!selectedLocation) {
            setError("Şehir boş bırakılamaz")
            return null
        }

        const {lat, lon} = await getCoords(selectedLocation)
        await createNearestHelpCenters(lat, lon)
	}

    return (
        <Box alignItems="center" justifyItems="center" 
            direction="row"
            spacing={0}
            sx={{p:1}}>
            <Grid container direction="row" alignItems="center" justify="center" spacing={2}>
                <Grid item xs={8}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={Cities}
                        autoSelect
                        fullWidth
                        onChange={(event, value, reason, details) => {
                            console.log(value)
                            localStorage.setItem("latest_city", JSON.stringify(value))
                            center(value.lat, value.lon)
                        }}
                        renderInput={(params) => 
                        
                        <TextField {...params} 
                        error={error !== null}
                        helperText={error ? error : ''}
                        label="Şehir"
                        value={selectedLocation}
                        onChange={(event) => {
                            setSelectedLocation(event.target.value)
                            handleList(event.target.value)
                            // RecenterMap(event.)
                        }} />}
                    />
                </Grid>
                <Grid item xs={4} >
                    <FormControlLabel control={<Checkbox onChange={(event) => {
                        setNeedPeople(event.target.checked)
                    }} defaultChecked />} label="Gönüllü isteyenleri filtrele" />
                    <FormControlLabel control={<Checkbox onChange={(event) => {
                        setNeedDonation(event.target.checked)
                    }}/>} label="Yardım isteyenleri filtrele" />
                </Grid>
            </Grid>
            {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {nearestCenters.map((nc) => (
                    <>
                        <ListItem>
                            <ListItemButton>
                                <ListItemText primary={nc.title} secondary={`${nc.distance} km`} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List> */}
        </Box>
    )
}

export default NearestHelpCentersList