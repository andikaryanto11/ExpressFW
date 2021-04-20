class ModelError extends Error {
     #_message = null;
     #_model = null;

     constructor(message, model = null) {
          super(message);
          this.#_message = message;
          this.#_model = model;
     }

     getMessage(){
          return this.#_message;
     }

     getModel(){
          return this.#_model;
     }
}

export default ModelError;