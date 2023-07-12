const googleProductionDeploymentID = 'AKfycbyEfXxKDSAOgZXPRFvi1k7MTFEbD57VfwH1Ppxm11d28vc6i33W4KkUNof21S54L_1x';// 'AKfycby64Npo8TfLUUnq7cCAScD6mAo0Hl4QLjdx8_GCaanzE5fcZLML6CA0';
export const mainURL ='https://script.google.com/macros/s/'+googleProductionDeploymentID+'/exec';

//https://script.google.com/macros/s/AKfycbxMBuIJPBf6hvtwrOUkVOJTvYH2C7JWIS9yBH4lBu8/dev
const googleTestDeploymentID = 'AKfycbxMBuIJPBf6hvtwrOUkVOJTvYH2C7JWIS9yBH4lBu8';
export const testURL ='https://script.google.com/macros/s/'+googleProductionDeploymentID+'/dev';

//https://script.google.com/macros/s/AKfycbyEfXxKDSAOgZXPRFvi1k7MTFEbD57VfwH1Ppxm11d28vc6i33W4KkUNof21S54L_1x/exec
// const googleTestDeploymentID = 'AKfycbxMBuIJPBf6hvtwrOUkVOJTvYH2C7JWIS9yBH4lBu8';
// export const mainURL ='https://script.google.com/macros/s/'+googleTestDeploymentID+'/exec';


//https://script.google.com/macros/s/AKfycbxMBuIJPBf6hvtwrOUkVOJTvYH2C7JWIS9yBH4lBu8/dev

export const PostExpenditureURL =
  '?Contenttype=application/json&userRequest=addNewBudgetData';
  export const PostBulkExpenditureURL =
  '?Contenttype=application/json&userRequest=addNewBulkBudgetData';
export const GetAvailableYearsMonths =
  '?Contenttype=application/json&userRequest=getFileNamesInExpensesFolder';
export const PostGetAvailableMonthlyExpenseData =
  '?Contenttype=application/json&userRequest=getDatabyMonth';

export const GetGroceriesListURL =
'?Contenttype=application/json&userRequest=getGroceriesListData';
export const PostBulkGroceriesURL =
'?Contenttype=application/json&userRequest=addGroceriesListData';


export const SUCCESS_STATUS_CODE = 201;
export const NOT_FOUND_STATUS_CODE = 404;
export const FAILURE_STATUS_CODE = 500;

export const INACTIVE = 'INACTIVE';
export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
