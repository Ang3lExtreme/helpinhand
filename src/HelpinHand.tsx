import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';



import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

import { useHistory } from "react-router-dom";

import hh from "./images/hh.png";

import {Copyright, useStyles} from './Login'





const styleimg = {
  img :{
    width: 200,
    height: 200,
  }
};







export default function HelpinHand() {
  const classes = useStyles();
  let history = useHistory();

  const redirect = () => {
    history.push('/login')
  }

  return (
    <div className="Register">
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5" id="header">
          Helpin'Hand
        </Typography>


      <img  style={styleimg.img} alt="HelpinHand" src={hh}></img>
       
        <Button variant="contained" color="primary" onClick={redirect}>
        Login
        </Button>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      </Container>
    </div>
    
  );
}