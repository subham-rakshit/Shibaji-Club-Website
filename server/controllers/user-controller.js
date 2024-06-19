import UserCollection from "../models/user-model.js";
import bcrypt from "bcryptjs";

//! UPDATE Profile -->
export const updateUserDetails = async (req, res, next) => {
  // console.log(req.user);
  // console.log(req.params);

  //? Check if user is Authenticated or not -->
  if (req.user.userId !== req.params.userId) {
    const authError = {
      status: 403,
      message: "Not Authenticated",
      extraDetails: "You are not allowed to update details!",
    };
    return next(authError);
  }

  //? Check if user enter a correct password or not -->
  if (req.body.password) {
    if (req.body.password.length < 8) {
      const passError = {
        status: 401,
        message: "Invalid password",
        extraDetails: "Password must be at least 8 characters!",
      };
      return next(passError);
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
  }

  //? Check if user enters a valid username or not -->
  if (req.body.username) {
    const { username } = req.body;
    const usernameExist = await UserCollection.findOne({ username });
    console.log(usernameExist);
    if (usernameExist) {
      if (req.user.userId !== usernameExist._id.toString()) {
        const usernameError = {
          status: 401,
          message: "Invalid usernae",
          extraDetails: "Username already exists!",
        };
        return next(usernameError);
      }
    }
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      const usernameError = {
        status: 401,
        message: "Invalid username",
        extraDetails: "Username must be between 7 and 20 characters!",
      };
      return next(usernameError);
    }
    if (req.body.username.includes(" ")) {
      const spaceError = {
        status: 401,
        message: "Invalid username",
        extraDetails: "Username can not contain spaces!",
      };
      return next(spaceError);
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      const lowerCaseError = {
        status: 401,
        message: "Invalid username",
        extraDetails: "Username must be lowercase!",
      };
      return next(lowerCaseError);
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      const charError = {
        status: 401,
        message: "Invalid username",
        extraDetails: "Username can only contain letters and numbers!",
      };
      return next(charError);
    }
    if (!req.body.username.match(/^[a-zA-Z]+[0-9]+$/)) {
      const charError = {
        status: 401,
        message: "Invalid username",
        extraDetails:
          "Username can only contain letters and numbers (Ex - username123)!",
      };
      return next(charError);
    }
  }

  //? Check if user enters email is already used by someone or not -->
  if (req.body.email) {
    const { email } = req.body;
    const userExist = await UserCollection.findOne({ email });
    if (userExist) {
      if (req.user.userId !== userExist._id.toString()) {
        const emailError = {
          status: 401,
          message: "Invalid email",
          extraDetails: "Email already exists!",
        };
        return next(emailError);
      }
    }
  }

  //* Update Functionality -->
  try {
    const updateUserDetails = await UserCollection.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
          category: req.body.category,
        },
      },
      //? updateUserDetails will take the pervious info about user details. In order to get updated one then add {new: true}
      { new: true }
    );
    const { password, ...rest } = updateUserDetails._doc;
    res.status(200).json({
      message: "Details updated successfully",
      userDetails: rest,
    });
  } catch (error) {
    next(error);
  }
};

//! DELETE Profile -->
export const deleteUserDetails = async (req, res, next) => {
  //? Make user user is owner of the account.
  if (req.user.userId !== req.params.userId) {
    const deleteAuthError = {
      status: 403,
      message: "Not Authenticated",
      extraDetails: "You are not allowed to delete this account!",
    };
    return next(deleteAuthError);
  }

  //? Delete Functionality.
  try {
    await UserCollection.findByIdAndDelete(req.params.userId);
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
