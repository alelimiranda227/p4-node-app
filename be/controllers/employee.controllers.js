import Employee from "../models/employee.model.js";
import Department from "../models/department.model.js";
import { cloudinary } from "../config/storage.js";

const addEmployee = async (req, res) => {
  try {
    const { 
      employee_id,
      lastname,
      firstname,
      middlename,
      dateOfBirth,
      gender,
      emp_status,
      placeOfBirth,
      spouseName,
      permanentAddress,
      presentAddress,
      fathersName,
      mothersName,
      mothersMaidenName,
      religion,
      nationality,
      sssNumber,
      pagibigId,
      tin,
      philhealthNo,
      telephoneNo,
      cellPhoneNumber,
      emergencyContactPerson,
      emergencyContactNumber,
      relationship,
      yearEmployed,
      dateHired,
      currentRole,
      dept_id,
      elem_schoolName,
      elem_schoolAdd,
      elem_schoolYrGrad,
      high_schoolName,
      high_schoolAdd,
      high_schoolYrGrad,
      undergrad_degree,
      undergrad_majorMinor,
      undergrad_schoolName,
      undergrad_schoolAdd,
      undergrad_schoolYrGrad,
      grad_degree,
      grad_majorMinor,
      grad_schoolName,
      grad_schoolAdd,
      grad_schoolYrGrad,
      postGrad_degree,
      postGrad_majorMinor,
      postGrad_schoolAdd,
      postGrad_schoolName,
      postGrad_schoolYrGrad,
      license_name,
      license_no,
      rating,
      expiry_date,
      org_name,
      member_since,
      org_pos,
      lcct_role,
      role_schoolYear,
      company_name,
      employment_pos,
      employment_dateFrom,
      employment_dateTo,
      beneficiary_name,
      beneficiary_rel,
      beneficiary_dateOfBirth,
      work_status,
      employment_type
    } = req.body;

    // const{ path, filename } =req.file;
    const department = await Department.findOne({ dept_id });
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }
    
    const newEmployee = new Employee({
      employee_id,
      lastname,
      firstname,
      middlename,
      dateOfBirth,
      gender,
      emp_status,
      placeOfBirth,
      spouseName,
      permanentAddress,
      presentAddress,
      fathersName,
      mothersName,
      mothersMaidenName,
      religion,
      nationality,
      sssNumber,
      pagibigId,
      tin,
      philhealthNo,
      telephoneNo,
      cellPhoneNumber,
      emergencyContactPerson,
      emergencyContactNumber,
      relationship,
      yearEmployed,
      dateHired,
      currentRole,
      dept_id: department._id,
      elem_schoolName,
      elem_schoolAdd,
      elem_schoolYrGrad,
      high_schoolName,
      high_schoolAdd,
      high_schoolYrGrad,
      undergrad_degree,
      undergrad_majorMinor,
      undergrad_schoolName,
      undergrad_schoolAdd,
      undergrad_schoolYrGrad,
      grad_degree,
      grad_majorMinor,
      grad_schoolName,
      grad_schoolAdd,
      grad_schoolYrGrad,
      postGrad_degree,
      postGrad_majorMinor,
      postGrad_schoolAdd,
      postGrad_schoolName,
      postGrad_schoolYrGrad,
      license_name,
      license_no,
      rating,
      expiry_date,
      org_name,
      member_since,
      org_pos,
      lcct_role,
      role_schoolYear,
      company_name,
      employment_pos,
      employment_dateFrom,
      employment_dateTo,
      beneficiary_name,
      beneficiary_rel,
      beneficiary_dateOfBirth,
      work_status,
      employment_type,
         
    });
    await newEmployee.save();

    res.status(201).send({
      message: "New employee created.",
      data: newEmployee,
    });
  } catch (error)  {
    console.error(error.message);
    res.status(res.statusCode).send({ message: error.message});
  }
};

const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find()
      .select(["lastname", "firstname","middlename","dept_id", "dateHired", "currentRole","work_status","employment_type"])
      .sort({ employee_id: -1 })
      .populate({
        path: "dept_id",
        select: "lastname",
      });
    
      res.status(200).send({
        message: "List of Employees.",
        data: employees,
      });
  } catch (error) {
    console.error(error.message);
    res.status(res.statusCode).send({ message: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { employee_id } = req.params;

    const employeeById = await Employee.findOne({ employee_id }).select("-updatedAt");
      
    if (!employeeById) {
      res.status(404).send({ message: "Employee ID not found."});
    } else {
      res.status(200).send({
        message: "Employee Found.",
        data: employeeById,
      });
    }
  } catch (error) {
    console.error(error.message);
    console.error(res.statusCode).send({ message: error.message });
  }
};

const deleteEmployeeById = async (req, res) => {
    try {
      const { employee_id } = req.params;
  
      const employee = await Employee.findOne({ employee_id });
  
      if (!employee) {
        return res.status(404).send({ message: "Employee record is successfully deleted." });
      }
  
      const { deletedCount } = await Employee.deleteOne({ employee_id });
  
      if (!deletedCount) {
        return res.status(500).send({ message: "Something went wrong while deleting the employee's account." });
      }
  
      res.status(204).send();
    } catch (error) {
      console.error(error.message);
      console.error(res.statusCode).send({ message: error.message });
    }
  };

const updateProfilePicture = async (req,res) => {
  try {
    const { employee_id } = req.params;

    if(!req.file) {
      return res.status(400).send({ message: "No file uploaded." });
    }

    const result =  await cloudinary.uploader.upload(req.file.path);

    const updatedEmployee = await Employee.findOneAndUpdate(
      { employee_id },
      { image: { path: result.secure_url, filename: result.public_id } },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send({ message: "Employee not found." });
    }

    res.status(200).send({
      message: "Profile picture updated.",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error(error.message);
    console.error(res.statusCode).send({ message: error.message });
  }
};

export { addEmployee, getAllEmployee, getEmployeeById, deleteEmployeeById, updateProfilePicture };
