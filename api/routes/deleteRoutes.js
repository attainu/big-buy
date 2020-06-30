import { Router } from "express";

import {
  deleteProduct,
  userLogout,
  adminLogout,
} from "../controllers/deleteControllers";


import { authenticateAdminsToken, authenticateUsersToken } from "../middlewares/authenticate";

export const deleteRouter = Router();

// -------------------------user Route-----------------------
deleteRouter.delete(
  `/api/user/logout/`,
  authenticateUsersToken,
  userLogout
);

// -------------------------admin Route-----------------------
deleteRouter.delete(
  `/api/admin/logout/`,
  authenticateAdminsToken,
  adminLogout
);
deleteRouter.delete(
  `/api/admin/deleteproduct`,
  authenticateAdminsToken,
  deleteProduct
);


deleteRouter.delete(`/api/admin/deleteproduct`, authenticateAdminsToken, deleteProduct);
