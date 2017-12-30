import {ADD_IMAGE,SEARCH,DELETE_IMAGE } from './constant';
import {incrementalSearch,deletepic} from '../utils'


export function AddImage(image){
    return {
        type: ADD_IMAGE,
        image
      };
    }

export function Search(array,val){
    var searchElement = incrementalSearch(array,val)
    return {
        type: SEARCH,
        searchElement
    }
}
export function deleteImage(array,id){
    var newState = deletepic(array,id)
    return {
        type: DELETE_IMAGE,
        newState
    }
}