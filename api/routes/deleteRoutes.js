import { Router } from "express";
const router = Router();
import {
  userLogout,
  adminLogout,
  deleteProduct,
} from "../controllers/deleteControllers";
import {
  authenticateUsersToken,
  authenticateAdminsToken,
} from "../middlewares/authenticate";

// -------------------------user Route-----------------------
router.delete(`/api/user/logout/`, authenticateUsersToken, userLogout);

// -------------------------admin Route-----------------------
router.delete(`/api/admin/logout/`, authenticateAdminsToken, adminLogout);
router.delete(
  `/api/admin/deleteproduct`,
  authenticateAdminsToken,
  deleteProduct
);
router.delete(
  `/api/admin/deleteproduct`,
  authenticateAdminsToken,
  deleteProduct
);

export default router;
