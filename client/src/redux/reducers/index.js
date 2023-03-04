import { combineReducers } from 'redux'
import filterReducer from './filtersReducer'

const rootReducer = combineReducers({
  filters: filterReducer,
 });

export default rootReducer;