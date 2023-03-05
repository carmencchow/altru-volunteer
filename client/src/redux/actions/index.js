import axios from 'axios';
export const SET_FILTERS = 'SET_FILTERS';
export const LOGIN_USER_REQUEST = 'USER_LOGIN_REQUEST';
export const LOGIN_USER_SUCCESS = 'USER_LOGIN_SUCCESS';
export const LOGOUT_USER = 'USER_LOGOUT';
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setFilters = async (region, cause) => {
  // let request = await axios.get(`http://localhost:5000/api/ngos/${region}/${cause}`)
  // .then((response) => {
  //   console.log(response.data)
  //   return response.data;
  // })
  // .catch((err) => {
  //   console.log(err)
  // })

  return {
    type: SET_FILTERS,
    payload: {region, category: cause},
  };
}

export const signupUser = async (user) => {
  let request = await axios.get('http://localhost:5000/api/auth/signup', user)
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err)
  })

  return {
    type: GET_ERRORS,
    payload: request
  };
};
