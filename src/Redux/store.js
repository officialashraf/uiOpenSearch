import {configureStore}  from '@reduxjs/toolkit'
import tabReducer from './Reducers/caseReducer'

const store = configureStore({
  reducer: {
    selectedTab: tabReducer,
 },
});

export default store;

