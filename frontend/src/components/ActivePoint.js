import React from 'react';
import { Link } from "react-router-dom";
// import DirectionsIcon from '@material-ui/icons/Directions';
// import ShareIcon from '@material-ui/icons/Share';
import { Button, Grid, Typography } from '@mui/material/';

  const ActivePoint = (props) => {
    const share = () => {
      // logic to share the location
    };
  
    const getDirections = () => {
      // logic to get directions to the location
      window.location.href = `http://maps.google.com/maps?z=12&t=m&q=loc:${props.latitude}+${props.geometry.longitude}`
    };

    
    console.log(props)
  
    return (
      <Grid container direction="column" alignItems="center" p={2}>
        <h3 variant="h6">{props.name}</h3>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            {props.needs_people ? <Typography fontSize={16}>Gönüllü lazım</Typography> : <Typography fontSize={16}>Gönüllü lazım değil</Typography>}
          </Grid>
          <Grid item>
            {props.needs_donation ? <Typography fontSize={16}>Bağış lazım</Typography> : <Typography fontSize={16}>Bağış lazım değil</Typography> }
          </Grid>
        </Grid>
        <Grid item>
          {props.help_message && <Typography variant="body2">{props.help_message}</Typography>}
        </Grid>
        <Grid item container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Link to={`http://maps.google.com/maps?z=12&t=m&q=loc:${props.latitude}+${props.longitude}`} target="_blank">
              <Button variant='contained' onClick={getDirections}>Yol Tarifi</Button>
            </Link>
          </Grid>
          <Grid item>
            <Button variant='contained' onClick={share} >Paylaş</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default ActivePoint;
  
  
  