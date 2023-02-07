import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"

const NearestHelpCentersList = ({userPosition, helpCenterPositions}) => {
    const [currentLocation, setCurrentLocation] = useState('')
    
	const handleList = () => {
        const getNearestHelpCenters = async () => {
            const url = `http://nominatim.openstreetmap.org/search?city={currentLocation}&format=json`
            const response = await fetch(url)
            const data = await response.json()
            
            console.log(data)
        }

        getNearestHelpCenters()
	}

    return (
        <Box>
            <TextField
                label="Şehir"
                value={currentLocation}
                onChange={setCurrentLocation}
            />
            <Button
                onClick={handleList}
            >
                En Yakın Merkezleri Listele
            </Button>
        </Box>
    )
}