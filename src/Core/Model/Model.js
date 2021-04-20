import ModelError from "../../App/Errors/ModelError.js";
import Db from "../Database/Connection/DbConnection.js";
import Request from "../Http/Request.js";
import PlainObject from "../Libraries/PlainObject.js";
import CollectionModel from "./CollectionModel.js";
import DatatablesModel from "./DatatablesModel.js";
import PagingModel from "./PagingModel.js";
import ValidatorModel from "./ValidatorModel.js";

class Model {

     #_table = null;
     #_columns = null;
     #_primaryKey = null;
     #_db = null;

     constructor(table, primaryKey) {
          this.#_table = table;
          this.#_primaryKey = primaryKey;
          this.#_db = Db.table(this.#_table);
     }

     parseFromRequest(){
          let request = Request.getInstance().body;
          for (const [key, value] of Object.entries(request)) {
               if(this.getPropsName().includes(key))
                    this[key] = value;
          }
     }

     /**
      * Get one data from database by id primary key, If Data not found will reeturn null
      * @param {{}} filter 
      * @throws {Error}
      * @returns 
      */
     static find(id) {
          var instance = new this;
          var filter = {
               where: {
                    [instance.#_primaryKey]: id
               }
          };

          return new Promise((resolve, reject) => {
               instance.fetch(objects => {
                    if (objects.length > 0)
                         resolve(objects[0]);
                    else {
                         resolve(null);
                    }
               }, filter);
          })
     }

     /**
      * Get one data from database by id primary key, If Data not found will reeturn new intance
      * @param {{}} filter 
      * @throws {Error}
      * @returns 
      */
     static findOrNew(id) {
          var instance = new this;
          var filter = {
               where: {
                    [instance.#_primaryKey]: id
               }
          };

          return new Promise((resolve, reject) => {
               instance.fetch(objects => {
                    if (objects.length > 0)
                         resolve(objects[0]);
                    else {
                         resolve(instance);
                    }
               }, filter);
          })
     }

     /**
      * Get one data from database by id primary key, If Data not found will Throw Error
      * @param {{}} filter 
      * @throws {Error}
      * @returns 
      */
     static findOrFail(id) {
          var instance = new this;
          var filter = {
               where: {
                    [instance.#_primaryKey]: id
               }
          };

          return new Promise((resolve, reject) => {
               instance.fetch(objects => {
                    if (objects.length > 0)
                         resolve(objects[0]);
                    else {
                         reject(new ModelError("Data not found"));
                    }
               }, filter);
          })
     }

     /**
      * Get one data from database, If Data not found will return null
      * @param {{}} filter 
      * @throws {Error}
      * @returns 
      */
     static findOne(filter = {}) {
          var instance = new this;
          // return this.#_db.select().from(this.#_table).where({Id : 1});
          return new Promise((resolve, reject) => {
               instance.fetch(objects => {
                    if (objects.length > 0)
                         resolve(objects[0]);
                    else {
                         resolve(null);
                    }
               }, filter);
          })
     }

     /**
      * Get one data from database, If Data not found will return new instance
      * @param {{}} filter 
      * @throws {Error}
      * @returns 
      */
     static findOneOrNew(filter = {}) {
          var instance = new this;
          // return this.#_db.select().from(this.#_table).where({Id : 1});
          return new Promise((resolve, reject) => {
               instance.fetch(objects => {
                    if (objects.length > 0)
                         resolve(objects[0]);
                    else {
                         resolve(instance);
                    }
               }, filter);
          })
     }

     /**
      * Get one data from database, If Data not found will Throw Error
      * @param {{}} filter 
      * @throws {Error}
      * @returns 
      */
     static findOneOrFail(filter = {}) {
          var instance = new this;
          // return this.#_db.select().from(this.#_table).where({Id : 1});
          return new Promise((resolve, reject) => {
               instance.fetch(objects => {
                    if (objects.length > 0)
                         resolve(objects[0]);
                    else {
                         reject(new ModelError("Data not found"));
                    }
               }, filter);
          })
     }

     /**
      * Get all data from database
      * @param {*} filter 
      * @returns 
      */
     static findAll(filter = {}, columns = []) {
          var instance = new this;
          return new Promise((resolve, reject) => {
               instance.fetch(objects => {
                    resolve(objects);
               }, filter, columns);
          })
     }

     /**
      * Count reesult data from database
      * @param {{}} filter 
      * @returns 
      */
     static count(filter = {}, columns = []) {
          var instance = new this;
          return new Promise((resolve, reject) => {
               instance.fetch(objects => {
                    resolve(objects.length);
               }, filter, columns);
          })
     }

     /**
      * Collect data from datatabse
      * @param {{}} filter 
      * @returns 
      */
     static collect(filter = {}) {
          var instance = new this;
          return new Promise((resolve, reject) => {
               instance.fetch(objects => {
                    resolve(new CollectionModel(objects));
               }, filter);
          })
     }

     /**
      * Set filter before fecthing data from database
      * @param {{}} filter 
      * @returns 
      */
     setFilter(filter = {}) {

          if (filter.join != undefined) {
               for (const [key, value] of Object.entries(filter.join)) {

                    if (value.type == undefined || value.type.toUpperCase() == "INNER"){
                         this.#_db.innerJoin(key, value.key[0], value.key[1]);
                    } else {
                         if (value.type.toUpperCase() == "LEFT"){
                              this.#_db.leftJoin(key, value.key[0], value.key[1]);
                         }
                    }
                    
               }
          }

          if (filter.where != undefined) {
               this.#_db.where(filter.where);
          }

          if (filter.whereNot != undefined) {
               this.#_db.whereNot(filter.whereNot);
          }

          if (filter.whereIn != undefined) {
               for (const [key, value] of Object.entries(filter.whereIn)) {
                    this.#_db.whereIn(key, value);
               }
          }

          if (filter.like != undefined) {
               for (const [key, value] of Object.entries(filter.whereIn)) {
                    this.where(key, "like", `%${value}%`);
               }
          }

          if (filter.orLike != undefined) {
               for (const [key, value] of Object.entries(filter.whereIn)) {
                    this.orWhere(key, "like", `%${value}%`);
               }
          }

          if (filter.group != undefined) {
               if (filter.group.orLike != undefined) {
                    this.#_db.where(function () {
                         let i = 0;
                         for (const [key, value] of Object.entries(filter.group.orLike)) {
                              if (i == 0) {
                                   this.where(key, "like", `%${value}%`);
                              } else {
                                   this.orWhere(key, "like", `%${value}%`)
                              }
                              i++;
                         }
                    })
               }
          }

          if (filter.order != undefined) {
               for (const [key, value] of Object.entries(filter.order)) {
                    this.#_db.orderBy(key, value);
               }
          }

          if (filter.page != undefined && filter.size != undefined) {
               let offset = filter.size * (filter.page - 1);
               this.#_db.limit(filter.size).offset(offset);
          }

          return this;
     }

     /**
      * Fetch the data from database
      * @param {Function} callback 
      * @param {{}} filter 
      * @returns 
      */
     fetch(callback, filter = {}, columns = []) {

          this.#_columns = this.getPropsName();
          if(columns.length > 0)
               this.#_columns = columns;

          this.#_db.column(this.#_columns);

          this.setFilter(filter);
          return this.setToEntity(objects => {
               callback(objects)
          });
          // return this.#_db;
     }

     /**
      * Set to instance of current class
      * @param {Function} callback 
      */
     setToEntity(callback) {
          // console.log(this.#_db.toSQL().toNative());
          this.#_db.then(results => {
               let objects = [];
               let newClassName = this.constructor;
               results.forEach((e, i) => {
                    let obj = new newClassName();
                    for (const [key, value] of Object.entries(e)) {
                         obj[key] = value;
                    }
                    objects.push(obj)
               })
               callback(objects);
          });
     }

     /**
      * Set to plain object
      * @return {{}}
      */
     toJson() {
          let json = {};
          for (const [key, value] of Object.entries(this)) {
               json[key] = value;
          }
          return json;
     }

     /**
      * Save data when your primary key of instance is not set otherwise will update 
      * @param {*} transaction 
      * @param {*} isIncrement 
      * @returns 
      */
     async save(transaction = null, isIncrement = true) {

          var obj = this;
          const primaryKey = obj.#_primaryKey;
          const table = obj.#_table;
          let result = null;
          if (obj[primaryKey] == null) {

               if (transaction != null)
                    result = Db.transacting(transaction).into(table).insert(obj);
               else
                    result = Db.into(table).insert(obj);
               let id = await result;
               this[primaryKey] = id[0];
               if (id[0] > 0)
                    return true;
               return false;
          } else {
               if (transaction != null)
                    result = Db.table(table).transacting(transaction).where(primaryKey, obj[primaryKey]).update(obj);
               else
                    result = Db.table(table).where(primaryKey, obj[primaryKey]).update(obj);

               await result;
               return true;
          }

     }

     /**
      * Delete data from current instance
      * @param {*} transaction 
      * @returns 
      */
     async delete(transaction = null) {

          const primaryKey = obj.#_primaryKey;
          const table = obj.#_table;
          let ret = null;
          if (transaction != null)
               ret = await Db.transacting(transaction).table(table).where(primaryKey, obj[primaryKey]).del();
          else
               ret = await Db.table(table).where(primaryKey, obj[primaryKey]).del();
          if (ret > 0)
               return true;
          return false;
     }

     /**
     * @param string relatedEloquent Relates Table 
     * @param string foreignKey key name of this Eloquent
     * @return Object or null
     * 
     * Get parent related table data
     */
     async hasOne(relatedEloquent, foreignKey, filter = {}) {
          let result = null;
          if (this[foreignKey] != null) {
               if (PlainObject.isEmpty(filter)) {
                    result = await relatedEloquent.find(this[foreignKey]);
                    return result;
               } else {
                    if (filter.where != undefined) {
                         filter.where[foreignKey] = this[foreignKey];
                    } else {
                         filter.where = {
                              [foreignKey]: this[foreignKey]
                         };
                    }
                    result = await relatedEloquent.findOne(filter);
                    return result;
               }
          }

          return null;
     }

     /**
      * @param string relatedEloquent Relates Table 
      * @param string foreignKey key name of this Eloquent
      * @return Object or new Instance
      * 
      * Get parent related table data
      */
     async hasOneOrNew(relatedEloquent, foreignKey, filter = {}) {
          let result = await this.hasOne(relatedEloquent, foreignKey, filter);
          if (result != null) {
               return result;
          }
          return new relatedEloquent();
     }

     /**
      * @param string relatedEloquent Relates Table 
      * @param string foreignKey key name of this Eloquent
      * @return Object or Throw Error
      * 
      * Get parent related table data
      */
     async hasOneOrFail(relatedEloquent, foreignKey, filter = {}) {
          let result = await this.hasOne(relatedEloquent, foreignKey, filter);
          if (result != null) {
               return result;
          }
          throw new ModelError("Data not Found")
     }

     /**
     * @param string relatedEloquent Relates Table \App\Eloquent\YourClass
     * @param string foreignKey key name of related Eloquent
     * @param string filter param to filter data
     * @return Eloquent array Object or null
     * 
     * Get child related table data
     */
     async hasMany(relatedEloquent, foreignKey, filter = {}) {
          const primaryKey = this.#_primaryKey;
          if (this[primaryKey] != null) {
               if (filter.where != undefined) {
                    filter.where[foreignKey] = this[primaryKey];
               } else {
                    filter.where = {
                         [foreignKey]: this[primaryKey]
                    };
               }
               let result = await relatedEloquent.findAll(filter);
               if (result.length > 0) {
                    return result;
               }
          }
          return null;
     }

     /**
     * @param string relatedEloquent Relates Table \App\Eloquent\YourClass
     * @param string foreignKey key name of related Eloquent
     * @param string filter param to filter data
     * @return Eloquent array Object or Throw Error
     * 
     * Get child related table data
     */
     async hasManyOrFail(relatedEloquent, foreignKey, filter = {}) {
          let result = await this.hasMany(relatedEloquent, foreignKey, filter);
          if (result != null) {
               return result;
          }
          throw new ModelError("Data List Not Found");
     }

     /**
     * @param {Class} relatedEloquent Relates Table \App\Eloquent\YourClass
     * @param {string} foreignKey key name of related Eloquent
     * @param {string} filter param to filter data
     * @return Eloquent array Object or null
     * 
     * Get child related table data
     */
     async hasFirst(relatedEloquent, foreignKey, filter = []) {

          const primaryKey = this.#_primaryKey;
          if (this[primaryKey] != null) {
               if (filter.where != undefined) {
                    filter.where[foreignKey] = this[primaryKey];
               } else {
                    filter.where = {
                         [foreignKey]: this[primaryKey]
                    };
               }
               let result = await relatedEloquent.findAll(filter);
               if (result.length > 0) {
                    return result[0];
               }
          }
          return null;
     }

     /**
     * @param string relatedEloquent Relates Table \App\Eloquent\YourClass
     * @param string foreignKey key name of related Eloquent
     * @param string filter param to filter data
     * @return Eloquent array Object or new instance
     * 
     * Get child related table data
     */
     async hasFirstOrNew(relatedEloquent, foreignKey, filter = {}) {
          let result = await this.hasFirst(relatedEloquent, foreignKey, filter);
          if (result != null) {
               return result;
          }
          return new relatedEloquent();
     }

     /**
     * @param string relatedEloquent Relates Table \App\Eloquent\YourClass
     * @param string foreignKey key name of related Eloquent
     * @param string filter param to filter data
     * @return Eloquent array Object or throw Error
     * 
     * Get child related table data
     */
     async hasFirstOrFail(relatedEloquent, foreignKey, filter = {}) {
          let result = await this.hasFirst(relatedEloquent, foreignKey, filter);
          if (result != null) {
               return result;
          }
          throw new ModelError("Data Not Found");
     }


     /**
      * 
      * @param {{}} rules 
      * @param {{}} customError 
      * @returns 
      */
     validateRules(rules, customError = {}) {
          return ValidatorModel.validate(this.toJson(), rules, customError);
     }

     /**
      * Get object datatable
      * @param {import("express").Request} request
      * @param {{}} filter
      */
     static datatables(filter = {}, method = "POST") {
          return new DatatablesModel(this, filter, method)
     }

     /**
      * Check data wether is saved or not.
      * If your table has no auto increment on it then this method is not considered to be valid.
      * This method is valid when your table has auto incerement primary key
      */
     isSaved() {
          return this[this.#_primaryKey] != null;
     }

     /**
      * Get object paging
      * @param {import("express").Request} request
      * @param {{}} filter
      */
     static async paginate(filter = {}, page = 1, size = 6, showedPage = 5, queryParams = {}) {
          return await new PagingModel(this, filter, page, size, showedPage, queryParams).fetch();
     }

     /**
      * Get array of props name
      */
     getPropsName() {
          return Object.getOwnPropertyNames(this);
     }

}

export default Model;