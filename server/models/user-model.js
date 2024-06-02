import mongoose from "mongoose";
import { JWT_SIGNATURE } from "../config/envConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//! ******** PASSWORD HASHING BEFORE DATA SAVE INTO COLLECTION ******** !//
userSchema.pre("save", async function (next) {
  const user = this; // this = user creation data

  // If password is mpdified then call the next()
  if (!user.isModified("password")) {
    next();
  }

  // If new user comes then password has to be hashed by try and catch
  try {
    const hashPasswod = await bcrypt.hash(user.password, 10);
    user.password = hashPasswod;
  } catch {
    next(error);
  }
});

//! ******** CREATE JWT TOKEN AND RETURN IT FOR REGISTER ******** !//
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        phone: this.phone,
        isAdmin: this.isAdmin,
      },
      JWT_SIGNATURE,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//! ******** COMPARE THE REQUESTED with EXISTED PASSWORD ******** !//
userSchema.methods.passwordCompare = function (password, comparePassword) {
  return bcrypt.compare(password, comparePassword);
};

const UserCollection = new mongoose.model("User", userSchema);

export default UserCollection;
