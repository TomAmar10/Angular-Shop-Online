import { Document, model, Schema } from "mongoose";

export interface IItem {
  name: string;
  categoryId: Schema.Types.ObjectId;
  price: number;
  image: string;
}

export interface IItemModel extends Document, IItem {}

const ItemsSchema: Schema = new Schema<IItem>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, "missing category"],
      minLength: [2, "category too short"],
      maxLength: [100, "category too long"],
      trim: true,
      ref: "categories",
    },
    name: {
      type: String,
      required: [true, "missing operation type"],
      minLength: [2, "name too short"],
      maxLength: [25, "name too long"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "missing price"],
      min: [0, "price too low"],
    },
    image: {
      type: String,
      required: [true, "image price"],
    },
  },
  {
    versionKey: false,
  }
);

export const ItemModel = model<IItemModel>(
  "items", // name of document collection
  ItemsSchema
);
