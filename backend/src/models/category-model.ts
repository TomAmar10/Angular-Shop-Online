import { Document, model, Schema } from "mongoose";

export interface ICategory {
  name: string;
}

export interface ICategoryModel extends Document, ICategory {}

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "missing name"],
      minLength: [2, "name too short"],
      maxLength: [15, "name too long"],
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const CategoryModel = model<ICategoryModel>(
  "categories", // name of document collection
  CategorySchema
);
