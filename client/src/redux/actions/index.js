export const SET_FILTERS = 'SET_FILTERS';
export const SAVE_NGO_DETAILS = 'SAVE_NGO_DETAILS';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITIES';

export const setFilters = (region, cause) => {
  return {
    type: SET_FILTERS,
    payload: {region, category: cause},
  };
}

export const saveNgoDetails = (region, category, tag, name, website) => {
  return {
    type: SAVE_NGO_DETAILS,
    payload: {region, category, tag, name, website}
  }
}

export const addToFavorites = (name, website) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: {name, website}
  }
}


