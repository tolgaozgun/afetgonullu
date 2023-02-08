import { TableCell, TableHead, TableRow, Paper, makeStyles, Table, TableBody} from '@mui/material';
import React, { useEffect, useState } from 'react';



function LocationTable() {
  const [helpCenters, setHelpCenters] = useState([])

  const getData = async () => {
    const response = await fetch('/api/locations')
    const data = await response.json()
    setHelpCenters(data)
  }
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <Paper >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
            <TableCell align="right">Needs People</TableCell>
            <TableCell align="right">Needs Donation</TableCell>
            <TableCell align="right">Help Message</TableCell>
            <TableCell align="right">Severity</TableCell>
            <TableCell align="right">Latest Information Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {helpCenters.map((location) => (
            <TableRow key={location.name}>
              <TableCell component="th" scope="row">
                {location.name}
              </TableCell>
              <TableCell align="right">{location.latitude}</TableCell>
              <TableCell align="right">{location.longitude}</TableCell>
              <TableCell align="right">{location.needs_people ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{location.needs_donation ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{location.help_message || '-'}</TableCell>
              <TableCell align="right">{location.severity}</TableCell>
              <TableCell align="right">{location.latest_information_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default LocationTable;