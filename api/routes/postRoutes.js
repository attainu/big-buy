const { Router } = require("express");
const router = Router();

const { userRegister, userLogin, forgotPassword,postProduct} = require("../controllers/postControllers")

const{authenticateAdminsToken } = require("../middlewares/authenticate")


//--------------------Account Register Route (user and Admin)------------------
router.post(`/api/user/register`,  userRegister); 

//--------------------Login Route (user and Admin) ----------------------
router.post(`/api/user/login`,userLogin); 

//  -------Forgot Password (Sending System generated password to Email)
router.post(`/api/user/forgotpassword`,forgotPassword)

//-----------------------Admin product post-----------------------

router.post(`/api/admin/postproduct`,authenticateAdminsToken ,postProduct);


module.exports = router