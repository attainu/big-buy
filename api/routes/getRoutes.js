const { Router } = require("express");
const router = Router();

const {allAvailableProducts,
       allUsers,
       searchProductById,
       filterProducts,
       accountActivation} = require ("../controllers/getControllers")

const {authenticateAdminsToken} = require("../middlewares/authenticate");
const { all } = require("./updateRoutes");


//-------------------------------Admin-----------------------------------

router.get(`/api/admin/products/:pagenumber`,authenticateAdminsToken,allAvailableProducts );
router.get(`/api/admin/users/:pagenumber`,authenticateAdminsToken,allUsers );

//------------------------------user account activation-------------------

router.get(`/api/user/accountactivation/:activationtoken`,accountActivation)

//--------------------------------user----------------------------
router.get(`/api/user/products/:pagenumber`, allAvailableProducts)
router.get(`/api/user/product/:productid`, searchProductById)
router.get(`/api/user/product/filterproducts/:pagenumber`,filterProducts) //-- search by query=name,seller,freeDelivery


module.exports = router;