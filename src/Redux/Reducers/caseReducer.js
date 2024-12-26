import { SET_SELECTED_TAB } from '../Constants/caseCaontant';


const initialState = { selectedTab: 'default', };

const tabReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_SELECTED_TAB:
             return {
            ...state,
             selectedTab: action.payload,
        };
        default: return state;
    }
};
export default tabReducer;