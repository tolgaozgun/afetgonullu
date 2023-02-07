import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"

const NearestHelpCentersList = ({userPosition, helpCenterPositions}) => {
    const [currentLocation, setCurrentLocation] = useState(null)
    const [error, setError] = useState(null)
    
	const handleList = () => {
        const getNearestHelpCenters = async () => {
            if (!currentLocation) {
                setError("Şehir boş bırakılamaz")
                return
            }

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
                error={error}
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