import { Document, model, Schema } from "mongoose";

export interface ICart {
  userId: Schema.Types.ObjectId;
  created: Date;
  items: Array<string>;
}

export interface ICartModel extends Document, ICart {}

const CartsSchema: Schema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "missing user"],
      minLength: [2, "user id too short"],
      maxLength: [100, "user id too long"],
      trim: true,
      ref: "users",
    },
    created: {
      type: Date,
      default: new Date(),
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "items",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const CartModel = model<ICartModel>(
  "carts", // name of document collection
  CartsSchema
);
