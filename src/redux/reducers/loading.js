// reducers/loading.js
import { LOADING } from '../constant';
const initialState = {
    loading: true
}
export default (state, action) => {
    switch (action.type) {
        case LOADING:
            return {
                loading: action.indicator,
            };
            break;
        default:
            return state || initialState
    }
}