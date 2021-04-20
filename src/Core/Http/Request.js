import UploadedFile from "../Libraries/UploadedFile.js";

class Request {
     static instance = null;
     request = null;

     
     /**
      * @param {import("express").Request} expressRequest 
      */
     constructor(expressRequest) {
          this.request = expressRequest;
     }

     /**
      * @param {import("express").Request} req 
      * @param {import("express").Response} res 
      * @param {*} next 
      */
     static request(req, res, next) {

          // if (Request.instance == null)
          req = Request.files(req);
          Request.instance = new Request(req);
          next();
     }

     /**
      * @return {Request.request}
      */
     static getInstance() {
          if(this.instance != null)
               return this.instance.request;
          return this.instance;
     }

     static files(req) {
          req.uploadedFiles = {};
          let files = req.files;

          if( req.files != null &&  req.files != undefined )
               for (const [key, value] of Object.entries(files)) {

                    req.uploadedFiles[key] = []
                    if(Array.isArray(value)){
                         value.forEach(element => {
                              let uploadedFile = new UploadedFile(element);
                              req.uploadedFiles[key].push(uploadedFile);

                         });
                    } else {

                         let uploadedFile = new UploadedFile(value);
                         req.uploadedFiles[key].push(uploadedFile);
                    }
               }

          req.getFiles = (name = null) => {
               if(name != null){
                    let uploaded = req.uploadedFiles[name];
                    if(uploaded.length > 1){
                         return uploaded;
                    }
                    return uploaded[0];
               }

               return req.uploadedFiles; 
          }

          return req;
     }

     


}

export default Request;