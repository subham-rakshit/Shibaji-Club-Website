import UserCollection from "../models/user-model.js";
import bcrypt from "bcryptjs";

//! UPDATE Profile -->
export const updateUserDetails = async (req, res, next) => {
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
    return res.status(200).json({
      message: "Details updated successfully",
      userDetails: rest,
    });
  } catch (error) {
    return next(error);
  }
};

//! DELETE Profile -->
export const deleteUserDetails = async (req, res, next) => {
  //? Make user user is owner of the account.
  if (!req.user.isAdmin && req.user.userId !== req.params.userId) {
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
    if (req.user.isAdmin) {
      return res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      return res.status(200).clearCookie("jwt_token").json({
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    return next(error);
  }
};

//! SIGNOUT Profile -->
export const signOut = async (req, res, next) => {
  try {
    return res.clearCookie("jwt_token").status(200).json({
      message: "User signed out successfully",
    });
  } catch (error) {
    return next(error);
  }
};

//! Get All Users Profile -->
export const getAllUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    const authError = {
      status: 403,
      message: "Not Authenticated!",
      extraDetails: "You're not allowed to access all user details!",
    };
    return next(authError);
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const usersList = await UserCollection.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    //? usersList gives user's details with their password. We have to remove those password in respond
    const userDetailsWithoutPassword = usersList.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalNumberOfUsers = await UserCollection.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUserDetails = await UserCollection.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      users: userDetailsWithoutPassword,
      totalUsers: totalNumberOfUsers,
      lastMonthUsers: lastMonthUserDetails,
    });
  } catch (error) {
    return next(error);
  }
};

//! Get perticular user info -->
export const getUserInfo = async (req, res, next) => {
  try {
    const userInfo = await UserCollection.findById(req.params.userId);

    if (!userInfo) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    const { password, ...rest } = userInfo._doc;

    return res.status(200).json(rest);
  } catch (error) {
    return next(error);
  }
};
