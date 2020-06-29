import { Router } from "express";

import {
  deleteProduct,
  userLogout,
  adminLogout,
} from "../controllers/deleteControllers";

import auth from "../middlewares/authenticate";

export const deleteRouter = Router();

// -------------------------user Route-----------------------
deleteRouter.delete(
  `/api/user/logout/`,
  auth.authenticateUsersToken,
  userLogout
);

// -------------------------admin Route-----------------------
deleteRouter.delete(
  `/api/admin/logout/`,
  auth.authenticateAdminsToken,
  adminLogout
);
deleteRouter.delete(
  `/api/admin/deleteproduct`,
  auth.authenticateAdminsToken,
  deleteProduct
);
