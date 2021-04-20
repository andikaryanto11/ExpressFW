class UploadedFileError extends Error{
     #_message = "";
     constructor(message) {
          super(message);
          this.#_message = message;
     }

     getMessage(){
          return this.#_message;
     }
}

export default UploadedFileError;