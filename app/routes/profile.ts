import express = require("express");
import jwt = require("jsonwebtoken");
import config = require("../config");

const profile = require("../controllers/profile");
const router = express.Router();

router.put("/update", profile.updateProfile);

export { router };
