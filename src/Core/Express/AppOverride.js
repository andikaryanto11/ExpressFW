import Request from "../Http/Request.js";
import Response from "../Http/Response.js";
import { Express } from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import Session from "../Http/Session.js";
import { v4 as uuidv4 } from 'uuid';
import DbConnection from "../Database/Connection/DbConnection.js";
import Web from "../../App/Routes/Web.js";
import Api from "../../App/Routes/Api.js";
import Kernel from "../../App/Config/Kernel.js";
import csrf from 'csurf';
const KnexSessionStore = require('connect-session-knex')(session);

class AppOverride {

     /**
      * 
      * @param {Express} app 
      */
     static override(app) {
          AppOverride.use(app);
          // AppOverride.csrf(app);
          AppOverride.middleware(app);
     }

     /**
      * 
      * @param {Express} app 
      */
     static use(app) {
          app.use(fileUpload());
          app.use(Request.request);
          app.use(Response.response);

          const store = new KnexSessionStore({
               tablename: 'sessions',
               createtable: true,
               knex: DbConnection
          });

          app.use(session({
               name: process.env.SESSION_NAME,
               genid: function (req) {
                    return uuidv4(); // use UUIDs for session IDs
               },
               cookie: {
                    secure: process.env.APP_MODE == 'production' ? process.env.COOKIE_SECURE : false,
                    httpOnly: process.env.COOKIE_HTTP_ONLY,
                    maxAge: Number(process.env.COOKIE_EXPIRED) * 1000,

               },
               secret: process.env.APP_KEY,
               store
          }));
          app.use(Session.session);
          // app.use(csrf({
          //      cookie :true,
          //      ignoreMethods : ["GET", 'HEAD', 'OPTIONS']
          // }))
          
     }

     /**
      * 
      * @param {Express} app 
      */
     static middleware(app){
          app.use("/", [...Kernel.middlewares, ...Kernel.middlewareGroups.web], Web());
          app.use("/api", [...Kernel.middlewares, ...Kernel.middlewareGroups.api], Api());
     }

     /**
      * 
      * @param {Express} app 
      */
     static csrf(app){
          
     }

}

export default AppOverride;