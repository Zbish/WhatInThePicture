// reducers/images.js
import {ADD_IMAGE } from '../constant';

const images = []

export default (state, action) => {
  switch (action.type) {
    case ADD_IMAGE:
    return{
      ...state,
      images: [...state.images, action.image],
    };
    break;
    default:
    return state || {
        images: images,
      };
  }
}
