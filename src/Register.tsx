import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useState } from  'react';
import VerifyEmail from 'email-validator'
import  RingLoader
from 'react-spinners/RingLoader';
import {Copyright, useStyles} from './Login'



export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();
  let controlArgs: boolean;
  const[loading, setLoading] = useState(false);
  const[passError, setPassError] = useState(false);
  const[emailError, setEmailError] = useState(false);
  const[usernameError,setUsernameError] = useState(false);
  const[message,setMessage] = useState("");
  
  
  function validArgs():boolean {

    if(state.username === ""){
      setUsernameError(true);
      setMessage("Please Insert a Username")
      return false
    }

    else if(!VerifyEmail.validate(state.email) || state.email === ""){
      setEmailError(true);
      //alert('Email Incorrect')
      return false;
    }

    else if(state.password !== state.cpassword || state.password==="" || state.cpassword === "" ){
      //alert('password not equal')
      setPassError(true);
      return false;
    }
     
    else return true;
  }
  


  
  async function redirect (username: string, email: string, password:string, cpassword:string)  {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
console.log(state)
controlArgs = validArgs();

var raw = JSON.stringify({
  "username": username,
  "email": email,
  "password": password,
  "confirmation": cpassword
});

var requestOptions: RequestInit = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

let serverresponse:string = "";


  

if(controlArgs){
  
  
  setLoading(true)
 await fetch(`https://individualproject-309823.ey.r.appspot.com/rest/register/v1/${username}`, requestOptions)
  .then(response => response.text())
  .then(result => serverresponse = result)
  
  
  //.catch(error => console.log('error', error));
  setLoading(false)

  if(serverresponse === "User already exist"){
    console.log(serverresponse)
    setUsernameError(true)
    setMessage("User already exist")
  }
else history.push('/login')
}  
  
}



  const[state, setState] = React.useState({
    username: '',
    email: '',
    password: '',
    cpassword: ''

  })

  const handleChange = (e:any) => {
    const value = e.target.value;
    if(e.target.name === "username"){
      setUsernameError(false);
    }
    if(e.target.name === "email"){
      setEmailError(false);
    }
    if(e.target.name === "password"){
      setPassError(false);
    }
    setState({
      ...state,
      [e.target.name]: value
      
    })

    
  }




  return (
    <div >
      {
loading ? (<div className="Register"><RingLoader
color={"#36D794"} loading={loading}  size={100} css={"useStyles"}   background-color={"#36D794"}/></div>)
     

:


(<div className="Register"><Container component="main" maxWidth="xs">
<CssBaseline />
<div className={classes.paper}>
<Avatar className={classes.avatar}>
  <LockOutlinedIcon />
</Avatar>
<Typography id="header" component="h1" variant="h5">
  Sign up
</Typography>

<form className={classes.form} noValidate>
<Grid container spacing={2}>
    <Grid item xs={12}>
    <div>{
      usernameError ?
      <TextField
        value = {state.username}
        onChange ={handleChange}
        autoComplete="uname"
        name="username"
        variant="filled"
        required
        fullWidth
        id="loginform"
        label={message}
        autoFocus
        error inputProps={{ 'aria-label': 'description' }}
      />
      
      :
      <TextField
        value = {state.username}
        onChange ={handleChange}
        autoComplete="uname"
        name="username"
        variant="filled"
        required
        fullWidth
        id="loginform"
        label="Username"
        autoFocus
      />

    }
      </div>
    </Grid>
    <Grid item xs={12}>
      <div>{
        emailError ?
        <TextField
        value = {state.email}
        onChange ={handleChange}
        variant="filled"
        required
        fullWidth
        id="loginform"
        label="Email Incorrect"
        name="email"
        autoComplete="email"
        error inputProps={{ 'aria-label': 'description' }}
      />
     
      :
      

      <TextField
      value = {state.email}
      onChange ={handleChange}
      variant="filled"
      required
      fullWidth
      id="loginform"
      label="Email Address"
      name="email"
      autoComplete="email"
    />
      }
      </div>
    
    </Grid>
    <Grid item xs={12}>
      <div>{
        passError ? 
        <TextField
        value = {state.password}
        onChange ={handleChange}
        variant="filled"
        required
        fullWidth
        name="password"
        label="Please Confirm your password"
        type="password"
        id="passform"
        autoComplete="current-password"
        error inputProps={{ 'aria-label': 'description' }}
      />
      :
      
      <TextField
        value = {state.password}
        onChange ={handleChange}
        variant="filled"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="passform"
        autoComplete="current-password"
        
      />
        }
      

        </div>
     
    

    </Grid>
    <Grid item xs={12}>
      <TextField
        value = {state.cpassword}
        onChange ={handleChange}
        variant="filled"
        required
        fullWidth
        name="cpassword"
        label="Confirm Password"
        type="password"
        id="passform"
        autoComplete="current-password"
      />
    </Grid>
   
  </Grid>
  
  <Button
    onClick = {() => redirect(state.username,state.email,state.password,state.cpassword)}
    type="button"
    fullWidth
    variant="contained"
    color="primary"
    className={classes.submit}
  >
    Sign Up
  </Button>
  
  <Grid container justify="center">
    <Grid item>
      <Link to="/login" id="link">
        Already have an account? Sign in
      </Link>
    </Grid>
  </Grid>
</form>

</div>

<Box mt={5}>
<Copyright />
</Box>
</Container></div>)
      }
      </div>
    
  
  );
}




