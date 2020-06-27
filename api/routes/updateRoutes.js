import { Router } from "express";
const router = Router();

import upload from "../utils/multer";
import {
  authenticateAdminsToken,
  authenticateUsersToken,
} from "../middlewares/authenticate";
import {
  blocking,
  unblocking,
  updatingProduct,
  uploadProfilePicture,
  editPassword,
} from "../controllers/updateControllers";

//----------------------------Admin blocking user ----------------------------

router.patch(`/api/admin/user/block`, authenticateAdminsToken, blocking);
router.patch(`/api/admin/user/unblock`, authenticateAdminsToken, unblocking);

// --------------------------Admin update products----------------------------

router.patch(
  `/api/admin/product/update`,
  authenticateAdminsToken,
  updatingProduct
);

//---------------------------------user routes---------------------------------
router.patch(
  `/api/user/uploadprofilepicture`,
  authenticateUsersToken,
  upload.single("image"),
  uploadProfilePicture
);
router.patch(`/api/user/editpassword`, authenticateUsersToken, editPassword);

export default router;
