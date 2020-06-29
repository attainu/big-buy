import { Router } from "express";

export const getRouter = Router();

import {
  allAvailableProducts,
  allUsers,
  searchProductById,
  filterProducts,
  accountActivation,
} from "../controllers/getControllers";

import { authenticateAdminsToken } from "../middlewares/authenticate";

//-------------------------------Admin-----------------------------------

getRouter.get(
  `/api/admin/products/:pagenumber`,
  authenticateAdminsToken,
  allAvailableProducts
);
getRouter.get(
  `/api/admin/users/:pagenumber`,
  authenticateAdminsToken,
  allUsers
);

//------------------------------user account activation-------------------

getRouter.get(
  `/api/user/accountactivation/:activationtoken`,
  accountActivation
);

//--------------------------------user----------------------------
getRouter.get(`/api/user/products/:pagenumber`, allAvailableProducts);
getRouter.get(`/api/user/product/:productid`, searchProductById);
getRouter.get(`/api/user/product/filterproducts/:pagenumber`, filterProducts); //-- search by query=name,seller,freeDelivery
