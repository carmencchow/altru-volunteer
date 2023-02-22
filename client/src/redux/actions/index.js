export const CHANGE_QUERY = 'CHANGE_QUERY';
export const SET_QUERY = 'SET_QUERY';
export const CHANGE_CAUSE = 'CHANGE_CAUSE';
export const SET_CAUSE = 'SET_CAUSE';
export const CHANGE_REGION = 'CHANGE_REGION';
export const SET_REGION = 'SET_REGION';
export const CHANGE_DONATIONTYPE = 'CHANGE_DONATIONTYPE';
export const SET_DONATION = 'SET_DONATIONTYPE';

// Donations
export const ADD_DONATION = 'ADD_DONATION';
export const CHANGE_DONATION = 'CHANGE_DONATION';
export const REMOVE_DONATION = 'REMOVE_DONATION';

export const changeQuery = (query) => {
  return {
    type: CHANGE_QUERY,
    payload: query,
  }
}

export const causeFilter = (cause) => {
  return {
    type: CHANGE_CAUSE,
    payload: cause,
  }
}

export const regionFilter = (region) => {
  return {
    type: CHANGE_REGION,
    payload: region,
  }
}

export const donationTypeFilter = (donationType) => {
  return {
    type: CHANGE_DONATION,
    payload: donationType,
  }
}

