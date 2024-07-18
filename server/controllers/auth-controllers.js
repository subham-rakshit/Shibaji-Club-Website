import UserCollection from "../models/user-model.js";
import {
  generateOTP,
  generateOTPEmailTemplate,
  mailTransport,
  plainEmailTemplate,
  resetTokenEmailTemplate,
} from "../utils/mail.js";
import VerificationTokenCollection from "../models/email-verification-token-model.js";
import { JWT_SIGNATURE, SMTP_MAIL } from "../config/envConfig.js";
import { isValidObjectId } from "mongoose";
import bcrypt from "bcryptjs";
import ResetPasswordTokenCollection from "../models/reset-password-model.js";
import jwt from "jsonwebtoken";

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
          message: "User already registered.",
          extraDetails:
            "It looks like you're already registered. Please login to your account.",
        };
        return next(emailError);
      }

      //? If user with same email id doesn't exists, then we are creating a new user in DB
      const userCreated = new UserCollection({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email.trim(),
        password: password.trim(),
        category,
      });

      //? Generate an OTP for email verification -->
      const OTP = generateOTP();

      //? We are calling the VerificationTokenCollection to store the registered user's id and token (before store this token will hashed then store) in DB
      const verificationToken = new VerificationTokenCollection({
        owner: userCreated._id, // new user's id
        token: OTP, // 4 digits OTP as token
      });

      //? We saving the userId and token in DB for email verification
      await verificationToken.save();

      //? We are also saving the user info for initial. (Means before email verification)
      await userCreated.save();

      //? We are sending the OTP in user's provided email address. (mailTransport() and generateOTPEmailTemplate() are in mail.js file)
      mailTransport().sendMail({
        from: SMTP_MAIL,
        to: userCreated.email,
        subject: "VERIFY YOUR EMAIL ACCOUNT",
        html: generateOTPEmailTemplate(OTP),
      });

      //? We are just extracting the user's password and send userinfo with success message
      const { password: pass, ...rest } = userCreated._doc;
      return res
        .status(201)
        .cookie("jwt_token", await userCreated.generateToken(), {
          httpOnly: true,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })
        .json({
          message:
            "Your account has been created! An OTP has been sent to your email address.",
          userDetails: rest,
        });

      //* NOTE : While new user data will store in database, before that we are hash the user's password (which is created in user-model.js file)
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
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30days  (d * h * m * s * ms)
            })
            .json({
              message: "Welcome back! You have successfully logged in.",
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
    // Destructure username, email and googleProfilePhotoURL from req.body
    const { username, email, googleProfilePhotoURL } = req.body;
    try {
      // User already exists with provided email address on not
      const user = await UserCollection.findOne({ email });

      // If user already exists then we simply extract the password from user info docs and send response as Login Successfully. As Login feature.
      if (user) {
        const { password: pass, ...rest } = user._doc;

        return res
          .status(200)
          .cookie("jwt_token", await user.generateToken(), {
            httpOnly: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30days (d * h * m * s * ms)
          })
          .json({
            message: "Welcome back! You have successfully logged in.",
            userDetails: rest,
          });
      } else {
        // If user not exist, then simply create a new user. As Registraion feature

        // We initially generate a random password
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);

        // We create a new User
        const userCreated = new UserCollection({
          username:
            username.trim().toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email: email.trim(),
          password: generatedPassword,
          category: "General",
          profilePicture: googleProfilePhotoURL,
        });

        // Generate an OTP for email verification -->
        const OTP = generateOTP();

        // We are calling the VerificationTokenCollection to store the registered user's id and token (before store this token will hashed then store) in DB
        const verificationToken = new VerificationTokenCollection({
          owner: userCreated._id, // new user's id
          token: OTP, // 4 digits OTP as token
        });

        // We saving the userId and token in DB for email verification
        await verificationToken.save();

        // We are also saving the user info for initial. (Means before email verification)
        await userCreated.save();

        // We are sending the OTP in user's provided email address. (mailTransport() and generateOTPEmailTemplate() are in mail.js file)
        mailTransport().sendMail({
          from: SMTP_MAIL,
          to: userCreated.email,
          subject: "VERIFY YOUR EMAIL ACCOUNT",
          html: generateOTPEmailTemplate(OTP),
        });

        // We are just extracting the user's password and send userinfo with success message
        const { password: pass, ...rest } = userCreated._doc;
        return res
          .status(201)
          .cookie("jwt_token", await userCreated.generateToken(), {
            httpOnly: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30days
          })
          .json({
            message:
              "Your account has been created! An OTP has been sent to your email address.",
            userDetails: rest,
          });
      }
    } catch (error) {
      return next(error);
    }
  },

  //* Verify the user's provided OTP for Emial Verification -->
  async verifyEmail(req, res, next) {
    const { userId, otp } = req.body;

    // If userId and OTP is not present -
    if (!userId || !otp.trim()) {
      const verifyError = {
        status: 400,
        message: "Invalid parameters for Varification token collection.",
        extraDetails: "Invalid request, missing parameters!",
      };

      return next(verifyError);
    }

    // Prvided userId is valid MongoDB ObjectId or not. MongoDB ObjectIds are 12-byte identifiers typically represented as 24-character hexadecimal strings.
    if (!isValidObjectId(userId)) {
      const verifyError = {
        status: 400,
        message: "Invalid userId for Varification token collection.",
        extraDetails: "Invalid user ID!",
      };

      return next(verifyError);
    }

    // If all checks passed successfully then, we are finding the user in UserCollection by the provided id.
    const user = await UserCollection.findById(userId);

    // If user info not found
    if (!user) {
      const notFOundError = {
        status: 404,
        message: "User is not present in the UserCollection",
        extraDetails: "User not found!",
      };

      return next(notFOundError);
    }

    // If account verification already done
    if (user.verified) {
      const alreadyVerified = {
        status: 400,
        message: "User is already verified",
        extraDetails: "This account is already verified!",
      };
      return next(alreadyVerified);
    }

    // Find the hashed token of the OTP in VerificationTokenCollection for comparison
    const dbToken = await VerificationTokenCollection.findOne({
      owner: user._id,
    });

    // Check the token is present or not. If not that means token has been expired
    if (!dbToken) {
      await UserCollection.findByIdAndDelete(userId); // We are deleting the existing User info without verified.
      const tokenError = {
        status: 404,
        message: "Token removed.",
        extraDetails:
          "We couldn't find your account. Join us now by signing up!",
      };

      return next(tokenError);
    }

    // Lets compare the provided OTP with our stored hashed OTP token
    const comparisonStatus = await dbToken.compareToken(otp.trim());

    // If provided OTP and stored hashed token is not matched
    if (!comparisonStatus) {
      const tokenNotMatched = {
        status: 403, // Forbidden (Due to authentication or authorization failures, including mismatched tokens.)
        message: "Token is not matched.",
        extraDetails: "Invalid OTP. Please provide a valid OTP!",
      };

      return next(tokenNotMatched);
    }

    // If all checks are passed, then we modify the use info and save it (verified: false -> verified: true)
    user.verified = true;
    await user.save();

    // After verification we are delete the token details inside our DB (VerificationTokenCollection)
    await VerificationTokenCollection.findByIdAndDelete(dbToken._id);

    // Sending a welcome mail after successfully verification
    mailTransport().sendMail({
      from: SMTP_MAIL,
      to: user.email,
      subject: "WELCOME EMAIL",
      html: plainEmailTemplate(
        "Email Verification Successful",
        "Congratulations! Your email has been successfully verified. Thank you for verifying your email with us. You can now enjoy all the benefits of our service."
      ),
    });

    // Extract the password from the user docs
    const { password, ...rest } = user._doc;

    // Send the rest user info and success msg as response
    res.status(201).json({
      message:
        "Your email has been successfully verified. You can now access all features.",
      userDetails: rest,
    });
  },

  //* Resend OTP in user's email address -->
  async resendToken(req, res, next) {
    const { userId, email } = req.body;
    try {
      // If userId is not present -
      if (!userId) {
        const verifyError = {
          status: 400,
          message: "Invalid parameters for Varification token collection.",
          extraDetails: "Invalid request, missing parameters!",
        };

        return next(verifyError);
      }

      const dbToken = await VerificationTokenCollection.findOne({
        owner: userId,
      });

      // Check the token is present or not. If not that means token has been expired
      if (!dbToken) {
        await UserCollection.findByIdAndDelete(userId); // We are deleting the existing User info without verified.
        const tokenError = {
          status: 404,
          message: "Token removed.",
          extraDetails:
            "We couldn't find your account. Join us now by signing up!",
        };

        return next(tokenError);
      }

      // Generate a new token
      const newOTP = generateOTP();

      const hashedToken = await bcrypt.hash(newOTP, 10); // Hashed the newOTP

      // Update the token in VerificaitonTokenCollection
      await VerificationTokenCollection.updateOne(
        { owner: userId },
        {
          $set: {
            token: hashedToken,
          },
        },
        { new: true }
      );

      // We are sending the OTP in user's provided email address. (mailTransport() and generateOTPEmailTemplate() are in mail.js file)
      mailTransport().sendMail({
        from: SMTP_MAIL,
        to: email,
        subject: "RESEND OTP REQUEST: VERIFY YOUR EMAIL ADDRESS",
        html: generateOTPEmailTemplate(newOTP),
      });

      // Resond
      res.status(200).json({
        message:
          "We've resent the OTP. Please check your email and enter it to complete verification.",
      });
    } catch (error) {
      next(error);
    }
  },

  //* Provide more than 3 times of valid OTP (We have to remove the user info) -->
  async removeUser(req, res, next) {
    const { userId } = req.body;

    await VerificationTokenCollection.deleteOne({ owner: userId });
    await UserCollection.findByIdAndDelete(userId);

    return res.status(403).json({
      message: "Too many invalid OTP attempts",
      extraDetails:
        "Your account has been reset due to multiple invalid OTP entries. Please register again.",
    });
  },

  //* Forget Password controller -->
  async forgetPassword(req, res, next) {
    const { email } = req.body;
    try {
      //Check if the email is provided or not.
      if (!email) {
        const emailError = {
          status: 401,
          message: "Email not provided.",
          extraDetails:
            "Email address is required. Please enter your email to proceed.",
        };
        return next(emailError);
      }

      // Chek if the email is valid email pattern or not
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        const emailError = {
          status: 401,
          message: "Email pattern not valid",
          extraDetails:
            "Email address is invalid. Please enter your valid email to proceed.",
        };
        return next(emailError);
      }

      // Verify the existence of an user with the provided email address
      const user = await UserCollection.findOne({ email });
      if (!user) {
        const userError = {
          status: 401,
          message: "User not registered.",
          extraDetails:
            "No account found with the provided email address. Please check the email and try again or register for a new account.",
        };
        return next(userError);
      }

      // If token already present, then user can use the token link within 1 hr.
      const tokenExists = await ResetPasswordTokenCollection.findOne({
        owner: user._id,
      });
      if (tokenExists) {
        const tokenError = {
          status: 409, // Duplicate Entries (Conflict)
          message: "Token already exists.",
          extraDetails:
            "A reset password link has already been send to your email address. You can request a new link after one hour.",
        };
        return next(tokenError);
      }

      // Generate a token
      const token = await jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
          isAdmin: user.isAdmin,
        },
        JWT_SIGNATURE,
        { expiresIn: "1h" }
      );

      // We are create and save the new reset token in RestTokens collection
      const newResetToken = new ResetPasswordTokenCollection({
        owner: user._id,
        token,
      });
      await newResetToken.save();

      await mailTransport().sendMail({
        from: SMTP_MAIL,
        to: email,
        subject: "RESET PASSWORD",
        html: resetTokenEmailTemplate(
          `http://localhost:5173/reset-password?token=${token}&id=${user._id}`
        ),
      });

      res.status(201).json({
        message:
          "A password reset link has been sent to your email. Please check your inbox (and spam folder) for further instructions.",
      });
    } catch (error) {
      next(error);
    }
  },

  //* Reset password controller -->
  async resetPassword(req, res, next) {
    const { token, id } = req.query;
    const { confirmPassword } = req.body;

    try {
      // Check the token, id and password are present
      if (!token || !id || !confirmPassword) {
        const payloadError = {
          status: 400,
          message: "Token, id and password are required",
          extraDetails: "Invalid request payload!",
        };

        return next(payloadError);
      }

      // Check the id is valid
      if (!isValidObjectId(id)) {
        const userIdError = {
          status: 401,
          message: "Invalid user ID",
          extraDetails: "Invalid user ID!",
        };

        return next(userIdError);
      }

      // Check the user info is present of the provided userID
      const user = await UserCollection.findById(id);
      if (!user) {
        const userError = {
          status: 401,
          message: "User not authenticated",
          extraDetails:
            "We couldn't find your account. Join us now by signing up!",
        };
        return next(userError);
      }

      // Check the token is expired or not
      const resetDbToken = await ResetPasswordTokenCollection.findOne({
        owner: user._id,
      });
      if (!resetDbToken) {
        const tokenExpired = {
          status: 401,
          message: "Token expired or not register yet",
          extraDetails:
            "Invalid or expired token. Please request a new password reset link.",
        };

        return next(tokenExpired);
      }

      // Compare the provided token with the dbToken
      const tokenCompareStatus = await resetDbToken.compareToken(token);
      if (!tokenCompareStatus) {
        const tokenError = {
          status: 401,
          message: "Invalid token",
          extraDetails: "Invalid token!",
        };

        return next(tokenError);
      }

      // Check if user provided his old password or not
      const isSamePassword = await user.passwordCompare(
        user.password,
        confirmPassword
      );
      if (isSamePassword) {
        const samePassError = {
          status: 400,
          message: "New and Old password is same.",
          extraDetails: "New password cannot be the same as the old password!",
        };

        return next(samePassError);
      }

      // If all checks are successful then we change the user's password
      user.password = confirmPassword;
      await user.save();

      // Remove the resetDBToken from ResetPasswordTokenCollection
      await ResetPasswordTokenCollection.findByIdAndDelete(resetDbToken._id);

      res.status(200).json({
        message:
          "Your password has been successfully changed. Please sign in again to continue.",
      });
    } catch (error) {
      next(error);
    }
  },

  //* Cookies JWT Token Check -->
  async checkRequestingToken(req, res, next) {
    const jwtToken = req.cookies.jwt_token;
    try {
      if (!jwtToken) {
        return res.status(401).json({
          status: false,
          message: "Auth expeired.",
          extraDetails: "Session expired.",
        });
      } else {
        return res.status(200).json({
          status: true,
        });
      }
    } catch (error) {
      return next(error);
    }
  },
};

export default authControllerObject;
