import express from "express";

// because we use type:module in the package.json, we must have '.js' at the end of file name,
// or it will not be found.
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// '/api/user' connected to this whole file already
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);


export default router;