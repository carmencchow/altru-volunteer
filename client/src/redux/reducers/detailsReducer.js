import { SAVE_NGO_DETAILS } from '../actions/index';

const detailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_NGO_DETAILS:
      console.log('Saving details:', action.payload)
    return {
      ...state,
      region: action.payload.region,
      category: action.payload.category,
      tag: action.payload.tag,
      name: action.payload.name,
      website: action.payload.website,

    };

    default:
      return state;
  }
}

export default detailsReducer;
