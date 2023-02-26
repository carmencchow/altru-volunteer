import { combineReducers } from 'redux'
import regionReducer from './regionReducer'
// import donationReducer from 'redux/reducers/donateReducer'
// import categoryReducer from 'redux/reducers/categoryReducer'
// import filterReducer from 'redux/reducers/filterReducer'

const rootReducer = combineReducers({
  region: regionReducer,
  // filterItems: filterReducer,
  // donate: donationReducer,
  // category: categoryReducer
});

export default rootReducer;