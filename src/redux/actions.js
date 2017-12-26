import {ADD_IMAGE,SEARCH } from './constant';


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