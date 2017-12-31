// reducers/images.js
import {ADD_IMAGE,DELETE_IMAGE,SEARCH } from '../constant';

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
      images:action.newState,
      searchResult:action.newsStateSearch
    };
    break;
    case SEARCH:
    return{
      ...state,
      searchResult:action.newState
    };
    break;
    default:
    return state || {
        images:[],
        searchResult:[]
      }
  }
}