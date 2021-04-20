import Request from "../Http/Request.js";

class UploadedFile {
     #_item = null;
     constructor(item){
          this.#_item = item;
     }

     getItem(){
          return this.#_item;
     }

     getName(){
          return this.#_item.name;
     }

     getExtension(){
          return this.getName().split(".")[1];
     }

     getSize(){
          return this.#_item.size;
     }

     getMimeType(){
          return this.#_item.mimetype;
     }

     move(uploadPath, callback){
          return this.#_item.mv(uploadPath, callback);
     }
}

export default UploadedFile;