// //! ******** CREATE USER VALIDATION WITH express-validator ******** !//

import { check, validationResult } from "express-validator";

//* Login Validator middleware -->
export const validateLoginUser = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

//* Registration Validator middleware -->
export const validateRegisterUser = [
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Full Name is required!")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full Name must be 3 to 50 characters long!"),

  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),

  check("category")
    .trim()
    .notEmpty()
    .withMessage("Category is missing!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Category must be 3 to 20 characters long!"),
];

//* ERROR Handling middleware -->
export const validateUsers = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    extraDetails: errors.array()[0].msg,
  });
};
