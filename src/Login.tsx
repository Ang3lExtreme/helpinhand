import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Linkq from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link } from "react-router-dom"
import  RingLoader
from 'react-spinners/RingLoader';
import { useHistory } from "react-router-dom";


export function Copyright() {
  return (
    <Typography id="registerlink" variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Linkq id="registerlink"color="inherit" href="https://individualproject-309823.ey.r.appspot.com/">
        FullStop ®
      </Linkq>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#0b9d2b"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));









export default function SignIn() {
  const classes = useStyles();
  const[state, setState] = useState({
    username: '',
    password: ''
  })
  const[usernameError, setUsernameError] = useState(false);
  const[passwordError, setPasswordError] = useState(false)
  const[message,setMessage] = useState("");
  const[loading, setLoading] = useState(false);
  let history = useHistory();
const handleChange = (e:any) => {
    const value = e.target.value;
    if(e.target.name === "username"){
      setUsernameError(false);
    }
    if(e.target.name === "password"){
      setPasswordError(false);
    }
    setState({
      ...state,
      [e.target.name]: value
      
    })  
  }
  function validArgs():boolean {

    if(state.username === ""){
      setUsernameError(true);
      setMessage("Please Insert a Username")
      return false
    }
  
  
    else if(state.password==="" ){
      //alert('password not equal')
      setPasswordError(true);
      return false;
    }
     
    else return true;
  }

  async function loginuser (username: string,password: string){
    let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let isArgsValid: boolean;
  let jsonraw = {
  "username": username,
  "password": password
  }
  
  let raw = JSON.stringify(jsonraw);
  
  let requestOptions: RequestInit = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };
  
  let name :string = jsonraw.username;
  console.log(jsonraw);
  

  isArgsValid = validArgs();
  let serverresponse:string = "";
  if(isArgsValid){

    setLoading(true)
  await fetch(`https://individualproject-309823.ey.r.appspot.com/rest/login/v1/${name}`, requestOptions)
  .then(response => response.text())
  .then(result => serverresponse = result)
  .catch(error => console.log('error', error));
  setLoading(false)
}

console.log(serverresponse)

if(serverresponse === "User dont exist or is disabled"){
  setMessage("User dont exist")
  setUsernameError(true)
}
else if(serverresponse === "Password incorrect"){
  setPasswordError(true);
}

//else history.push(`/userpage/${username}`)
  
  
  }

  return (
    <div className="Login">
      {
        loading ?
        (<div className="Register"><RingLoader
color={"#36D794"} loading={loading}  size={100} css={"useStyles"}   background-color={"#36D794"}/></div>)


        :

        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" id="header">
          Login
        </Typography>
        <form className={classes.form} noValidate >
          <div>
            {
              usernameError ?

              <TextField
            value = {state.username}
            onChange = {handleChange}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="loginform"
            label={message}
            name="username"
            autoComplete="username"
            autoFocus
            error inputProps={{ 'aria-label': 'description' }}
          />
          :
          
          <TextField
            value = {state.username}
            onChange = {handleChange}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="loginform"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
            }
          </div>
          <div>
            {
              passwordError ?

              <TextField
            value = {state.password}
            onChange = {handleChange}
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password incorrect"
            type="password"
            id="passform"
            autoComplete="current-password"
            error inputProps={{ 'aria-label': 'description' }}
            autoFocus
          />
          :
          <TextField
            value = {state.password}
            onChange = {handleChange}
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="passform"
            autoComplete="password"
            autoFocus
          />
            }
          </div>
          
          
          <Button
            onClick = {() => loginuser(state.username, state.password)}
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          
            
            <Grid item >
              <Link to="/register" id="link">
                {"Don't have an account? Sign Up"}
              </Link>
            
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
      }
    </div>
    
  );
}
