class PlainObject {
     
     /**
      * Check plain object is empty
      * @param {{}} object 
      */
     static isEmpty(object = {}){
          return Object.keys(object).length === 0;
     }
}

export default PlainObject;