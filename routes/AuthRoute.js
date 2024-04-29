import express from "express";
import {
    // getMe,
    postLogin,
    deleteLogout
} from "../controllers/Auth.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// router.get('/me', getMe);
router.post('/login', postLogin);
router.delete('/logout',  deleteLogout);
router.get('/token', refreshToken);

export default router;