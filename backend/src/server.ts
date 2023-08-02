import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import errorModel from "./models/errorModel";
import catchAll from "./middleware/catch-all";
import UserRouter from "./routes/user-routes";
import CategoryRouter from "./routes/category-routes";
import ItemRouter from "./routes/item-routes";
import CartRouter from "./routes/cart-routes";
import OrderRouter from "./routes/order-routes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./utils/config";

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

dotenv.config();
const server = express();

server.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
server.use(express.json());

server.use("/api/users", UserRouter);
server.use("/api/categories", CategoryRouter);
server.use("/api/items", ItemRouter);
server.use("/api/carts", CartRouter);
server.use("/api/orders", OrderRouter);
server.use("*", (Request: Request, response: Response, next: NextFunction) => {
  next(new errorModel(404, "route not found!"));
});
server.use(catchAll);

server.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
