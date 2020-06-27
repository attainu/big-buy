const { Router } = require("express");
const router = Router();

const { userRegister,
        userLogin,
        forgotPassword,
        postProduct,
        addtocart} = require("../controllers/postControllers")

const{authenticateAdminsToken, authenticateUsersToken } = require("../middlewares/authenticate")


//--------------------Account Register Route (user and Admin)------------------
router.post(`/api/user/register`,  userRegister); 

//--------------------Login Route (user and Admin) ----------------------
router.post(`/api/user/login`,userLogin); 

//  -------Forgot Password (Sending System generated password to Email)
router.post(`/api/user/forgotpassword`,forgotPassword)

//-----------------------Admin product post-----------------------

router.post(`/api/admin/postproduct`,authenticateAdminsToken ,postProduct);


//------------------------user add product to cart-----------------

router.post(`/api/user/addtocart/:productId`, authenticateUsersToken,addtocart)


module.exports = router