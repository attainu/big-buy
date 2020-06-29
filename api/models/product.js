import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: [true, "Please Enter Price"],
  },
  seller: {
    type: String,
  },
  freeDelivery: {
    type: Boolean,
    required: true,
  },
});

export const Product = model("Product", ProductSchema);
