const { Router } = require("express");
const router = Router();

const upload = require("../utils/multer")

const {authenticateAdminsToken, authenticateUsersToken} = require("../middlewares/authenticate")

const {blocking,
       unblocking,
       updatingProduct,
       uploadProfilePicture,
       editPassword} = require("../controllers/updateControllers")


//----------------------------Admin blocking user ----------------------------

router.patch(`/api/admin/user/block`, authenticateAdminsToken,blocking)
router.patch(`/api/admin/user/unblock`, authenticateAdminsToken,unblocking)

// --------------------------Admin update products----------------------------

router.patch(`/api/admin/product/update`, authenticateAdminsToken, updatingProduct);


//---------------------------------user routes---------------------------------
router.patch(`/api/user/uploadprofilepicture`, authenticateUsersToken, upload.single("image"), uploadProfilePicture);
router.patch(`/api/user/editpassword`, authenticateUsersToken, editPassword)



module.exports = router;