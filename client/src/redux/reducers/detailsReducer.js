import { SAVE_NGO_DETAILS } from '../actions/index';

// const initialState = {
//   category: '',
//   region: '',
//   website: '',
//   tag: '',
// };

const detailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_NGO_DETAILS:
      console.log('Saving details:', action.payload)
    return {
      ...state,
      region: action.payload.region,
      category: action.payload.category,
      website: action.payload.website,
      tag: action.payload.tag
    };

    default:
      return state;
  }
}

export default detailsReducer;
