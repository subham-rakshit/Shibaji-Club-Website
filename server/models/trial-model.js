import mongoose from "mongoose";

const trialSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  playerFirstName: {
    type: String,
    required: true,
  },
  playerLastName: {
    type: String,
    required: true,
  },
  playerDOB: {
    type: String,
    required: true,
  },
  playerGender: {
    type: String,
    required: true,
  },
  parentFirstName: {
    type: String,
    required: true,
  },
  parentLastName: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
    required: true,
  },
  parentPhoneNumber: {
    type: String,
    required: true,
  },
  playerStreetAddress: {
    type: String,
    required: true,
  },
  playerCity: {
    type: String,
    required: true,
  },
  playerState: {
    type: String,
    required: true,
  },
  playerPin: {
    type: String,
    required: true,
  },
  playerCountry: {
    type: String,
    required: true,
  },
  playerExperience: {
    type: String,
    required: true,
  },
  playerPosition: {
    type: String,
    required: true,
  },
  playerMedical: {
    type: String,
    required: true,
  },
  playerEmergencyContactName: {
    type: String,
    required: true,
  },
  playerEmergencyContactNumber: {
    type: String,
    required: true,
  },
});

const TrialCollection = new mongoose.model("Trial", trialSchema);

export default TrialCollection;
