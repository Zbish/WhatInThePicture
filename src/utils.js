import Clarifai from 'clarifai';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker'
import { Alert,NetInfo } from 'react-native'

// image recognition key
const app = new Clarifai.App({
  apiKey: 'b5bfcb7aba854f9da7b6d6e418d778cb'
});

// image picker options
const options = {
  title: 'Select',
  customButtons: [
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
// pick image from camera roll or from camera
export const addImage = function () {
  return new Promise((resolve, reject)=>{
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        resolve()
      }
      else if (response.error) {
        resolve()
      }
      else {
        resolve(response)
            }
    })
  })
}
// get keywords from clarifai api
export const getKeyWords = function (image) {
  return new Promise((resolve, reject) => {
    try {
      app.models.predict(Clarifai.GENERAL_MODEL, { base64: image }).then(
         (response)=>
         {
           const concepts = response.outputs[0].data.concepts
           let keywords = []
           for (let i = 0; i < concepts.length; i++) {
             keywords.push(concepts[i].name)
           }
           resolve(keywords)
         }
       )
     } catch (error) {
       resolve([]) 
     }
   
  })
}
// create item to save
export const createItem = function (keywords,imageUri,vertical){
  const guid = uuidv4()
  const time = new Date
  const item = { id: guid, image: imageUri, keywords: keywords, taken: time, vertical:vertical }
  return item
}
// check internet conection
export const checkNet = function(){
  return new Promise((resolve, reject) => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      switch(connectionInfo.type){
        case 'none':
          Alert.alert(
            'cancelled',
            'There is no Internet connection',
            [
              {text: 'OK'},
            ],
            { cancelable: false }
          )
          resolve(-1) 
        break;
        case 'cellular':
        Alert.alert(
          'For Better Performance',
          'Switch To WiFi',
          [
            {text: 'OK'},
          ],
          { cancelable: false }
        )
        resolve(1) 
        break;
        default:
        resolve(1)
      }  
  })
  })
  }

// incremental Search
export const incrementalSearch = function (array, value) {
  var clone = _.cloneDeep(array);
  var tempArray = []
  var str = value;
  var res = str.split(" ")
  for (var j = 0; j < res.length; j++) {
    for (var i = 0; i < clone.length; i++) {

      var newList = clone[i].keywords.filter((v) => {
        return v.indexOf(res[j]) !== -1;
      })

      if (newList.length > 0) {
        tempArray.push(clone[i])
      }
    }
    clone = tempArray
    tempArray = []
  }
  return clone
}

// generate unique id
const uuidv4 = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// delete image from list
export const deletepic = function (array, id) {
  var clone = _.cloneDeep(array);
  var index = _.findIndex(clone, function (o) { return o.id == id; });
  clone.splice(index, 1);
  return clone
}

// render If 
export const renderIf = function(condition, content, indicator) {
  if (condition) {
    return content;
  } else {
    return indicator;
  }
}


