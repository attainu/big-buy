import { Router } from "express";

export const postRouter = Router();

import {
  userRegister,
  userLogin,
  forgotPassword,
  postProduct,
  addtocart
} from "../controllers/postControllers";

import { authenticateAdminsToken, authenticateUsersToken } from "../middlewares/authenticate";

//--------------------Account Register Route (user and Admin)------------------
postRouter.post(`/api/user/register`, userRegister);

//--------------------Login Route (user and Admin) ----------------------
postRouter.post(`/api/user/login`, userLogin);

//  -------Forgot Password (Sending System generated password to Email)
postRouter.post(`/api/user/forgotpassword`, forgotPassword);

//-----------------------Admin product post-----------------------

postRouter.post(`/api/admin/postproduct`, authenticateAdminsToken, postProduct);



//------------------------user add product to cart-----------------

postRouter.post(`/api/user/addtocart/:productId`, authenticateUsersToken,addtocart)
