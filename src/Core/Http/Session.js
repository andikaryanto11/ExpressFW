import { Express } from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

class Session {

     static instance = null;
     session = null;

     
     /**
      * @param {import("express").Request} expressRequest 
      */
     constructor(expressRequest) {
          this.session = expressRequest.session;
     }

     /**
      * @param {import("express").Request} req 
      * @param {import("express").Response} res 
      * @param {*} next 
      */
     static session(req, res, next) {

          Session.instance = new Session(req);
          next();
     }

     static getInstance() {
          if(this.instance != null)
               return this.instance.session;
          return this.instance;
     }
     /**
     * @param {Express} app 
     */
     static use(app) {
          app.use()
     }
}

export default Session;