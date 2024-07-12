import UserCollection from "../models/user-model.js";

const authControllerObject = {
  async homeController(req, res) {
    try {
      return res
        .status(200)
        .send({ message: "Welcome to Shibaji Sangha Home page!" });
    } catch (error) {
      console.log(`Error in :: auth-controller.js/HomeController :: ${error}`);
    }
  },

  //* Register Api Route Controller -->
  async registerController(req, res, next) {
    try {
      //? Taking requested data from users
      const { username, email, password, category } = req.body;

      //? Email is valid email or not (By Regex code) -->
      if (!email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
        const emailError = {
          status: 401,
          extraDetails: "Invalid email address!",
        };
        return next(emailError);
      }

      //? Checking if USER already exists in DB with same email id
      const userExists = await UserCollection.findOne({ email });

      //? If user with same email id exists, then simply we return a message "Email already exists"
      if (userExists) {
        const emailError = {
          status: 400,
          extraDetails: "Email already exists!",
        };
        return next(emailError);
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
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30days
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
      return next(catchError);
    }
  },

  //* Login Api Route Controller -->
  async loginController(req, res, next) {
    try {
      //* Taking request data from req.body -->
      const { email, password } = req.body;

      //* Email is valid email or not (By Regex code) -->
      if (!email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
        const emailError = {
          status: 401,
          extraDetails: "Invalid email address!",
        };
        return next(emailError);
      }

      //* Check if the user already present in DB with provide email or not -->
      const userExist = await UserCollection.findOne({ email });

      if (userExist) {
        //? Compare password is in [user-model.js] file as a middleware function
        const isPasswordValid = await userExist.passwordCompare(
          password,
          userExist.password
        );

        if (isPasswordValid) {
          //? We are seperating password field from the userDetails object.
          const { password: pass, ...rest } = userExist._doc;

          return res
            .status(200)
            .cookie("jwt_token", await userExist.generateToken(), {
              httpOnly: true,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30days
            })
            .json({
              message: "Login successful!",
              userDetails: rest,
            });
        } else {
          const error = {
            status: 401,
            extraDetails: "Invalid email or password. Please try again.",
          };
          return next(error);
        }
      } else {
        const loginError = {
          status: 400,
          extraDetails:
            "User not found. Please check your email and try again. If you don't have an account, please sign up.",
        };
        return next(loginError);
      }
    } catch (error) {
      console.log(`Error in :: auth-controller.js/loginController :: `, error);
      const catchError = {
        status: 500,
        extraDetails: "Internal Server Error!",
      };
      return next(catchError);
    }
  },

  //* Google Api Route Controller -->
  async googleController(req, res, next) {
    const { username, email, googleProfilePhotoURL } = req.body;
    try {
      const user = await UserCollection.findOne({ email });

      if (user) {
        const { password: pass, ...rest } = user._doc;

        return res
          .status(200)
          .cookie("jwt_token", await user.generateToken(), {
            httpOnly: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30days
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

        const { password: pass, ...rest } = userCreated._doc;
        return res
          .status(201)
          .cookie("jwt_token", await userCreated.generateToken(), {
            httpOnly: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30days
          })
          .json({
            message: "Registration successful!",
            userDetails: rest,
          });
      }
    } catch (error) {
      return next(error);
    }
  },
};

export default authControllerObject;
