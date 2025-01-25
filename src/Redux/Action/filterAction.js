import {SET_TASK_FILTER_ID, SET_DATA, SET_HEADERS} from '../Constants/filterConstant'

export const setTaskFilter = (taskId, filterId) => ({
    type: SET_TASK_FILTER_ID,
    payload: { taskId, filterId },
  });

export const setSummaryDataAction = (data) => ({
  type: SET_DATA,
  payload: data,
});

export const setSumaryHeadersAction = (headers) => ({
  type: SET_HEADERS,
  payload: headers,
});