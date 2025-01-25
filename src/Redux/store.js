import {configureStore}  from '@reduxjs/toolkit'
import { caseReducer, tabReducer,

  } from './Reducers/caseReducer'
import { summaryDataReducer, taskFilterReducer } from './Reducers/filterReducer';

const store = configureStore({
  reducer: {
    selectedTab: tabReducer,
    taskFilterId : taskFilterReducer,
    caseData : caseReducer ,
    filterData: summaryDataReducer,
 },
});

export default store;

