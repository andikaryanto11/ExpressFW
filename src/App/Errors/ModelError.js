
class ModelError extends Error {

     model = null
     
     constructor(message, model = null){
          super(message)
          this.model = model;
     }
}

export default ModelError;