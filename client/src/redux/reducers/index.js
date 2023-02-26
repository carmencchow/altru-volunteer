import { combineReducers } from 'redux'
import pageReducer from 'redux/reducers/pageReducer'
import donateReducer from 'redux/reducers/donateReducer'
import regionReducer from 'redux/reducers/regionReducer'
import searchReducer from 'redux/reducers/searchReducer'
import filterReducer from 'redux/reducers/filterReducer'

const rootReducer = combineReducers({
  filterItems: filterReducer,
  page: pageReducer,
  donate: donateReducer,
  region: regionReducer,
  search: searchReducer 
});

export default rootReducer;