// reducers/images.js
import {ADD_IMAGE,SEARCH,DELETE_IMAGE } from '../constant';
import {incrementalSearch,deleteImage}from '../../utils'
const images = []
const searchResult = []

export default (state, action) => {
  switch (action.type) {
    case ADD_IMAGE:
    return{
      ...state,
      images: [action.image,...state.images],
    };
    break;
    case SEARCH:
    var searchElement = incrementalSearch(state.images,action.val)
    return{
      ...state,
      searchResult:searchElement
    };
    break;
    case DELETE_IMAGE:
    var newState = deleteImage(state.images,action.id)
    return{
      ...state,
      images:newState
    };
    break;
    default:
    return state || {
        images: images,
        searchResult:searchResult,
      };
  }
}
