import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
   const { data } = await api.signIn(formData);

   dispatch({ type: AUTH, data });

    router.push('/');
    alert('sign in successful');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
   const { data } = await api.signUp(formData);

   dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    alert('Please try again.\nEither you have entered an invalid smart card Id or the email already exists.');
      console.log(error);
  }
};