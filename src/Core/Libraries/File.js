import DateFormat from "./DateFormat";
import UploadedFile from "./UploadedFile";
import appRoot from 'app-root-path';
import UploadedFileError from "../Errors/UploadedFileError.js";
import md5 from "md5";
import { v4 as uuidv4 } from 'uuid';

class File {

     #_files = null;
     #_destination = null;
     #_maxSize = 0;
     #_allowedType = [];
     #_errorMessage = null;
     #_urlfile = null;

     /**
      * 
      * @param {string} destination 
      * @param {number} maxSize 
      * @param {[]} allowedType 
      */
     constructor(destination, maxSize = 0, allowedType = []) {
          this.#_destination = destination;
          this.#_maxSize = maxSize * 1000;
          this.#_allowedType = allowedType;

     }

     /**
      * 
      * @param {UploadedFile} uploadedFiles 
      * @param {Function} callback 
      * @param {boolean} usePrefixName default true
      * @param {boolean} useHashName default true
      * @returns boolean
      */
     upload(uploadedFiles, usePrefixName = true, useHashName = true) {
          return new Promise((resolve, reject) => {
               this.#_files = uploadedFiles;
               if (this.#_maxSize != 0 && this.#_files.getSize() > this.#_maxSize) {
                    this.#_errorMessage = "File size is to big"
                    throw new UploadedFileError(this.#_errorMessage);
               }

               if (this.#_allowedType.length > 0) {
                    let allowed = this.#_allowedType.filter(x => x == uploadedFiles.getExtension()).length != 0;
                    if (!allowed) {
                         this.#_errorMessage = 'File type is not supported';
                         throw new UploadedFileError(this.#_errorMessage);
                    }
               }

               let nameex = '';
               if (usePrefixName) {
                    nameex = DateFormat.getFormattedCurrentDate() + "_";
               }

               let newName = "";
               if (!useHashName) {
                    // newName = $nameex . str_replace([' ', '#', '+'], ['-', '-', '-'], $files->getName());
               } else {
                    newName = nameex + md5(uuidv4()) + '.' + uploadedFiles.getExtension();
               }

               uploadedFiles.move(appRoot + "/src/" + this.#_destination + "/" + newName, err => {
                    if (err) {
                         console.log(err);
                         this.#_errorMessage = "Failed To upload file";
                         reject(new UploadedFileError(this.#_errorMessage));
                    } else {
                         this.#_urlfile = this.#_destination + "/" + newName;
                         resolve(true);
                    }
               });

          });

     }

     getFileUrl(){
          return this.#_urlfile;
     }

     addExtention(ext) {
          this.#_allowedType.push(ext);
     }
}

export default File;