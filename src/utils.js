import Clarifai from 'clarifai';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker'
import { Alert } from 'react-native'

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
// get image and keywords
export const getImage = function () {
  var guid = uuidv4()
  var time = new Date
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        resolve()
      }
      else if (response.error) {
        resolve()
      }
      else {
        getImageConcepts2(response.data).then((value) => {
          var item
          if(value){
            var keywords = value
            var image = response.uri
            item = { id: guid, image: image, keywords: keywords, taken: time }
          }else{
            item
          }
          resolve(item)
        })
      }

    })
  })
}

//  get keywords from  Clarifai api
const getImageConcepts2 = function (image) {
  var cons = []
  try {
    cons = app.models.predict(Clarifai.GENERAL_MODEL, { base64: image }).then(
      (response) => {
        var concepts = response.outputs[0].data.concepts
        var keywords = []
        for (var i = 0; i < concepts.length; i++) {
          keywords.push(concepts[i].name)
        }
        return keywords
      },
      (err) => {
        Alert.alert(
          'cancelled',
          'check internet connection and try again',
        )
      }
    );
  } catch (error) {
    return
  }
  return cons
}

// incremental Search
export const incrementalSearch = function (array, value) {
  var clone = _.cloneDeep(array);
  var newArray = []
  var str = value;
  var res = str.split(" ")
  for (var j = 0; j < res.length; j++) {
    for (var i = 0; i < clone.length; i++) {

      var newList = clone[i].keywords.filter((v) => {
        return v.indexOf(res[j]) !== -1;
      })

      if (newList.length > 0) {
        newArray.push(clone[i])
      }
    }
    clone = newArray
    newArray = []
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
export const deleteImage = function (array, id) {
  var clone = _.cloneDeep(array);
  var index = _.findIndex(clone, function (o) { return o.id == id; });
  clone.splice(index, 1);
  return clone
}