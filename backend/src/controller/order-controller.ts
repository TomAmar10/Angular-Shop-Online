import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { IOrder } from "../models/order-model";
import { OrderModel } from "../models/order-model";

const addOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const order = request.body;
  const newOrder = new OrderModel({
    _id: new mongoose.Types.ObjectId(),
    ...order,
  });
  return newOrder
    .save()
    .then((order) => response.status(201).json(order))
    .catch((err) => next(err));
};

const getOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const orderId = request.params.id;
  return OrderModel.findById(orderId)
    .populate(["cartId", "userId"])
    .then((order: any) => {
      order
        ? response.status(200).json(order)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllOrders = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return OrderModel.find()
    .populate(["cartId", "userId"])
    .then((orders) => {
      orders
        ? response.status(200).json(orders)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getCartOrders = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cartId = request.params.cartId;
  return OrderModel.find({ cartId })
    .populate(["cartId", "userId"])
    .then((orders) => {
      orders
        ? response.status(200).json(orders)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getUserOrders = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.userId;
  return OrderModel.find({ userId })
    .populate(["cartId", "userId"])
    .then((orders) => {
      orders
        ? response.status(200).json(orders)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const orderId = request.params.id;

  return OrderModel.findById(orderId)
    .then((order) => {
      if (order) {
        order.set(request.body);
        return order
          .save()
          .then((order) => response.status(201).json(order))
          .catch((err) => response.status(500).json(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const orderId = request.params.id;
  return OrderModel.findByIdAndDelete(orderId)
    .then((order) =>
      order
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const getRecipe = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const orderId = request.params.id;
  return OrderModel.findById(orderId)
    .populate([
      {
        path: "cartId",
        populate: {
          path: "items",
        },
      },
      "userId",
    ])
    .then((order: IOrder) => {
      if (order) {
        if ((order.cartId as any).items) {
          const html = `
          <div style="display:flex; justify-content:center; flex-direction:column; align-items:center;">
        <div style="border: 1px black solid; border-radius:5px; width:20rem; text-align:center; padding:1rem;">
        <h1>Recipe for ${(order.userId as any).first_name} ${
            (order.userId as any).last_name
          }</h1>
        <hr>
        <div style="margin-bottom:2rem;">
        <h3>Products</h3>
          ${(order.cartId as any).items.map(
            (i) => `<li>${i.name} .......... ${i.price}₪</li>`
          )}
        </div>
          <hr>
          <p>Deliver to: ${order.city}, ${order.street}</p>
          <p>Credit card: ************${order.digits}</p>
          <h3>Total price: ${order.price}₪</h3>
          </div>
          </div>
          `;
          response.status(200).send(html);
        }
      } else response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

export default {
  getOrder,
  getRecipe,
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getCartOrders,
  getUserOrders,
};
