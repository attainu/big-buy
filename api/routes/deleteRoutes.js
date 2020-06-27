const { Router } = require("express");
const router = Router();
const {  userLogout, adminLogout,deleteProduct }=require("../controllers/deleteControllers")
const {authenticateUsersToken,authenticateAdminsToken,} = require("../middlewares/authenticate")


// -------------------------user Route-----------------------
router.delete(`/api/user/logout/`, authenticateUsersToken, userLogout); 

// -------------------------admin Route-----------------------
router.delete(`/api/admin/logout/`, authenticateAdminsToken, adminLogout); 
router.delete(`/api/admin/deleteproduct`, authenticateAdminsToken, deleteProduct);
router.delete(`/api/admin/deleteproduct`, authenticateAdminsToken, deleteProduct);


module.exports= router;