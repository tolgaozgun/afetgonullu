import { Box, Button, Divider, List, ListItem, ListItemText, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import calcCrow from "../helpers/utils"

const NearestHelpCentersList = ({ userPosition, helpCenterPositions, setView}) => {
    const [selectedLocation, setSelectedLocation] = useState('')
    const [error, setError] = useState(null)
    const [nearestCenters, setNearestCenters] = useState([])

    const createNearestHelpCenters = async (lat, lon) => {
        const distances = []
        for (let i = 0; i < helpCenterPositions.length; i++) {
            const distance = calcCrow(lat, lon, helpCenterPositions[i].geometry.lat, helpCenterPositions[i].geometry.lon)
            distances.push({ 
                title: helpCenterPositions[i].properties.name,
                distance,
            })
        }

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


    useEffect(() => {
        const createBasedOnGeolocation = async() => {
            await createNearestHelpCenters(userPosition.lat, userPosition.lon)
        }
        
        if (userPosition) {
            createBasedOnGeolocation()
            setView({lat: userPosition.lat, lon: userPosition.lon})
        }

    }, [userPosition])
    
	const handleList = async () => {
        if (!selectedLocation) {
            setError("Şehir boş bırakılamaz")
            return null
        }

        const {lat, lon} = await getCoords(selectedLocation)
        setView({ lat, lon })
        await createNearestHelpCenters(lat, lon)
	}

    return (
        <Box>
            <TextField
                error={error !== null}
                helperText={error ? error : ''}
                label="Şehir"
                value={selectedLocation}
                onChange={(event) => {
                    setSelectedLocation(event.target.value)
                }}
            />
            <Button
                onClick={handleList}
            >
                En Yakın Merkezleri Listele
            </Button>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {nearestCenters.map((nc) => (
                    <>
                        <ListItem>
                            <ListItemText primary={nc.title} secondary={`${nc.distance} km`} />
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
        </Box>
    )
}

export default NearestHelpCentersList