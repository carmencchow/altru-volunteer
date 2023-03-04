// import { SET_CATEGORY, SET_REGION_FILTER, SET_DONATION } from "../actions/index";
import { SET_FILTERS } from "../actions/index";

const initialState = {
  region: '',
  category: ''
};


const filterReducer = (state = initialState, action) => 
  {
    switch (action.type) {
      case SET_FILTERS:
        return {
          ...state,
          region: action.payload.region,
          category: action.payload.category
        };
    default:
      return state;
    }
  };

export default filterReducer;