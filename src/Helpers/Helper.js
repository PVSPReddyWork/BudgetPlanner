export const sortByAscendingOrder = (array, property, successCallback, failureCallback) => {
    var sorted = array.sort((a, b) => a[property].localeCompare(b[property], undefined, { caseFirst: "upper" }));
    // var sorted = items_Added.sort((a, b) => a.name.localeCompare(b.name, undefined, { caseFirst: "upper" })); 
    return sorted;    
}
export const sortByDescendingOrder = (array, property, successCallback, failureCallback) => {
    var sorted = array.sort((a, b) => b[property].localeCompare(a[property], undefined, { caseFirst: "upper" }));
    // var sorted = items_Added.sort((a, b) => b.name.localeCompare(a.name, undefined, { caseFirst: "upper" })); 
    return sorted;     
}

export const sleepTimer = (ms) => new Promise(resolve => setTimeout(resolve, ms));