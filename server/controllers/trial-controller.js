import TrialCollection from "../models/trial-model.js";

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

//* Update to confirm a specific trial -->
export const updateTrial = async (req, res, next) => {
  console.log(req.body);
  if (!req.user.isAdmin) {
    const authError = {
      status: 403,
      message: "Not Authenticated",
      extraDetails: "You are not allowed to confirm this booked trial!",
    };
    return next(authError);
  }
  try {
    const updatedTrialDetails = await TrialCollection.findByIdAndUpdate(
      req.params.trialId,
      {
        $set: {
          isConfirmed: req.body.isConfirmed,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "You have successfully confirmed this trial.",
      trialDetails: updatedTrialDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTrial = async (req, res, next) => {};
