
import DbConnection from "./Connection/DbConnection.js";

class DbTrans {

     static beginTransaction() {
          return DbConnection.transaction();
     }
}
export default DbTrans;