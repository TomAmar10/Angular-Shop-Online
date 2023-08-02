import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ItemModel } from "../models/item-model";

const addItem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const item = request.body;
  const newItem = new ItemModel({
    _id: new mongoose.Types.ObjectId(),
    ...item,
  });
  return newItem
    .save()
    .then((item) => response.status(201).json(item))
    .catch((err) => next(err));
};

const getItem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const itemId = request.params.id;
  return ItemModel.findById(itemId)
    .populate("categoryId")
    .then((item: any) => {
      item
        ? response.status(200).json(item)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllItems = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return ItemModel.find()
    .populate("categoryId")
    .then((items) => {
      items
        ? response.status(200).json(items)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getCategoryItems = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categoryId = request.params.categoryId;
  console.log(categoryId);
  return ItemModel.find({ categoryId })
    .populate("categoryId")
    .then((items) => {
      items
        ? response.status(200).json(items)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateItem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const itemId = request.params.id;

  return ItemModel.findById(itemId)
    .then((item) => {
      if (item) {
        item.set(request.body);
        return item
          .save()
          .then((item) => response.status(201).json(item))
          .catch((err) => response.status(500).json(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteItem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const itemId = request.params.id;
  return ItemModel.findByIdAndDelete(itemId)
    .then((item) =>
      item
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getItem,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  getCategoryItems,
};
