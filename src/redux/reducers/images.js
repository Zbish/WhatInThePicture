// reducers/images.js
import {ADD_IMAGE,SEARCH,DELETE_IMAGE,LOADING_IMAGE } from '../constant';
import {incrementalSearch, getData,saveData,deleteImage}from '../../utils'
const images = []
const currentValue = ''
const searchResult = []
const loading = true

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
    case LOADING_IMAGE:
    return{
      ...state,
      loading:action.val
    };
    break;
    default:
    return state || {
        images: images,
        currentValue:currentValue,
        searchResult:searchResult,
        loading:true
      };
  }
}
