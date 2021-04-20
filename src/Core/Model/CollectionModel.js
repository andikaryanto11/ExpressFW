import Collection from "../Libraries/Collection.js";

class CollectionModel extends Collection {

     constructor(items){
          super(items);
     }

     where(callback){
          let newdata = [];
          this.items.forEach((item, i) => {
               if (callback(item)) {
                    newdata.push(item);
               }
          });
          this.items = newdata;
          return this;
     }

}

export default CollectionModel;