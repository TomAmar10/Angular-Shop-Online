import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { CategoryModel } from "../models/category-model";

const addCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const category = request.body;
  const newCategory = new CategoryModel({
    _id: new mongoose.Types.ObjectId(),
    ...category,
  });
  return newCategory
    .save()
    .then((category) => response.status(201).json(category))
    .catch((err) => next(err));
};

const getCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categoryId = request.params.id;
  return CategoryModel.findById(categoryId)
    .then((category) =>
      category
        ? response.status(200).json(category)
        : response.status(200).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const getAllCategories = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return CategoryModel.find()
    .then((categories) =>
      categories
        ? response.status(200).json(categories)
        : response.status(200).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const updateCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categoryId = request.params.id;
  return CategoryModel.findById(categoryId)
    .then((category) => {
      if (category) {
        category.set(request.body);
        return category
          .save()
          .then((category) => response.status(201).json(category))
          .catch((err) => next(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categoryId = request.params.id;
  return CategoryModel.findByIdAndDelete(categoryId)
    .then((category) =>
      category
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getCategory,
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
