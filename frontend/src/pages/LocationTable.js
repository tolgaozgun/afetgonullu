import {Button, TextField} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Cities from "../il.json"
import Autocomplete from '@mui/material/Autocomplete'
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';


function LocationDataGrid({ onUpdate, onCancel }) {
  const [selectedLocation, setSelectedLocation] = useState('')

  const locations = [
    {
        "id": 4,
        "name": "Gulcimen Aspava",
        "latitude": 39.9276529,
        "longitude": 32.8094168,
        "needs_people": true,
        "needs_donation": true,
        "help_message": "Yardim\\n\r\nYardim2",
        "latest_information_date": "2023-02-07T22:50:47.893307Z",
        "geometry": {
            "lat": 39.9276529,
            "lon": 32.8094168
        },
        "help": {
            "needed": true,
            "message": "Yardim\\n\r\nYardim2"
        },
        "properties": {
            "name": "Gulcimen Aspava"
        }
    },
    {
        "id": 5,
        "name": "Yardim Konumu 1",
        "latitude": 40.1,
        "longitude": 32.8094168,
        "needs_people": true,
        "needs_donation": true,
        "help_message": "Ihtiyac malzemeleri:\r\nBez\r\nMama\r\nGiysi\r\nBot\r\nBattaniye\r\nIsitici",
        "latest_information_date": "2023-02-08T09:34:51.169757Z",
        "geometry": {
            "lat": 40.1,
            "lon": 32.8094168
        },
        "help": {
            "needed": true,
            "message": "Ihtiyac malzemeleri:\r\nBez\r\nMama\r\nGiysi\r\nBot\r\nBattaniye\r\nIsitici"
        },
        "properties": {
            "name": "Yardim Konumu 1"
        }
    }
]

  const columns = [
    { field: "name", headerName: "Name" },
    { field: "latitude", headerName: "Latitude", type: "numeric", editable: true },
    { field: "longitude", headerName: "Longitude", type: "numeric"},
    { field: "needs_people", headerName: "Needs People", type: "boolean" },
    { field: "needs_donation", headerName: "Needs Donation", type: "boolean", editable: true },
    { field: "help_message", headerName: "Help Message", editable: true },
    { field: "severity", headerName: "Severity", type: "numeric", editable: true },
    { field: "latest_information_date", headerName: "Latest Information Date", type: "datetime" },
  ];  

    
    return (
      <>
      <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Cities}
              autoSelect
              fullWidth
              onChange={(event, value, reason, details) => {
                  console.log(value)
                  localStorage.setItem("latest_city", JSON.stringify(value))
              }}
              renderInput={(params) => 
              
              <TextField {...params} 
              label="Şehir"
              value={selectedLocation}
              onChange={(event) => {
                setSelectedLocation(event.target.value)
              }} />}
          />
          <div style={{ display: 'flex', width: "100%", height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                autoHeight
                rows={locations}
                columns={columns}
                editMode="row"
              />
            </div>
        </div>
      </>
    );
  }
    
export default LocationDataGrid;

