export const GET_YEARS_MONTHS_DETAILS = 'INIT_GET_YEARS_MONTHS_DETAILS';
export const GET_YEARS_MONTHS_DETAILS_SUCCESS =
  'GET_YEARS_MONTHS_DETAILS_SUCCESS';
export const GET_YEARS_MONTHS_DETAILS_FAILURE =
  'GET_YEARS_MONTHS_DETAILS_FAILURE';
export const GET_YEARS_MONTHS_DETAILS_RESET = 'GET_YEARS_MONTHS_DETAILS_RESET';

export const getYearsMonthsData = () => ({type: GET_YEARS_MONTHS_DETAILS});
export const getYearsMonthsDataSuccess = (successData) => ({
  type: GET_YEARS_MONTHS_DETAILS_SUCCESS,
  payload: successData,
});
export const getYearsMonthsDataFailure = (failureReport) => ({
  type: GET_YEARS_MONTHS_DETAILS_FAILURE,
  payload: failureReport,
});
export const getYearsMonthsDataReset = () => ({
  type: GET_YEARS_MONTHS_DETAILS_RESET,
});
