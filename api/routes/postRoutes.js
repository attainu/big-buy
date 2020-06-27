import { Router } from "express";
const router = Router();

import {
  userRegister,
  userLogin,
  forgotPassword,
  postProduct,
  addtocart,
} from "../controllers/postControllers";
import {
  authenticateAdminsToken,
  authenticateUsersToken,
} from "../middlewares/authenticate";

//--------------------Account Register Route (user and Admin)------------------
router.post(`/api/user/register`, userRegister);

//--------------------Login Route (user and Admin) ----------------------
router.post(`/api/user/login`, userLogin);

//  -------Forgot Password (Sending System generated password to Email)
router.post(`/api/user/forgotpassword`, forgotPassword);

//-----------------------Admin product post-----------------------

router.post(`/api/admin/postproduct`, authenticateAdminsToken, postProduct);

//------------------------user add product to cart-----------------

router.post(
  `/api/user/addtocart/:productId`,
  authenticateUsersToken,
  addtocart
);

export default router;
