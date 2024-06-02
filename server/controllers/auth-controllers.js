import UserCollection from "../models/user-model.js";

const authControllerObject = {
  async homeController(req, res) {
    try {
      res.status(200).send({ message: "Welcome to Shibaji Sangha Home page!" });
    } catch (error) {
      console.log(`Error in :: auth-controller.js/HomeController :: ${error}`);
    }
  },
};

export default authControllerObject;
