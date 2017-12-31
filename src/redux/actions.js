// actions.js
import {ADD_IMAGE,DELETE_IMAGE,SEARCH } from './constant';
import {deletepic,incrementalSearch} from '../utils'

export function AddImage(image){
    return {
        type: ADD_IMAGE,
        image
      };
    }

export function deleteImage(array,id,search){
    var newState = deletepic(array,id)
    var newsStateSearch = (search.length > 0) ?  deletepic(search,id) : []
    return {
        type: DELETE_IMAGE,
        newState, 
        newsStateSearch
    }
}
export function search(array,val){
    var newState = incrementalSearch(array,val)
    return {
        type:SEARCH,
        newState
    }
}