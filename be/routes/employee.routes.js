import { Router } from "express";
import multer from "multer";
import { storage } from "../config/storage.js";
import {
  addEmployee,
  getAllEmployee,
  getEmployeeById,
  deleteEmployeeById,
  updateProfilePicture

} from "../controllers/employee.controllers.js";

const employeeRouter = Router();
const employeeImage = multer({ storage });

employeeRouter.post("/", employeeImage.single("employee-image"), addEmployee);
employeeRouter.get("/", getAllEmployee);
employeeRouter.get("/:employee_id", getEmployeeById);
employeeRouter.delete("/:employee_id", deleteEmployeeById);
employeeRouter.put("/:employee_id/profile-picture", employeeImage.single("image"), updateProfilePicture);

export default employeeRouter;