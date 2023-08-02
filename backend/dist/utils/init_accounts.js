// import mongoose from "mongoose";
// import { AccountModel } from "../models/accountModel";
// const init_names = [4116, 6362, 1788, 7313];
// const init_accounts = async () => {
//   const all = await AccountModel.find();
//   if (all.length < 1) {
//     init_names.forEach((n) => {
//       const newAccount = new AccountModel({
//         _id: new mongoose.Types.ObjectId(),
//         number: n,
//       });
//       newAccount.save();
//     });
//     console.log("initial accounts added successfully");
//   }
// };
// export default init_accounts;
