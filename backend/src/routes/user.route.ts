import express from "express";
import {
  login,
  register,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { Upload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(Upload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, Upload, updateProfile);

export default router;
