import Validator from "validatorjs";

class ValidatorModel {

     static validate(object, rules, customError = {}){
          let validator = new Validator(object, rules, customError);
          return validator;
     }
}

export default ValidatorModel;