import { Router } from "express";

export const getRouter = Router();

import {
  allAvailableProducts,
  allUsers,
  searchProductById,
  filterProducts,
  accountActivation,
  cart,
  allOrders
} from "../controllers/getControllers";

import { authenticateAdminsToken, authenticateUsersToken } from "../middlewares/authenticate";
import { get } from "http";

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
getRouter.get(
  `/api/admin/orders/:pagenumber`,
  authenticateAdminsToken,
  allOrders
);

//-------------------------------landing page---------------------

getRouter.get(`/`, (req, res) => res.send("Welcome to Big-Buy...Have a Happy Shopping"))

//------------------------------user account activation-------------------

getRouter.get(
  `/api/user/accountactivation/:activationtoken`,
  accountActivation
);

//--------------------------------user----------------------------
getRouter.get(`/api/user/products/:pagenumber`, allAvailableProducts);
getRouter.get(`/api/user/product/:productid`, searchProductById);
getRouter.get(`/api/user/product/filterproducts/:pagenumber`, filterProducts); //-- search by query=name,seller,freeDelivery
getRouter.get(`/api/user/cart/`, authenticateUsersToken,cart)