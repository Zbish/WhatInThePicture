import Clarifai from 'clarifai';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker'

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
           return new Promise( (resolve, reject) => {
            ImagePicker.showImagePicker(options, (response)  => {
                var cons = getImageConcepts2(response.data).then((value) => {
                     var concepts = value.outputs[0].data.concepts
                     var time = new Date
                     var item = {image:response.uri,consepts:concepts,taken:time}
            resolve(item)})
      } )
     })
   }