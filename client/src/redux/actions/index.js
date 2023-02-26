import axios from 'axios';

export const SET_REGION_FILTER = 'SET_REGION_FILTER';
// export const CHANGE_QUERY = 'CHANGE_QUERY';
// export const SET_QUERY = 'SET_QUERY';
// export const CHANGE_CAUSE = 'CHANGE_CAUSE';
// export const UPDATE_CAUSE = 'UPDATE_CAUSE';
// export const UPDATE_DONATION = 'UPDATE_DONATION';

// //Donations
// export const ADD_DONATION = 'ADD_DONATION';
// export const CHANGE_DONATION = 'CHANGE_DONATION';
// export const REMOVE_DONATION = 'REMOVE_DONATION';

// const ROOT_URL = 'http://localhost:5000/api';

export const setRegionFilter = async (region) => {
  let request = await axios.get('http://localhost:5000/api/ngo')
    .then((response) => {
      console.log(response)
      // console.log(response.data.ngos, response.data.count)
      return response;
    })
    .catch((err) => {
      console.log(err)
    })

  return {
    type: SET_REGION_FILTER,
    payload: request,
  };
}

// export const changeQuery = async (query, page) => {
//   let request = await axios.et(`${ROOT_URL}?page=${page}&query=${query}`)
//   .then((response) => {
//     console.log(response.data.products, response.data.count)
//     return response.data.products; 
//   })
//   .catch((error) => {
//     console.log(error)
//   })
  
//   return {
//     type: CHANGE_QUERY,
//     payload: request,
//   }
// }

// export const causeFilter = (cause) => {
//   return {
//     type: CHANGE_CAUSE,
//     payload: cause,
//   }
// }



// export const donationTypeFilter = (donationType) => {
//   return {
//     type: CHANGE_DONATION,
//     payload: donationType,
//   }
// }

