import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { CartModel } from "../models/cart-model";

const addCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cart = request.body;
  const newCart = new CartModel({
    _id: new mongoose.Types.ObjectId(),
    ...cart,
  });
  return (await newCart.populate(["userId", "items"]))
    .save()
    .then((cart) => response.status(201).json(cart))
    .catch((err) => next(err));
};

const getCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cartId = request.params.id;
  return CartModel.findById(cartId)
    .populate(["userId", "items"])
    .then((cart: any) => {
      cart
        ? response.status(200).json(cart)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllCarts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return CartModel.find()
    .populate(["userId", "items"])
    .then((carts) => {
      carts
        ? response.status(200).json(carts)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getUserCarts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.userId;
  return CartModel.find({ userId })
    .populate(["userId", "items"])
    .then((carts) => {
      carts
        ? response.status(200).json(carts)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cartId = request.params.id;

  return CartModel.findById(cartId)
    .populate(["userId", "items"])
    .then((cart) => {
      if (cart) {
        cart.set(request.body);
        return cart
          .save()
          .then((cart) =>
            CartModel.populate(cart, [{ path: "userId" }, { path: "items" }])
          )
          .then((cart) => response.status(201).json(cart))
          .catch((err) => response.status(500).json(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cartId = request.params.id;
  return CartModel.findByIdAndDelete(cartId)
    .then((cart) =>
      cart
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getCart,
  getAllCarts,
  addCart,
  updateCart,
  deleteCart,
  getUserCarts,
};
