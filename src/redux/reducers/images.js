// reducers/images.js
import {ADD_IMAGE,SEARCH } from '../constant';
import {incrementalSearch, getData,saveData}from '../../utils'
var pictures =[]
// var to = getData().then((value) => {
//   console.log('getData' , value)

//   return(value)
// })
// console.log('to' , to)
const images = []
const currentValue = ''
const searchResult = []

export default (state, action) => {
  console.log('state' , state)
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
    default:
    return state || {
        images: images,
        currentValue:currentValue,
        searchResult:searchResult,
        pictures:pictures
      };
  }
}
