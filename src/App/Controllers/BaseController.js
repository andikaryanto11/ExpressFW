class BaseController {

     /**
     * GET /
     * @param {import("express").Request} req 
     * @param {import("express").Response} res /
     */
      static async index(req, res) {
         res.send("This my controller")
      }

     
}

export default BaseController;     