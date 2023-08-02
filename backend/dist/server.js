"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var errorModel_1 = __importDefault(require("./models/errorModel"));
var catch_all_1 = __importDefault(require("./middleware/catch-all"));
var user_routes_1 = __importDefault(require("./routes/user-routes"));
var category_routes_1 = __importDefault(require("./routes/category-routes"));
var item_routes_1 = __importDefault(require("./routes/item-routes"));
var cart_routes_1 = __importDefault(require("./routes/cart-routes"));
var order_routes_1 = __importDefault(require("./routes/order-routes"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("./utils/config");
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: "majority",
})
    .then(function () {
    console.log("connected");
})
    .catch(function (err) { return console.log(err); });
dotenv_1.default.config();
var server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: [process.env.CLIENT_ORIGIN_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
}));
server.use(express_1.default.json());
server.use("/api/users", user_routes_1.default);
server.use("/api/categories", category_routes_1.default);
server.use("/api/items", item_routes_1.default);
server.use("/api/carts", cart_routes_1.default);
server.use("/api/orders", order_routes_1.default);
server.use("*", function (Request, response, next) {
    next(new errorModel_1.default(404, "route not found!"));
});
server.use(catch_all_1.default);
server.listen(process.env.PORT, function () {
    return console.log("listening on port " + process.env.PORT);
});
