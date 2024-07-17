import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const resetPasswordSchema = new mongoose.Schema({
  // Owner = user, [Here we are storing the user IDs]
  owner: {
    type: mongoose.Schema.Types.ObjectId, // This is how we store userIds in mongoDB using mongoose.
    ref: "User", // This is the collection reference.
    required: true, // Owner is required.
  },
  // We will store the token
  token: {
    type: String,
    required: true,
  },
  // We will remove this token after one hour.
  createdAt: {
    type: Date,
    expires: 3600, // 1hr
    default: Date.now(),
  },
});

//? ******** PASSWORD HASHING BEFORE DATA SAVE INTO COLLECTION ********
resetPasswordSchema.pre("save", async function (next) {
  //* If token is modified then call the next()
  if (!this.isModified("token")) {
    next();
  }

  //* If new user then token has to be hashed by try and catch
  try {
    const hashToken = await bcrypt.hash(this.token, 10);
    this.token = hashToken;
  } catch {
    next(error);
  }
});

//! ******** COMPARE THE REQUESTED token with EXISTED token ******** !//
resetPasswordSchema.methods.compareToken = function (comparedToken) {
  return bcrypt.compareSync(comparedToken, this.token);
};

const ResetPasswordTokenCollection = new mongoose.model(
  "ResetToken",
  resetPasswordSchema
);

export default ResetPasswordTokenCollection;
