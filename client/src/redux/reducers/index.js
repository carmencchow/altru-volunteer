import { combineReducers } from 'redux'
import filterReducer from './filtersReducer'
import detailsReducer from './detailsReducer'

const rootReducer = combineReducers({
  filters: filterReducer,
  details: detailsReducer
 });

export default rootReducer;