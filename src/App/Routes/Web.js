
import { Router } from "express";
import BaseController from "../Controllers/BaseController";

const Web = () => {
     let webRootRoute = Router();

     webRootRoute.use("/", BaseController.index)
     return webRootRoute;
}
export default Web;