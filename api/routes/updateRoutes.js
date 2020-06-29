import { Router } from "express";
export const updateRouter = Router();

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

updateRouter.patch(`/api/admin/user/block`, authenticateAdminsToken, blocking);
updateRouter.patch(
  `/api/admin/user/unblock`,
  authenticateAdminsToken,
  unblocking
);

// --------------------------Admin update products----------------------------

updateRouter.patch(
  `/api/admin/product/update`,
  authenticateAdminsToken,
  updatingProduct
);

//---------------------------------user routes---------------------------------
updateRouter.patch(
  `/api/user/uploadprofilepicture`,
  authenticateUsersToken,
  upload.single("image"),
  uploadProfilePicture
);
updateRouter.patch(
  `/api/user/editpassword`,
  authenticateUsersToken,
  editPassword
);
