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
    var guid = uuidv4()
             return new Promise( (resolve, reject) => {
            ImagePicker.showImagePicker(options, (response)  => {
                var cons = getImageConcepts2(response.data).then((value) => {
                     var concepts = value.outputs[0].data.concepts
                     var time = new Date
                     var item = {id:guid,image:response.uri,consepts:concepts,taken:time}
            resolve(item)})
      } )
     })
   }
   export const getImageRedux = function(){
     console.log('gogogo')
   }

   export const incrementalSearch = function(array,value){
    var clone =  _.cloneDeep(array);
    var str = value;
    var res = str.split(" ");
    var newArray = clone
    var item = []
      for(var i = 0 ; i < res.length-1 ; i++ )
        {
          var item = _.filter(newArray, { consepts: [{ name: res[i] }] });
          var newArray = item
        }
       
    return item
   }
   const uuidv4 = function() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  //  async function getData(){

//   try {
//     var data = await  AsyncStorage.getItem('@MySuperStore:key')
//     if (data !== null){
//       // We have data!!
//       console.log('we have data2' ,JSON.parse(data))
//     }
//   } catch (error) {
//     console.log('get eroor' ,error)
//   }
//  }

//   function saveData(data){
//     try {
//       AsyncStorage.setItem('@MySuperStore:key',JSON.stringify(data));
//       console.log('data save')
//     } catch (error) {
//       console.log('get eroor' ,error)
//     }
//    }
  