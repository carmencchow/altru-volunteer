import { UPDATE_CATEGORY, SORT_PRICE, SEARCH_PRODUCT } from "../actions/index";

const filterReducer = (state = {}, action) => 
  {
    switch (action.type) {
      case SEARCH_PRODUCT:
        return {
          products: action.payload,
        };
      case UPDATE_CATEGORY:
        return {
          ...state,
          products: action.payload,
        };
      case SORT_PRICE:
        return {
          products: action.payload,
        };
    default:
      return state;
    }
  }

export default filterReducer;