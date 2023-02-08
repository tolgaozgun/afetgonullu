import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
// import DirectionsIcon from '@material-ui/icons/Directions';
// import ShareIcon from '@material-ui/icons/Share';
import { Button, Grid, Typography } from '@mui/material/';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
    needs: {
      margin: theme.spacing(1),
    },
  }));

  const ActivePoint = (props) => {
    const classes = useStyles();
  
    const share = () => {
      // logic to share the location
    };
  
    const getDirections = () => {
      // logic to get directions to the location
      window.location.href = `http://maps.google.com/maps?z=12&t=m&q=loc:${props.latitude}+${props.geometry.longitude}`
    };

    
    console.log(props)
  
    return (
      <Grid container direction="column" alignItems="center" className={classes.root}>
        <h3 variant="h6">{props.name}</h3>
        <Grid item container direction="row" alignItems="center" className={classes.needs}>
          {props.needs_people && <p variant="p">Gönüllü lazım</p>}
          {props.needs_donation && <p variant="p">Bağış lazım</p>}
        </Grid>
        {props.help_message && <p variant="body2">{props.help_message}</p>}
        <Grid item container direction="row" alignItems="center" className={classes.needs}>
          <Button variant='contained' onClick={getDirections}>Yol Tarifi</Button>
          <Button variant='contained' onClick={share} >Paylaş</Button>
        </Grid>
      </Grid>
    );
  };
  
  export default ActivePoint;
  
  
  