class Response {
     static instance = null;
     response = null;

     /**
      * @param {import("express").Response} expressResponse 
      */
     constructor(expressResponse){
          this.response = expressResponse;
     }

     /**
      * @param {import("express").Request} req 
      * @param {import("express").Response} res 
      * @param {*} next 
      */
     static response(req, res, next) {
          Response.instance = new Response(res);
          next();
     }

     /**
      * @return {Response.response}
      */
     static getInstance(){
          if(this.instance != null)
               return this.instance.response;
          return this.instance;
     }
} 

export default Response;