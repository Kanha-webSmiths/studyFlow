
import { Types } from "mongoose";
import { CookieOptions } from "express";

import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";


import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { IUser } from "../types/interfaces";

const generateTokens = async(userId: Types.ObjectId) => {
  try{
    const user:any = await User.findById(userId);
    // console.log(user)
    
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({validateBeforeSave: true});
    return { accessToken, refreshToken };


  }catch(err){
    throw new ApiError(500, "Somthing went wrong while generating tokens",[err])
  }
}

const registerUser = asyncHandler(async(req, res) => {
  const {email, password, username } = req.body;
  
  const existedUser = await User.findOne({
    $or: [{username}, {email}],
  })

  if(existedUser) throw new ApiError(409, "User with email or username already exists", []);

  const user:IUser = await User.create({
    email,
    password,
    username,
    isVerified: false,
  })
  if(!(user._id instanceof Types.ObjectId)) throw new ApiError(500, "failed to save user info")

  const {accessToken, refreshToken} = await generateTokens(user._id);
  if(!accessToken || !refreshToken) throw new ApiError(500, "Faild to generate tokens");

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  const options:CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none':'lax',
  }
  return res
  .status(201)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(201, {user: createdUser, accessToken, refreshToken}, "User registerd successfully", true)
  )
})


















export { registerUser }