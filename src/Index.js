import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import passport from './config/Passport.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { dbConnection } from "./config/Db.config.js";
import ResponseMessage from "./utils/ResponseMessage.js";

// Models
import { User } from "./models/User.js";
import { Post } from "./models/Post.js";
import { Comment } from "./models/Comment.js";
import { Notification } from "./models/Notification.js";


// Services
import {
  createModel,
  deleteById,
  deleteData,
  getAllData,
  getSingleData,
  getSingleDataById,
  updateByIdApi,
  updateData,
} from "./services/QueryServices.js";

import {
  generateOtp,
  genrateToken,
  handleErrorResponse,
  hashedPassword,
  passwordCompare,
  sendResponse,
} from "./services/CommonServices.js";

// Middleware
import FileUpload from "./middleware/FileUpload.js";

// Routes
import postRouter from "./routes/PostRoute.js";
import commentRouter from "./routes/CommentRoute.js";
import userRouter from "./routes/UserRoutes.js";
import { Auth } from "./middleware/Auth.js";

// testing
// import chai from "chai";

dotenv.config();

export {
  express,
  cors,
  mongoose,
  bcryptjs,
  jwt,
  StatusCodes,
  Router,
  multer,
  passport,
  LocalStrategy,

  // Models
  User,
  Post,
  Comment,
  Notification,

  // Components
  dbConnection,
  ResponseMessage,

  // Services
  createModel,
  getSingleData,
  getSingleDataById,
  getAllData,
  updateData,
  updateByIdApi,
  deleteById,
  deleteData,
  handleErrorResponse,
  sendResponse,
  hashedPassword,
  passwordCompare,
  genrateToken,
  generateOtp,
  FileUpload,

  // Routes
  postRouter,
  commentRouter,
  userRouter,

  Auth,

  // testing
  // chai,

};
