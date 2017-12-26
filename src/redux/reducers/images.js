// reducers/images.js
import {ADD_IMAGE,SEARCH,DELETE_IMAGE } from '../constant';
import {incrementalSearch, getData,saveData,deleteImage}from '../../utils'
const images = []
const currentValue = ''
const searchResult = []

export default (state, action) => {
  switch (action.type) {
    case ADD_IMAGE:
    return{
      ...state,
      images: [...state.images, action.image],
    };
    break;
    case SEARCH:
    var searchElement = incrementalSearch(state.images,action.val)
    return{
      ...state,
      currentValue:action.val,
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
        currentValue:currentValue,
        searchResult:searchResult,
      };
  }
}
