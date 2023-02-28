import { SET_CATEGORY, SET_region, SET_DONATION } from "../actions/index";

const initialState = {
  region: '',
  category: '',
  donation: ''
};


const filterReducer = (state = initialState, action) => 
  {
    switch (action.type) {
      case SET_CATEGORY:
        return {
          ...state,
          category: action.payload,
        };
      case SET_region:
        return {
          ...state,
          region: action.payload,
        };
      case SET_DONATION:
        return {
          ...state,
          donation: action.payload,
        };
    default:
      return state;
    }
  };

export default filterReducer;