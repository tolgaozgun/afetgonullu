import { Box, Button, Checkbox, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, TextField } from "@mui/material"
import Autocomplete from '@mui/material/Autocomplete'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useEffect, useState } from "react"
import { calcCrow } from "../helpers/utils"
import Cities from "../il.json"
import Counties from "../ilce.json"
import FilterDrawerContent from './FilterDrawerContent'
import "./NearestHelpCentersList.css"
 
const NearestHelpCentersList = ({ 
    userPosition, 
    helpCenterPositions, 
    setCenter, 
    setFilteredNearestCenters,
    needPeopleFilter,
    setNeedPeopleFilter,
    needDonationFilter,
    setNeedDonationFilter
}) => {
    const [selectedLocation, setSelectedLocation] = useState('')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
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

        setCenter([lat, lon])
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

    useEffect(() => {
        console.log(helpCenterPositions)
        const unfilteredCenters = [...helpCenterPositions]
        const filteredCenters = unfilteredCenters.filter((c) => {
            console.log(c)
            if (needPeopleFilter && needDonationFilter) {
                return c.needs_people && c.needs_donation
            }
            else if (needPeopleFilter) {
                return c.needs_people
            }
            else if (needDonationFilter) {
                return c.needs_donation
            }
            else {
                return true
            }
        })
        console.log(filteredCenters)
        setFilteredNearestCenters(filteredCenters)
    }, [needPeopleFilter, needDonationFilter])

    return (
        <Box alignItems="center" justifyItems="center" 
            direction="row"
            spacing={0}
            sx={{
                p:1,
                top: "10px",
                left: "50%",
                marginLeft: "-25%",
                minWidth: "50%",
                position: "fixed",
                zIndex: "9999"
            }}>
            <Autocomplete
                style={{
                    backgroundColor: "white",
                }}
                disablePortal
                id="combo-box-demo"
                options={Cities}
                // autoSelect
                fullWidth
                onChange={(event, value, reason, details) => {
                    console.log(value)
                    localStorage.setItem("latest_city", JSON.stringify(value))
                    center(value.lat, value.lon)
                }}
                renderInput={(params) => 
                
                <TextField {...params} 
                    // error={error !== null}
                    // helperText={error ? error : ''}
                    label="Şehir"
                    value={selectedLocation}
                    onChange={(event) => {
                        setSelectedLocation(event.target.value)
                        handleList(event.target.value)
                    }} />}
                />
                <IconButton 
                    size="large"
                    onClick={() => setIsDrawerOpen(true)}
                >

                </IconButton>
                <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                >
                    <FilterDrawerContent />
                </Drawer>
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