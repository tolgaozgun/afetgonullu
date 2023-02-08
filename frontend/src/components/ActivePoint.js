import { Button, Grid, Typography } from '@mui/material/';
import React from 'react';
import { Link } from "react-router-dom";

  const ActivePoint = (props) => {

  
    return (
      <Grid container direction="column" alignItems="center" p={1}>
        <h2 variant="h6">{props.name}</h2>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            {props.needs_people ? <Typography fontSize={16}>Gönüllü lazım</Typography> : <Typography fontSize={16}>Gönüllü lazım değil</Typography>}
          </Grid>
          <Grid item>
            {props.needs_donation ? 
              <Typography color={props.needs_donation ? "red" : "green"} fontSize={16}>Bağış lazım</Typography> 
                : <Typography 
                    fontSize={16}
                    color={props.needs_donation ? "red" : "green"}
                  >
                    Bağış lazım değil
                  </Typography> 
              }
          </Grid>
        </Grid>
        <Grid item>
          {props.help_message && 
            <Typography variant="body2" style={{whiteSpace: 'pre-line'}}>{props.help_message}</Typography>
          }
        </Grid>
        <Grid item container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Link 
              to={`http://maps.google.com/maps?daddr=${props.latitude},${props.longitude}`} 
              target="_blank">
              <Button variant='contained'>Yol Tarifi</Button>
            </Link>
          </Grid>
          <Grid item>
            <Link 
              to={`http://maps.google.com/maps?z=12&t=m&q=loc:${props.latitude}+${props.longitude}`} 
              target="_blank">
              <Button variant='contained'>Paylaş</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default ActivePoint;
  
  
  