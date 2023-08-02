import { Document, model, Schema } from "mongoose";

export interface IOrder {
  userId: Schema.Types.ObjectId;
  cartId: Schema.Types.ObjectId;
  price: number;
  city: string;
  street: string;
  delivery: Date;
  order_date: Date;
  digits: number;
}

export interface IOrderModel extends Document, IOrder {}

const OrdersSchema: Schema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "missing userId"],
      minLength: [2, "userId too short"],
      maxLength: [100, "userId too long"],
      trim: true,
      ref: "users",
    },
    cartId: {
      type: Schema.Types.ObjectId,
      required: [true, "missing cartId"],
      minLength: [2, "cartId too short"],
      maxLength: [100, "cartId too long"],
      trim: true,
      ref: "carts",
    },
    price: {
      type: Number,
      required: [true, "missing price"],
      min: [0, "price too low"],
    },
    city: {
      type: String,
      required: [true, "missing city"],
      minLength: [2, "city name too short"],
      maxLength: [20, "city name too long"],
    },
    street: {
      type: String,
      required: [true, "missing street"],
      minLength: [2, "street name too short"],
      maxLength: [20, "street name too long"],
    },
    delivery: {
      type: Date,
      required: [true, "missing delivery date"],
    },
    order_date: {
      type: Date,
      required: [true, "missing order date"],
      default: new Date(),
    },
    digits: {
      type: Number,
      required: [true, "missing 4 digits"],
      length: [4, "must be exactly 4 digits"],
    },
  },
  {
    versionKey: false,
  }
);

export const OrderModel = model<IOrderModel>(
  "orders", // name of document collection
  OrdersSchema
);
