import Model from "../../Core/Model/Model.js";

class BaseModel extends Model {
     constructor(table, primaryKey){
          super(table, primaryKey)
     }

}

export default BaseModel;