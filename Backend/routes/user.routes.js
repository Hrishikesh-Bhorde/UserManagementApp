import express from "express"
import { createUser, deleteProfile, loginUser, updateUser } from "../controllers/user.controllers.js";

const router = express.Router();


// Create New User 

router.post("/create-user", createUser)
router.post("/login-user", loginUser)
router.post("/delete-user", deleteProfile)
router.post("/update-user", updateUser)


export default router;