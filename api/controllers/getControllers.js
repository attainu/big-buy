import UserDetails from "../models/user";
import AdminDetails from "../models/Admin";
import Product from "../models/product";
import Order from "../models/order";

import jwt from "jsonwebtoken";

// -----------------Searching Available products--------------------

export const allAvailableProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .skip((req.params.pagenumber - 1) * 10)
      .limit(10)
      .sort({ createdAt: -1 });
    const count = await Product.find().countDocuments({});
    return res.status(200).json({ count, products });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
// -----------------Searching product by id--------------------

export const searchProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productid });
    console.log(product);
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
// --------------All Seekers List------------------------------------------------

export const allUsers = async (req, res) => {
  try {
    const allUsers = await UserDetails.find()
      .skip((req.params.pagenumber - 1) * 10)
      .limit(10)
      .sort({ createdAt: -1 });
    const count = await UserDetails.find({}).countDocuments({});
    return res.status(200).json({ count, allUsers });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
// -----------------Filtering Available Jobs--------------------

export const filterProducts = async (req, res) => {
  try {
    if (!req.query)
      res.return({ error: "Please enter a definite query to filter out jobs" });
    if (req.query.name) {
      const products = await Product.find({ name: req.query.name })
        .skip((req.params.pagenumber - 1) * 10)
        .limit(10)
        .sort({ createdAt: -1 });
      const count = await Product.find({ name: req.query.name }).countDocuments(
        {}
      );
      return res.status(200).json({ count, products });
    }

    if (req.query.freeDelivery) {
      const products = await Product.find({
        freeDelivery: req.query.freeDelivery,
      })
        .skip((req.params.pagenumber - 1) * 10)
        .limit(10)
        .sort({ createdAt: -1 });
      const count = await Product.find({
        freeDelivery: req.query.freeDelivery,
      }).countDocuments({});
      return res.status(200).json({ count, products });
    }

    if (req.query.seller) {
      const products = await Product.find({ seller: req.query.seller })
        .skip((req.params.pagenumber - 1) * 10)
        .limit(10)
        .sort({ createdAt: -1 });
      const count = await Product.find({
        seller: req.query.seller,
      }).countDocuments({});
      return res.status(200).json({ count, products });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

// ---------------------Account Activation (user)-----------------------

export const accountActivation = async (req, res) => {
  try {
    if (!req.query.user) throw new Error("invalid route");

    if (!req.params.activationtoken) return res.status(401);
    const payload = await jwt.verify(
      req.params.activationtoken,
      process.env.TEMP_TOKEN_SECRET
    );
    if (payload) {
      const updated = await UserDetails.findOneAndUpdate(
        { activationToken: req.params.activationtoken },
        { isVerified: true, activationToken: null }
      );
      if (updated)
        return res.status(202).send({
          message:
            "Account activated Successfully. Please visit Bigbuy.com and Login",
        });
      return res.send({
        message:
          "Account already activated. Visit Bigbuy website to login into your Account",
      });
    }
    return res.send({ error: "Invalid Token" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

export const cart=   function (req, res) {
  var user = req.user._id;
  UserDetails.findOne({_id:user}).then(function(user){
      id=user._id;
  orders.find({ userId: id}).then(function(prod){
      console.log(prod);
      res.send({order:prod}) ;
      });
  })};


  // --------------All Seekers List------------------------------------------------

export const allOrders = async (req, res) => {
  try {
    const allOrders = await Order.find()
      .skip((req.params.pagenumber - 1) * 10)
      .limit(10)
      .sort({ createdAt: -1 });
    const count = await Order.find({}).countDocuments({});
    return res.status(200).json({ count, allOrders });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};