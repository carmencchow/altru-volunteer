import axios from 'axios';
export const SET_REGION_FILTER = 'SET_REGION_FILTER';

export const setregionFilter = async (region) => {
  const selectedRegion = region.toLowerCase();
  console.log(selectedRegion)
  let request = await axios.get(`http://localhost:5000/api/ngo/filter/${selectedRegion}`)
    .then((response) => {
      console.log(response.data.ngos, response.data.count)
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

