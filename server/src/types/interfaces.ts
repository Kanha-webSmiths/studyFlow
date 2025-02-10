import { Types, Document, Model } from "mongoose";
export interface IUser extends Document {
  avatar: {
    url: string;
    localPath: string;
  };
  username: string;
  about: string;
  isVerified: boolean;
  email: string;
  role: string;
  password: string;
  authProvider: string;
  githubId?: string;
  googleId?: string;
  refreshToken: string;
  badges: Types.ObjectId[];
}

export interface IUserDocument extends Model<IUser> {
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
  isPasswordCorrect(password: string): Promise<boolean>;
}