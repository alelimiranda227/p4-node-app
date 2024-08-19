import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import departmentRoutes from "./routes/department.routes.js";

dotenv.config();

const app=express();
const baseURL="/api/v1";

db();
app.use(express.json());

app.use(`${baseURL}/users`, userRoutes);
app.use(`${baseURL}/employee`, employeeRoutes);
app.use(`${baseURL}/departments`, departmentRoutes);
app.use("/", (req,res) => res.send({ app: "employee_management_app" }));

app.listen(process.env.PORT, () => 
  console.log(`Server is listening on port ${process.env.PORT}.`)
);