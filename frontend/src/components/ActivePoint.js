import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import DirectionsIcon from '@material-ui/icons/Directions';
// import ShareIcon from '@material-ui/icons/Share';
import { Typography, Button, Grid} from '@mui/material/';

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
    };
  
    return (
      <Grid container direction="column" alignItems="center" className={classes.root}>
        <Typography variant="h6">{props.name}</Typography>
        <Grid item container direction="row" alignItems="center" className={classes.needs}>
          {props.needs_people && <Typography variant="subtitle2">Gönüllü lazım</Typography>}
          {props.needs_donation && <Typography variant="subtitle2">Bağış lazım</Typography>}
        </Grid>
        {props.help_message && <Typography variant="body2">{props.help_message}</Typography>}
        <Grid item container direction="row" alignItems="center" className={classes.needs}>
          <Button onClick={getDirections}>Yol Tarifi</Button>
          <Button onClick={share} >Paylaş</Button>
        </Grid>
      </Grid>
    );
  };
  
  export default ActivePoint;
  
  
  