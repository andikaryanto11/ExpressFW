
import { Express } from 'express';
import dotenv from 'dotenv';
import Application from '../App/Config/Application';
dotenv.config();
class App {
     /**
     * 
     * @param {Express} app 
     * @param {Express} express
     */
     static run(app, express){
          
          Application.init(app, express);
          app.listen(process.env.APP_PORT, () => console.log(`Server Up And Running. Listening On Port ${process.env.APP_PORT}`));
     }
}

export default App;