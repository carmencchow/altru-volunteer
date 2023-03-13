import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ngo: []
}

const ngoSlice = createSlice({
  name: 'ngo',
  initialState,
  reducers: {
    ngoSelected(state, action) {
      const { region, category, tag, name, website } = action.payload 
      state.ngo.push({
        region,
        category, 
        tag, 
        name, 
        website
      })
    }
  }
})

export const { ngoSelected } = ngoSlice.actions
export default ngoSlice.reducer


// const detailsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case SAVE_NGO_DETAILS:
//       console.log('Saving details:', action.payload)
//     return {
//       ...state,
//       region: action.payload.region,
//       category: action.payload.category,
//       tag: action.payload.tag,
//       name: action.payload.name,
//       website: action.payload.website,

//     };

//     default:
//       return state;
//   }
// }