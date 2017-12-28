import {ADD_IMAGE,SEARCH,DELETE_IMAGE,LOADING_IMAGE } from './constant';


export function AddImage(image){
    return {
        type: ADD_IMAGE,
        image
      };
    }

export function Search(val){
    return {
        type: SEARCH,
        val
    }
}
export function deleteImage(id){
    return {
        type: DELETE_IMAGE,
        id
    }
}
export function loadingImage(val){
    return {
        type: LOADING_IMAGE,
        val
    }
}