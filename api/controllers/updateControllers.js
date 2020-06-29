import { UserDetails } from "../models/user";

import { Product } from "../models/product";

import cloudinary from "../utils/cloudinary";

import convertBufferToString from "../utils/convertBufferToString";

import { hash } from "bcryptjs";

// ----------------------------------------Admin Blocking User-----------------------------------------------
export const blocking = async (req, res) => {
  try {
    const update = await UserDetails.findOneAndUpdate(
      { _id: req.query.userid, isBlocked: false },
      { isBlocked: true }
    );
    if (!update) return res.send({ error: "user blocked already" });
    return res.status(202).send({ message: "User Blocked Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

// ----------------------------------------Admin Blocking User-----------------------------------------------
export const unblocking = async (req, res) => {
  try {
    const update = await UserDetails.findOneAndUpdate(
      { _id: req.query.userid, isBlocked: true },
      { isBlocked: false }
    );
    if (!update) return res.send({ error: "user unblocked already" });
    return res.status(202).send({ message: "User unBlocked Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

// -------------------Updating product details---------------

export const updatingProduct = async (req, res) => {
  try {
    await Product.findOneAndUpdate(
      { _id: req.query.productid },
      { ...req.body }
    );
    return res.status(202).send({ message: "product updated successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// ---------------------------Uploading Profile-Picture (user)-----------
export const uploadProfilePicture = async (req, res) => {
  try {
    var user = req.user;

    let imageContent = convertBufferToString(
      req.file.originalname,
      req.file.buffer
    );
    let imageResponse = await cloudinary.uploader.upload(imageContent);
    await UserDetails.findOneAndUpdate(
      { _id: user._id },
      { profilePicture: imageResponse.secure_url }
    );

    res.status(202).send({ message: "uploaded Profile picture successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// ---------------------------Changing Password (user)-----------
export const editPassword = async (req, res) => {
  try {
    var user = req.user;

    const hashedPassword = await hash(req.body.password, 10);
    console.log("hashed=", hashedPassword);
    console.log("user=", user);
    await UserDetails.update({ _id: user._id }, { password: hashedPassword });
    return res.status(202).send({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
