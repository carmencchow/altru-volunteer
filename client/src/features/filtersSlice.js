import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  region: '',
  category: ''
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      // const { region, category: cause } = action.payload 
        state.region = action.payload.region
        state.category = action.payload.category
      
      // state.ngo.push({
      //   region,
      //   category: cause, 
      // })
    }
  }
})

export const { setFilters } = filtersSlice.actions
export default filtersSlice.reducer


/*** ----- REDUX FILTER: ----- ***/
// const filterReducer = (state = initialState, action) => 
//   {
//     switch (action.type) {
//       case SET_FILTERS:
//         return {
//           ...state,
//           region: action.payload.region,
//           category: action.payload.category
//         };
//     default:
//       return state;
//     }
//   };

