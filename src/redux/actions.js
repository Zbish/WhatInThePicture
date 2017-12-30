// actions.js
import {ADD_IMAGE,DELETE_IMAGE } from './constant';
import {deletepic} from '../utils'

export function AddImage(image){
    return {
        type: ADD_IMAGE,
        image
      };
    }

export function deleteImage(array,id){
    var newState = deletepic(array,id)
    return {
        type: DELETE_IMAGE,
        newState
    }
}