export const SET_FILTERS = 'SET_FILTERS';
export const SAVE_NGO_DETAILS = 'SAVE_NGO_DETAILS';

export const setFilters = async (region, cause) => {
  return {
    type: SET_FILTERS,
    payload: {region, category: cause},
  };
}

export const saveNgoDetails = async (region, cause, tag, name, website) => {
  return {
    type: SAVE_NGO_DETAILS,
    payload: {region, category: cause, tag, name, website}
  }
}


// export const signupUser = async (user) => {
//   let request = await axios.get('http://localhost:5000/api/auth/signup', user)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//   return {
//     type: GET_ERRORS,
//     payload: request
//   };
// };
