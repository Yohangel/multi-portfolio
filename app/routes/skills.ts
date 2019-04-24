import express = require("express");
import jwt = require("jsonwebtoken");
import config = require("../config");

const skills = require("../controllers/skills");
const router = express.Router();

router.put("/insert", skills.insertSkill);
router.put("/update/:skillId", skills.updateSkill);
router.delete("/delete/:skillId", skills.deleteSkill);

export { router };
