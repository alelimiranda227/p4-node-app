import Department from "../models/department.model.js";
import Employee from "../models/employee.model.js";


const addDepartment = async (req, res) => {
  try {
    const {
      dept_id,
      dept_description
    } = req.body;

    const existingDept = await Department.findOne({ dept_id });
    if (existingDept) {
      return res.status(400).json({ message: "Department ID already exists." });
    }

    const newDepartment = new Department({
      dept_id,
      dept_description,
    });
    await newDepartment.save();

    res.status(201).send({
      message: "New department created.",
      data: newDepartment,
    });
  } catch (error)  {
    console.error(error.message);
    //res.status(res.statusCode).send({ message: error.message});
    res.status(500).send({ message: error.message });
  }
};

//View list of departments

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    console.error(error.message);
    //res.status(res.statusCode).send({ message: error.message});
    res.status(500).send({ message: error.message });
  }
};

//Edit department info
const updateDepartment = async (req, res) => {
  try {
    const { dept_id } = req.params;
    const { dept_description } = req.body;

    //Check if new_dept_id is provided and different from the current dept_id
    // if (new_dept_id && new_dept_id !== dept_id) {
    //   const existingDept = await Department.findOne({ dept_id: new_dept_id });
    //   if (existingDept) {
    //     return res.status(400).json({ message: "Department ID already exists." });
    //   }
    // }

    const updatedDepartment = await Department.findOneAndUpdate(
      { dept_id },
      { dept_description },
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found." });
    }

    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.error(error.message);
    //res.status(res.statusCode).send({ message: error.message});
    res.status(500).send({ message: error.message });
  }
};

//Display list of employees under each department
const getDepartmentEmployees = async (req, res) => {
  try {
    const { dept_id } = req.params;
    
    // const employees = await Employee.find({ dept_id })
    //   .select("lastname firstname middlename dateHired currentRole work_status employment_type")
    //   .populate("dept_id", "dept_id dept_description");

    const department = await Department.findOne({ dept_id });

    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }

    // Find employees where dept_id matches the ObjectId of the department
    const employees = await Employee.find({ dept_id: department._id })
      .select("lastname firstname middlename dateHired currentRole work_status employment_type");

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found for this department." });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error(error.message);
    //res.status(res.statusCode).send({ message: error.message});
    res.status(500).send({ message: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const {dept_id} = req.params;

    const deletedDepartment = await Department.findOneAndUpdate(
      { dept_id },
      { deleted: true },
      { new: true }
    );

    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found." });
    }
    res.status(200).json({ message: "Department deleted successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export 
  { 
    addDepartment, 
    getDepartments, 
    updateDepartment, 
    getDepartmentEmployees, 
    deleteDepartment 
  };
