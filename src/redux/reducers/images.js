// reducers/images.js
import {ADD_IMAGE,DELETE_IMAGE } from '../constant';

export default (state, action) => {
  switch (action.type) {
    case ADD_IMAGE:
    return{
      ...state,
      images: [action.image,...state.images],
    };
    break;
    case DELETE_IMAGE:
    return{
      ...state,
      images:action.newState
    };
    break;
    default:
    return state || {
        images:[]
      }
  }
}