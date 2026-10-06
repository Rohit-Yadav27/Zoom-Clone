import {Router} from "express";
import {userVerification} from "../middlewares/AuthMiddleware.js";
import {Login,Signup, Logout,getUserHistory,addToHistory} from "../controllers/AuthController.js";

const router = Router();

router.get("/verify",userVerification)
router.post("/signup",Signup);
router.post("/login",Login);
router.post("/logout",Logout);
router.post("/add_to_activity",addToHistory)
router.get("/get_all_activity",getUserHistory)


export default router;
