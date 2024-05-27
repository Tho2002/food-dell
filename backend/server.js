import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import cartRoute from "./routes/cartRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";
const app = express();
const port = process.env.PORT;

// Sử dụng middleware function
app.use(express.json());
app.use(cors());

// Kết nối tới database
connectDB();

// Sử dụng các route
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRoute);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
