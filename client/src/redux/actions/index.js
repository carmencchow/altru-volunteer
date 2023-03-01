import axios from 'axios';
export const SET_REGION_FILTER = 'SET_REGION_FILTER';
export const SET_CAUSE_FILTER = 'SET_CAUSE_FILTER';

export const setRegionFilter = async (region) => {
  const selectedRegion = region.toLowerCase();
  console.log(selectedRegion)
  let request = await axios.get(`http://localhost:5000/api/ngos/region/${region}`)
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err)
  })

  return {
    type: SET_REGION_FILTER,
    payload: request,
  };
}

export const setCauseFilter = async (cause) => {
  const selectedCause = cause.toLowerCase();
  console.log(selectedCause)
  let request = await axios.get(`http://localhost:5000/api/ngos/cause/${cause}`)
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err)
  })

  return {
    type: SET_CAUSE_FILTER,
    payload: request,
  };
}

export const setFilters = async (cause, region) => {}
