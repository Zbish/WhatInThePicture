// reducers/images.js
import {DELETE_IMAGE,SEARCH,NEWIMAGE } from '../constant';

export default (state, action) => {
  switch (action.type) {
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
    case NEWIMAGE:
    return{
      ...state,
      images: [action.item,...state.images],
    };
    break;
    default:
    return state || {
        images:[],
        searchResult:[]
      }
  }
}