import { SET_SELECTED_TAB, 
    SET_CASE_DATA,
    } from '../Constants/caseCaontant';
export const setSelectedTab = (tab) => ({ 
    type: SET_SELECTED_TAB, 
    payload: tab,
 });


 export const setCaseData = (data) => ({
    type: SET_CASE_DATA,
    payload: data,
    
});