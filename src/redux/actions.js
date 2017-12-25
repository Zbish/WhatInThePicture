import { ADD_PERSON, DELETE_PERSON,ADD_IMAGE, } from './constant';

export function addPerson(person) {
  return {
    type: 'ADD_PERSON',
    person,
  };
}

export function deletePerson(person) {
  return {
    type: 'DELETE_PERSON',
    person,
  };
}

export function AddImage(image){
    return {
        type: ADD_IMAGE,
        image
      };
    }