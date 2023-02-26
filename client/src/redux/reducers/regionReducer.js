import { SET_REGION_FILTER } from '../actions/index';

// const initialState = {
//   category: '',
//   ngos: []
// };

const regionReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_REGION_FILTER:
      return {
        ...state,
        ngos: action.payload,
      };
    // case SET_NG0S:
    //   return {
    //     ...state,
    //     ngos: action.payload
    //   };

    default:
      return state;
  }
}

export default regionReducer;
