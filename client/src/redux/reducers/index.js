import { combineReducers } from 'redux'
import regionReducer from './regionReducer'
import causeReducer from './causeReducer'
// import filterReducer from './filtersReducer'
// import donationReducer from './donateReducer'

const rootReducer = combineReducers({
  region: regionReducer,
  cause: causeReducer, 
  // filters: filterReducer,
  // donate: donationReducer,
  // category: categoryReducer
});

export default rootReducer;