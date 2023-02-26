import axios from 'axios';

export const FETCH_NGOS = 'FETCH_NGOS';

// export const CHANGE_QUERY = 'CHANGE_QUERY';
// export const SET_QUERY = 'SET_QUERY';
// export const CHANGE_CAUSE = 'CHANGE_CAUSE';
// export const SET_CAUSE = 'SET_CAUSE';
// export const CHANGE_REGION = 'CHANGE_REGION';
// export const SET_REGION = 'SET_REGION';
// export const CHANGE_DONATIONTYPE = 'CHANGE_DONATIONTYPE';
// export const SET_DONATION = 'SET_DONATIONTYPE';

// //Donations
// export const ADD_DONATION = 'ADD_DONATION';
// export const CHANGE_DONATION = 'CHANGE_DONATION';
// export const REMOVE_DONATION = 'REMOVE_DONATION';

const ROOT_URL = 'http://localhost:5000/api/';

export const fetchNgos = async (page, category, limit) => {

  // try {
  //   const res = await axios.get(`${ROOT_URL}ngo?category=${category}&page=${page}&limit=${limit}`);
  //   const ngos = await res.json();
    
  //   dispatch({ 
  //     type: FETCH_NGOS,
  //     payload: ngos 
  //   }); 

  // } catch (err) {
  //   return res

  // }
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

// export const regionFilter = (region) => {
//   return {
//     type: CHANGE_REGION,
//     payload: region,
//   }
// }

// export const donationTypeFilter = (donationType) => {
//   return {
//     type: CHANGE_DONATION,
//     payload: donationType,
//   }
// }

