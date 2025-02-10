import dotenv from 'dotenv';
dotenv.config();

import { Schema, model, Types, Document } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


import { 
  availableUserRoles, 
  userRolesEnum,
  authProvider
} from "../utils/constants";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "secretesfjsadjflsajfsa"
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "secretessfsadfhsafh"
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "3h"; 

import { IUser, IUserDocument } from '../types/interfaces';


const userSchema = new Schema<IUser>({
  avatar: {
    type: {
      url: String,
      localPath: String,
    },
    default: {
      url: `http://res.cloudinary.com/dwl9iesij/image/upload/v1712124837/g1ehaegmay2e30bhc2ko.jpg`,
      localPath: '',
    }
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  about: {
    type: String,
    trim: true,
    default: "Write somthing about you"
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    enum: availableUserRoles,
    default: userRolesEnum.USER,
    required: true,
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  authProvider: {
    type: String,
    required: true,
    enum: authProvider,
    default: authProvider.EMAIL,
  },
  githubId: {
    type: String
  },
  googleId: {
    type: String
  },
  refreshToken: {
    type: String,
  },
  badges: [
    {
      type: Types.ObjectId,
      ref: "Badges",
    }
  ]

}, {timestamps: true})


userSchema.pre('save', async function(next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.isPasswordCorrect = async function(password: string) {
  return await bcrypt.compare(password, this.password)
}


//TODO: using process.env.ACCESS_TOKEN_EXPIRY not working {find out why?}
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    accessTokenSecret,
    {
      expiresIn: '1h',
    }
  )
}
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    refreshTokenSecret,
    {
      expiresIn: '2d',
    }
  )
}

export const User = model<IUser, IUserDocument>("User", userSchema);