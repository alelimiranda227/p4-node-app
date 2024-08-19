import { Schema, model } from "mongoose";

const departmentSchema = new Schema(
  {
    dept_id: {
      type: String,
      required: [true, "Department ID is required."],
      unique: true,
    },
    dept_description: {
      type: String,
      required: [true, "Department description is required."],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Department = model("Department", departmentSchema);

export default Department;