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
export const chooseAnImage =  function(ImagePicker,clarifai,app){
    return  new Promise(function(resolve, reject) {
        
    ImagePicker.showImagePicker(options, (response)  => {
        
        const concepts = getImageConcepts2(Clarifai,response.data,app)
        var item = {imagePath:response.uri,consepts:concepts}

        resolve(item);

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