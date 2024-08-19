import { Router } from "express";
import {
  addDepartment,
  getDepartments,
  updateDepartment,
  getDepartmentEmployees,
  deleteDepartment,
} from "../controllers/department.controllers.js";

const departmentRouter = Router();

departmentRouter.post("/", addDepartment);
departmentRouter.get("/", getDepartments);
departmentRouter.put("/:dept_id", updateDepartment);
departmentRouter.delete("/:dept_id", deleteDepartment);
departmentRouter.get("/:dept_id/employees", getDepartmentEmployees);

export default departmentRouter;