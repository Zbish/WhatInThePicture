import Clarifai from 'clarifai';

export const options = {
    title: 'Select',
    customButtons: [
    //   {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
export const chooseAnImage = function(ImagePicker){
    return  new Promise(function(resolve, reject) {
    ImagePicker.showImagePicker(options, (response)  => {
        resolve(response.data);
       });
  });
   
}

export const getImageConcepts2 = function(Clarifai,image,app){
    
    return  new Promise(function(resolve, reject) {
        app.models.predict(Clarifai.GENERAL_MODEL, {base64: image}).then(
            function(response) {
             resolve(response.outputs[0].data.concepts)
            },
            function(err) {
           
            }
          );
      });
    
  
  }