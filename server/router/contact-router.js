import express from "express";
import validate from "../middlewares/validate-middleware.js";
import contactSchema from "../validator/contact-form-validator.js";
import contactController from "../controllers/contact-controller.js";

const contactRouter = express.Router();

contactRouter
  .route("/contact-us")
  .post(validate(contactSchema), contactController);

export default contactRouter;
