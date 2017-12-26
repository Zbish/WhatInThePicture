import Clarifai from 'clarifai';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker'
import {AsyncStorage} from'react-native'

const app = new Clarifai.App({
    apiKey: 'b5bfcb7aba854f9da7b6d6e418d778cb'
   });
const options = {
    title: 'Select',
    customButtons: [
    //   {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  const getImageConcepts2 = function(image){
    var concept = app.models.predict(Clarifai.GENERAL_MODEL, {base64: image})
    return  concept
    }
  export const getImage = function(){
    var guid = uuidv4()
             return new Promise( (resolve, reject) => {
            ImagePicker.showImagePicker(options, (response)  => {
                var cons = getImageConcepts2(response.data).then((value) => {
                     var concepts = value.outputs[0].data.concepts
                     var newConcepts = []   
                     for(var i = 0 ; i < concepts.length ; i++)
                      {
                        newConcepts.push(concepts[i].name)
                      }
                     var time = new Date
                     var item = {id:guid,image:response.uri,consepts:newConcepts,taken:time}
            resolve(item)})
      } )
     })
   }
   export const incrementalSearch = function(array,value){
    var clone =  _.cloneDeep(array);
    var newArray = []
    // var str = value;
    // var res = str.split(" ")

    for(var i = 0 ; i < clone.length ; i++){
      
      var newList = clone[i].consepts.filter((v) => {
        return v.indexOf(value) !== -1;
        })
        
        if(newList.length > 0){
            console.log('list' ,newList)
            newArray.push(clone[i])
          }
      }
      console.log('newArray' , newArray)
    return newArray
   }
  const uuidv4 = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  export const getData = function(){
    return new Promise( (resolve, reject) => {
  try {
    var data = AsyncStorage.getItem('@MySuperStore:key').then((value) =>{
      resolve(JSON.parse(value))
    })
  } catch (error) {
    console.log('error bring data' ,error)
  }
})
 }

  export const saveData = function(data){
    try {
      AsyncStorage.setItem('@MySuperStore:key',JSON.stringify(data));
      console.log('sava data')
    } catch (error) {
      console.log('error saving data' ,error)
    }
   }
  
   export const deleteImage = function(array,id){
    var clone =  _.cloneDeep(array);
    var index = _.findIndex(clone, function(o) { return o.id == id; });
    clone.splice(index, 1);
    return clone
   }