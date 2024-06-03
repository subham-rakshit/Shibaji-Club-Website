import UserCollection from "../models/user-model.js";

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
      const { username, email, phone, address, password, category } = req.body;

      //? Checking if user exists in DB with same email id
      const emailExists = await UserCollection.findOne({ email });
      const usernameExists = await UserCollection.findOne({ username });

      //? If user with same email id exists, then simply we return a message "Email already exists"
      if (emailExists || usernameExists) {
        if (emailExists) {
          const emailError = {
            status: 400,
            extraDetails: "Email already exists!",
          };
          next(emailError);
        } else if (usernameExists) {
          const usernameError = {
            status: 400,
            extraDetails: `This username '${username}' already exists!`,
          };
          next(usernameError);
        }
      }
      //? If user with same email id doesn't exists, then we are creating a new user in DB
      else {
        const userCreated = await UserCollection.create({
          username,
          email,
          phone,
          address,
          password,
          category,
        });

        //? We are just send a JSON message with JWT token (which is generated ny [generateToken() middleware in user-model.js file]) and userId for perticular user details to extract data.
        return res.status(201).json({
          message: "Registration successful!",
          jwt_token: await userCreated.generateToken(),
          userId: userCreated._id.toString(),
        });
      }
      //! **NOTE** : While new user data will store in database, before that we are hash the user's password (which is created in user-model.js file)
    } catch (error) {
      console.log(
        `Error in :: auth-controllers.js/registerController :: `,
        error
      );
      // return res.status(500).send({ message: "Internal Server Error!" });
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
          const { password: pass, ...rest } = userExist._doc;
          return res.status(200).json({
            message: "Login successful!",
            jwt_token: await userExist.generateToken(),
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
};

export default authControllerObject;
