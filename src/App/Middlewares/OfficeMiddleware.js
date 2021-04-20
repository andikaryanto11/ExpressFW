import jwt from "jsonwebtoken";
import M_users from "../Models/M_users.js";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const WebMiddleware = async function (req, res, next) {
     try {
         
               next();
     } catch (e) {
          console.log(e);
          res.send("Catch error");
     }
}

export default WebMiddleware;