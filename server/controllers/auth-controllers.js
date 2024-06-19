import UserCollection from "../models/user-model.js";
import jwt from "jsonwebtoken";

const authControllerObject = {
  async homeController(req, res) {
    try {
      res.status(200).send({ message: "Welcome to Shibaji Sangha Home page!" });
    } catch (error) {
      console.log(`Error in :: auth-controller.js/HomeController :: ${error}`);
    }
  },

  //* Register Api Route Controller -->
  async registerController(req, res, next) {
    try {
      //? Taking requested data from users
      const { username, email, password, category } = req.body;

      //? Checking if user exists in DB with same email id
      const userExists = await UserCollection.findOne({ email });

      //? If user with same email id exists, then simply we return a message "Email already exists"
      if (userExists) {
        const emailError = {
          status: 400,
          extraDetails: "Email already exists!",
        };
        next(emailError);
      }
      //? If user with same email id doesn't exists, then we are creating a new user in DB
      else {
        const userCreated = await UserCollection.create({
          username:
            username.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email: email.trim(),
          password: password.trim(),
          category,
        });
        const { password: pass, ...rest } = userCreated._doc;

        //? We are just send a JSON message with JWT token (which is generated ny [generateToken() middleware in user-model.js file]) and userId for perticular user details to extract data.
        return res
          .status(201)
          .cookie("jwt_token", await userCreated.generateToken(), {
            httpOnly: true,
          })
          .json({
            message: "Registration successful!",
            userDetails: rest,
          });
      }
      //! **NOTE** : While new user data will store in database, before that we are hash the user's password (which is created in user-model.js file)
    } catch (error) {
      console.log(
        `Error in :: auth-controllers.js/registerController :: `,
        error
      );
      const catchError = {
        status: 500,
        extraDetails: "Internal Server Error",
      };
      next(catchError);
    }
  },

  //* Login Api Route Controller -->
  async loginController(req, res, next) {
    try {
      const { email, password } = req.body;
      const userExist = await UserCollection.findOne({ email });

      if (userExist) {
        // Compare password is in user-model.js file as a middleware function
        const isPasswordValid = await userExist.passwordCompare(
          password,
          userExist.password
        );

        if (isPasswordValid) {
          //* We are seperating password field from the userDetails object.
          const { password: pass, ...rest } = userExist._doc;

          return res
            .status(200)
            .cookie("jwt_token", await userExist.generateToken(), {
              httpOnly: true,
            })
            .json({
              message: "Login successful!",
              userDetails: rest,
            });
        } else {
          const error = {
            status: 401,
            extraDetails: "Invalid Credentials!",
          };
          next(error);
        }
      } else {
        const loginError = {
          status: 400,
          extraDetails: "User not found!",
        };
        next(loginError);
      }
    } catch (error) {
      console.log(`Error in :: auth-controller.js/loginController :: `, error);
      const catchError = {
        status: 500,
        extraDetails: "Internal Server Error!",
      };
      next(catchError);
    }
  },

  //* Google Api Route Controller -->
  async googleController(req, res, next) {
    const { username, email, googleProfilePhotoURL } = req.body;
    try {
      const user = await UserCollection.findOne({ email });

      if (user) {
        const token = jwt.sign(
          {
            userId: user._id.toString(),
            email: user.email,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SIGNATURE,
          {
            expiresIn: "30d",
          }
        );
        const { password: pass, ...rest } = user._doc;

        return res
          .status(200)
          .cookie("jwt_token", token, {
            httpOnly: true,
          })
          .json({
            message: "Login successful!",
            userDetails: rest,
          });
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const userCreated = await UserCollection.create({
          username:
            username.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email: email.trim(),
          password: generatedPassword,
          category: "General",
          profilePicture: googleProfilePhotoURL,
        });

        const token = jwt.sign(
          {
            userId: userCreated._id.toString(),
            email: userCreated.email,
            isAdmin: userCreated.isAdmin,
          },
          process.env.JWT_SIGNATURE,
          {
            expiresIn: "30d",
          }
        );

        const { password: pass, ...rest } = userCreated._doc;
        return res
          .status(201)
          .cookie("jwt_token", token, {
            httpOnly: true,
          })
          .json({
            message: "Registration successful!",
            // jwt_token: token,
            userDetails: rest,
          });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default authControllerObject;
