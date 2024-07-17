import UserCollection from "../models/user-model.js";
import {
  generateOTP,
  generateOTPEmailTemplate,
  mailTransport,
  plainEmailTemplate,
} from "../utils/mail.js";
import VerificationTokenCollection from "../models/email-verification-token-model.js";
import { SMTP_MAIL } from "../config/envConfig.js";
import { isValidObjectId } from "mongoose";
import bcrypt from "bcryptjs";

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

  //* Cookies Token Check -->
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
