import nodemailer from "nodemailer";
import TrialCollection from "../models/trial-model.js";
import UserCollection from "../models/user-model.js";
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_MAIL,
  SMTP_PASSWORD,
} from "../config/envConfig.js";
import { bookedTrialEmailTemplate } from "../utils/mail.js";

//? Mail transporter from nodemailer
let transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT, // Typically 587 for TLS, 465 for SSL
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASSWORD,
  },
});

// Create new Trial booking data -->
export const createTrialDetails = async (req, res, next) => {
  const {
    playerFullName,
    playerContactNumber,
    playerDOB,
    playerGender,
    parentFirstName,
    parentLastName,
    parentEmail,
    parentPhoneNumber,
    playerStreetAddress,
    playerCity,
    playerState,
    playerPin,
    playerCountry,
    playerExperience,
    playerPosition,
    playerMedical,
    playerEmergencyContactName,
    playerEmergencyContactNumber,
  } = req.body;

  try {
    // Authentication checking -->
    if (!req.user.userId) {
      const authError = {
        status: 401,
        message: "Authentication required",
        extraDetails: "Missing or Invalid authentication credentials.",
      };
      return next(authError);
    }

    // Check Applicant already booked his trial or not -->
    const existingTrialData = await TrialCollection.find({
      userId: req.user.userId,
    });

    if (existingTrialData.length > 0) {
      const trialAlreadyBookError = {
        status: 409,
        message: "Data already present.",
        extraDetails:
          "You have already booked your trail. You will receive a confirmation shortly.",
      };

      return next(trialAlreadyBookError);
    }

    // Applicant Full Name characters check -->
    if (
      playerFullName.trim().length < 2 ||
      playerFullName.trim().length > 255
    ) {
      const applicantFullNameError = {
        status: 400,
        message: "Fill the input properly.",
        extraDetails:
          "Full Name must have atleast two characters and not more than 255 characters",
      };
      return next(applicantFullNameError);
    }

    // Applicant DOB verification. Check if he is >= 10 years or not -->
    const [year, month, day] = playerDOB.split("-").map(Number);
    const requestDate = new Date(year, month - 1, day); // months are zero-based in JS Date

    const todayDate = new Date(); // Today's date

    let applicantInitialAge =
      todayDate.getFullYear() - requestDate.getFullYear(); // Initial age
    let monthDiff = todayDate.getMonth() - requestDate.getMonth(); // Check Applicant Bday already will be arrived or not

    //* Condition means - If monthDiff is negetive. That means Bday will be arrived so, age will be age - 1. OR . (monthDiff === 0 && todayDate.getDate() < requestDate.getDate()):- means, Checks if the birth month is the same as the current month, but the birth day has not yet occurred. That situation also age - 1.

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && todayDate.getDate() < requestDate.getDate())
    ) {
      applicantInitialAge--;
    }

    if (applicantInitialAge < 10) {
      const ageError = {
        status: 401,
        message: "Applicant is less than 10 years old.",
        extraDetails:
          "Invalid date of birth. User must be at least 10 years old.",
      };
      return next(ageError);
    }

    // Applicant's Parent Full Name characters check -->
    if (
      parentFirstName.trim().length < 2 ||
      parentFirstName.trim().length > 255 ||
      parentLastName.trim().length < 2 ||
      parentLastName.trim().length > 255
    ) {
      const parentFullNameError = {
        status: 400,
        message: "Fill the input properly.",
        extraDetails:
          "Parent's Full Name must have atleast two characters and not more than 255 characters",
      };
      return next(parentFullNameError);
    }

    // Applicant's Emergency Contact Full Name characters check -->
    if (
      playerEmergencyContactName.trim().length < 2 ||
      playerEmergencyContactName.trim().length > 255
    ) {
      const emergencyContactFullNameError = {
        status: 400,
        message: "Fill the input properly.",
        extraDetails:
          "Emergency Contact Full Name must have atleast two characters and not more than 255 characters",
      };
      return next(emergencyContactFullNameError);
    }

    // Applicant's Parent email address check -->
    if (!parentEmail.trim().match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
      const parentEmailError = {
        status: 400,
        message: "Fill the input properly.",
        extraDetails:
          "Invalid email address. Please enter a valid Gmail address (e.g., example@gmail.com)",
      };
      return next(parentEmailError);
    }

    // Applicant Contact Number, Applicant's Parent and Emergency phone number check -->
    if (
      !playerContactNumber.trim().match(/^\+91\s?[6-9]\d{9}$/) ||
      !parentPhoneNumber.trim().match(/^\+91\s?[6-9]\d{9}$/) ||
      !playerEmergencyContactNumber.trim().match(/^\+91\s?[6-9]\d{9}$/)
    ) {
      const phoneNumberError = {
        status: 400,
        message: "Fill the input properly.",
        extraDetails:
          "Invalid contact number. Please enter a valid Indian contact number (e.g., +91 1234567890).",
      };
      return next(phoneNumberError);
    }

    // Applicant's Street, City Address characters check -->
    if (
      playerStreetAddress.trim().length < 2 ||
      playerStreetAddress.trim().length > 255 ||
      playerCity.trim().length < 2 ||
      playerCity.trim().length > 255
    ) {
      const emergencyContactFullNameError = {
        status: 400,
        message: "Fill the input properly.",
        extraDetails: `${
          playerStreetAddress.length < 2 || playerStreetAddress.length > 255
            ? "Street Address must have atleast two characters and not more than 255 characters"
            : "City must have atleast two characters and not more than 255 characters"
        }`,
      };
      return next(emergencyContactFullNameError);
    }

    // Applicant's PinCode characters check -->
    if (!playerPin.trim().match(/^\d{6}$/)) {
      const pincodeError = {
        status: 400,
        message: "Fill the input properly.",
        extraDetails:
          "Invalid PIN code. Please enter a valid 6-digit Indian PIN code.",
      };
      return next(pincodeError);
    }

    //* Create a new Trial Data -->
    const newTrialData = new TrialCollection({
      userId: req.user.userId,
      playerFullName: playerFullName.trim(),
      playerContactNumber: playerContactNumber.trim(),
      playerDOB: playerDOB.trim(),
      playerGender: playerGender.trim(),
      parentFirstName: parentFirstName.trim(),
      parentLastName: parentLastName.trim(),
      parentEmail: parentEmail.trim(),
      parentPhoneNumber: parentPhoneNumber.trim(),
      playerStreetAddress: playerStreetAddress.trim(),
      playerCity: playerCity.trim(),
      playerState: playerState.trim(),
      playerPin: playerPin.trim(),
      playerCountry: playerCountry.trim(),
      playerExperience: playerExperience.trim(),
      playerPosition: playerPosition.trim(),
      playerMedical: playerMedical.trim(),
      playerEmergencyContactName: playerEmergencyContactName.trim(),
      playerEmergencyContactNumber: playerEmergencyContactNumber.trim(),
    });

    try {
      await newTrialData.save();
      // We are sending these details to my email address
      transporter.sendMail({
        from: SMTP_MAIL,
        to: SMTP_MAIL,
        subject: "NEW TRIAL BOOKING FROM SHIBAJI WEBSITE",
        html: bookedTrialEmailTemplate(newTrialData),
      });

      res.status(201).json({
        message:
          "Trial booked successfully. You will receive a confirmation shortly.",
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// Get all booked Trial Data -->
export const getAllTrialsData = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const trials = await TrialCollection.find({
      //? Posts for specific person
      ...(req.query.userId && { userId: req.query.userId }),
      //? Posts for specific name
      ...(req.query.playerFirstName && {
        playerFirstName: req.query.playerFirstName,
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    //* Total number of Trials booked -->
    const totalTrials = await TrialCollection.countDocuments();

    //* Total number of Trials booked in Last Month -->
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthTrials = await TrialCollection.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    //* Send the response
    res.status(200).json({
      trials,
      totalTrials,
      lastMonthTrials,
    });
  } catch (error) {
    next(error);
  }
};

//* Update to confirm a specific trial starts -->

export const updateTrial = async (req, res, next) => {
  //? Check user is Admin or not -->
  if (!req.user.isAdmin) {
    const authError = {
      status: 403,
      message: "Not Authenticated",
      extraDetails: "You are not allowed to confirm this booked trial!",
    };
    return next(authError);
  }

  //? If User is an Admin -->
  try {
    // We will update the isConfirmed Status is DB
    const updatedTrialDetails = await TrialCollection.findByIdAndUpdate(
      req.params.trialId,
      {
        $set: {
          isConfirmed: req.body.isConfirmed,
        },
      },
      { new: true }
    );

    //? If there is no data regarding the specified trail ID -->
    if (!updatedTrialDetails) {
      return res.status(404).json({
        message: "Trial not found",
        extraDetails: "No trial found with the provided ID",
      });
    }

    //? If trail Data from specofied trial ID is confirmed -->
    if (updatedTrialDetails.isConfirmed) {
      // We are extracting the trial data's user details from trail' userId -->
      const userDetails = await UserCollection.findById(
        updatedTrialDetails.userId
      );

      // If there is no user found from that userId -->
      if (!userDetails) {
        return res.status(404).json({
          message: "User not found",
          extraDetails: "No user found with the provided ID",
        });
      }

      // If user details found -->
      const mailOptions = {
        from: SMTP_MAIL,
        to: userDetails.email,
        subject:
          "Congratulations! Your Shibaji Sangha Football Trial Has Been Confirmed",
        html: `
          <p>Dear ${updatedTrialDetails.playerFullName},</p>
          <p>
            We are thrilled to inform you that your football trial with Shibaji Sangha has been successfully confirmed! Here are the details of your trial:
          </p>
          <p>
            <strong>Location:</strong> <a href = "https://www.google.com/maps/place/Srilata+Stadium/@23.8457321,86.9007601,17z/data=!3m1!4b1!4m6!3m5!1s0x39f6d8a13eca8625:0xa9ee1f35d789136!8m2!3d23.8457321!4d86.9007601!16s%2Fg%2F11csb105c1?entry=ttu" target = "__blank">Srilata Stadium</a><br>
            <strong>Contact:</strong> +919547088296 / +917797596732
          </p>
          <p>
            We look forward to seeing you showcase your skills on the field. Please arrive at least 15 minutes before your scheduled time and bring the necessary gear, including:
          </p>
          <ul>
            <li>Football boots</li>
            <li>Shin guards</li>
            <li>Water bottle</li>
            <li>Any other personal equipment</li>
          </ul>
          <p>We will call you on your provided number for scheduling time and any further coordination.</p>
          <p>
            If you have any questions or need further information, feel free to contact us at [subhamrakshit667@gmail.com or +919547088296 / +917797596732].
          </p>
          <p>Thank you for choosing Shibaji Sangha. We wish you the best of luck at your trial!</p>
          <p>Best regards,<br>The Shibaji Sangha Team</p>
        `,
      };

      //? We are sending the main option through nodemailer transporter -->
      try {
        const info = await transporter.sendMail(mailOptions);
        // If email sending successfully then we will send a respond with text and also updated trailDetails -->
        res.status(200).json({
          message: `Trial confirmed and email sent successfully. Message will be sent: ${info.messageId}`,
          trialDetails: updatedTrialDetails,
        });
      } catch (emailError) {
        // If any error comes the we will respond accordingly -->
        console.log("Mail Sending Error: ", emailError.message);
        return res.status(500).json({
          message: "An error occurred while sending the email",
          extraDetails: emailError.message,
        });
      }
    } else {
      // We will send success updation respond without email confirmation -->
      res.status(200).json({
        message: "Trial updated successfully",
        trialDetails: updatedTrialDetails,
      });
    }
  } catch (error) {
    next(error);
  }
};
//* Update to confirm a specific trial ends -->

//* Delete a specific trial -->
export const deleteTrial = async (req, res, next) => {
  //? Check user is an admin or not
  if (!req.user.isAdmin) {
    const authError = {
      status: 403,
      message: "Not Authenticated",
      extraDetails: "You are not allowed to delete this trial!",
    };
    return next(authError);
  }
  try {
    await TrialCollection.findByIdAndDelete(req.params.trialId);
    res.status(200).json({
      message: "The trial has been deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
