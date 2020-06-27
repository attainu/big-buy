import { Router } from "express";
const router = Router();

import {
  allAvailableProducts,
  allUsers,
  searchProductById,
  filterProducts,
  accountActivation,
  cart,
} from "../controllers/getControllers";

import {
  authenticateAdminsToken,
  authenticateUsersToken,
} from "../middlewares/authenticate";
import { all } from "./updateRoutes";

//-------------------------------Admin-----------------------------------

router.get(
  `/api/admin/products/:pagenumber`,
  authenticateAdminsToken,
  allAvailableProducts
);
router.get(`/api/admin/users/:pagenumber`, authenticateAdminsToken, allUsers);

//------------------------------user account activation-------------------

router.get(`/api/user/accountactivation/:activationtoken`, accountActivation);

//--------------------------------user----------------------------
router.get(`/api/user/products/:pagenumber`, allAvailableProducts);
router.get(`/api/user/product/:productid`, searchProductById);
router.get(`/api/user/product/filterproducts/:pagenumber`, filterProducts); //-- search by query=name,seller,freeDelivery
router.get(`/api/user/cart/`, authenticateUsersToken, cart);

export default router;
