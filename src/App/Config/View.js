import { Express } from 'express';
import appRoot from 'app-root-path';
class View {
     /**
      * 
      * @param {Express} app 
      */
     static set(app){

          app.set('view engine', 'pug');
          app.set('views', appRoot + '/src/App/Views');
     }
} 
export default View;