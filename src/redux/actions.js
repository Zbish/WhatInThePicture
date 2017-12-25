import { ADD_PERSON, DELETE_PERSON } from './constant';

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
