import Clarifai from 'clarifai';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker'
import {AsyncStorage,Alert} from'react-native'
// image recognition key
const app = new Clarifai.App({
    apiKey: 'b5bfcb7aba854f9da7b6d6e418d778cb'
   });
// image picker 
const options = {
    title: 'Select',
    customButtons: [
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  export const getImage = function(){
    var guid = uuidv4()
    var time = new Date
             return new Promise( (resolve, reject) => {
            ImagePicker.showImagePicker(options, (response)  => {
                getImageConcepts2(response.data).then((value) => {
                     var concepts = value
                     var image = response.uri
                     var item = {id:guid,image:image,consepts:concepts,taken:time}
            resolve(item)})
      } )
     })
   }
   const getImageConcepts2 = function(image){
    var cons = [] 
    try {
      cons = app.models.predict(Clarifai.GENERAL_MODEL, {base64: image}).then(
      (response)=> {
        var concepts = response.outputs[0].data.concepts
        var newConcepts = []   
        for(var i = 0 ; i < concepts.length ; i++)
         {
           newConcepts.push(concepts[i].name)
         }
        return newConcepts
      },
      (err)=> {
        Alert.alert(
          'cancelled',
          'check internet connection and try again',
        )
        return Promise( (resolve, reject) => {resolve(['problem'])})
      }
    );
    } catch (error) {
      
    }
    return cons
    }
    
    // incremental Search
   export const incrementalSearch = function(array,value){
    var clone =  _.cloneDeep(array);
    var newArray = []
    var str = value;
    var res = str.split(" ")
    for(var j = 0 ; j < res.length ; j++)
      {
        for(var i = 0 ; i < clone.length ; i++){
          
          var newList = clone[i].consepts.filter((v) => {
            return v.indexOf(res[j]) !== -1;
            })
            
            if(newList.length > 0){
                newArray.push(clone[i])
              }
          }
          clone = newArray
          newArray = []
      }
    return clone
   }

  // generate unique id
  const uuidv4 = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  // delete image from list
   export const deleteImage = function(array,id){
    var clone =  _.cloneDeep(array);
    var index = _.findIndex(clone, function(o) { return o.id == id; });
    clone.splice(index, 1);
    return clone
   }