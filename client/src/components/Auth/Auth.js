import React, { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
//import { useEffect} from "react";
//import { useSelector } from "react-redux";
//const dispatch = useDispatch();
//import { useAlert } from "react-alert";
//const { error } = useSelector((state) => state.user);

const initialState = { firstName: '', lastName: '',smart_id:'', email: '', password: '', confirmPassword: '' };  //here

// useEffect(() => {          // here
//   if (error) {
//     alert.error(error);
//     dispatch({ type: "clearErrors" });
//   }
// }, [dispatch, error, alert]);

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSignup, setIsSignup] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  
  

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(form));
   // validate(form);

    if (isSignup) {
      dispatch(signup(form, history));
       
    } else {
      dispatch(signin(form, history));
    }
    setIsSubmit(true);
  };
    
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(form);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 7) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 16) {
      errors.password = "Password cannot exceed more than 15 characters";
    }
    return errors;
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const signInError = () => alert('Sign In was unsuccessful. Try again later');
  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
 


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>   
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" value={form.firstName}
              onChange={handleChange} autoFocus half />
              <p>{formErrors.firstName}</p>
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              <Input name="smart_id" label="Smart Card Id" handleChange={handleChange}  />    
              {/* above here*/ }

            </>
            )}
            <Input name="email" label="Email Address" value={form.email}
              onChange={handleChange} type="email" />
            <p>{formErrors.email}</p>
            <Input name="password" label="Password" value={form.password}
              onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"   onFailure={signInError}/> }
            <p>{formErrors.password}</p>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          {/* <GoogleLogin
            clientId="751400258226-ks9uf7ost20r372cjo1r1b42r21c6u0l.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
           />  */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;