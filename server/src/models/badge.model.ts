import { Schema, model } from "mongoose";
import { availableBadgeType } from "../utils/constants";

const badgeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true, 
  },
  type: {
    type: String,
    enum: availableBadgeType,
  },
  badgeIcon: {
    type: {
      url: String,
      localPath: String,
    },
    required: true,
  }
},{timestamps: true})