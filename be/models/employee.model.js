import { Schema, model } from "mongoose";

// Custom validation function for employee_id (e.g., 12-34567)
const validateEmployeeId = (value) => {
  const regex = /^\d{2}-\d{5}$/;
  return regex.test(value);
};

const employeeSchema = new Schema(
  {
    employee_id: {
      type: String,
      required: [true, "Employee ID is required."],
      unique: true,
      validate: {
        validator: validateEmployeeId,
        message: props => `${props.value} is not a valid employee ID!`,
      },
    },
    lastname: {
      type: String,
      required: [true, "Lastname field is required."],
    },
    firstname: {
      type: String,
      required: [true, "Firstname field is required."],
    },
    middlename: {
      type: String,
      required: [true, "Middlename field is required."],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required."],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender field is required."],
    },
    emp_status: {
      type: String,
      enum: ["Single", "Married", "Widowed", "Legally Separated"],
      required: [true, "Status field is required."],
    },
    placeOfBirth: {
      type: String,
      required: [true, "Place of Birth field is required."],
    },
    SpouseName: {
      type: String,
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent Address field is required."],
    },
    presentAddress: {
      type: String,
      required: [true, "Permanent Address field is required."],
    },
    fathersName: {
      type: String,
      required: [true, "Father's Name field is required."],
    },
    mothersName: {
      type: String,
      required: [true, "Mother's Name field is required."],
    },
    mothersMaidenName: {
      type: String,
      required: [true, "Mother's Maiden Name field is required."],
    },
    religion: {
      type: String,
      required: [true, "Religion field is required."],
    },
    nationality: {
      type: String,
      required: [true, "Nationality field is required."],
    },
    sssNumber: {
      type: Number,
      required: [true, "SSS Number field is required."],
    },
    pagibigId: {
      type: Number,
      required: [true, "Pagibig/HDMF Number field is required."],
    },
    tin: {
      type: Number,
      required: [true, "TIN field is required."],
    },
    philhealthNo: {
      type: Number,
      required: [true, "Philhealth Number field is required."],
    },
    telephoneNo: {
      type: String,
    },
    cellPhoneNumber: {
      type: Number,
      required: [true, "Cellular Phone Number field is required."],
    },
    emergencyContactPerson: {
      type: String,
      required: [true, "Emergency Contact Person field is required."],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, "Emergency Contact Number field is required."],
    },
    relationship: {
      type: String,
      required: [true, "Relationship field is required."],
    },
    yearEmployed: {
      type: Number,
      required: [true, "Year Employed field is required."],
    },
    dateHired: {
      type: Date,
      required: [true, "Date Hired field is required."],
    },
    currentRole: {
      type: String,
      required: [true, "Current Role field is required."],
    },
    dept_id: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department ID is required."],
    },
    //Educational Background
    elem_schoolName: {
      type: String,
      required: [true, "Elementary School Name is required."],
    },
    elem_schoolAdd: {
      type: String,
      required: [true, "Elementary School Address is required."],
    },
    elem_schoolYrGrad: {
      type: Number,
      required: [true, "Elementary School Year of Graduation is required."],
    },
    high_schoolName: {
      type: String,
      required: [true, "High School Name is required."],
    },
    high_schoolAdd: {
      type: String,
      required: [true, "High School Address is required."],
    },
    high_schoolYrGrad: {
      type: Number,
      required: [true, "High School Year of Graduation is required."],
    },
    undergrad_degree: {
      type: String,
    },
    undergrad_majorMinor: {
      type: String,
    },
    undergrad_schoolName: {
      type: String,
    },
    undergrad_schoolAdd: {
      type: String,
    },
    undergrad_schoolYrGrad: {
      type: Number,
    },
    grad_degree: {
      type: String,
    },
    grad_majorMinor: {
      type: String,
    },
    grad_schoolName: {
      type: String,
    },
    grad_schoolAdd: {
      type: String,
    },
    grad_schoolYrGrad: {
      type: Number,
    },
    postGrad_degree: {
      type: String,
    },
    postGrad_majorMinor: {
      type: String,
    },
    postGrad_schoolName: {
      type: String,
    },
    postGrad_schoolAdd: {
      type: String,
    },
    postGrad_schoolYrGrad: {
      type: Number,
    },
    //Licenses & Organization Membership
    license_name: {
      type: String,
    },
    license_no: {
      type: String,
    },
    rating: {
      type: Number,
    },
    expiry_date: {
      type: Date,
    },
    org_name: {
      type: String,
    },
    member_since: {
      type: Date,
    },
    org_pos: {
      type: String,
    },
    //Employment History
    company_name: {
      type: String,
    },
    employment_pos: {
      type: String,
    },
    employment_dateFrom: {
      type: Date,
    },
    employment_dateTo: {
      type: Date,
    },

    //Beneficiaries
    beneficiary_name: {
      type: String,
      required: [true, "Beneficiary Name is required."],
    },
    beneficiary_rel: {
      type: String,
      required: [true, "Beneficiary Relationship is required."],
    },
    beneficiary_dateOfBirth: {
      type: Date,
      required: [true, "Beneficiary Date of Birth is required."],
    },
    image: {
      path: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    lcct_role: {
      type: String,
      required: [true, "Indicate the positions/role at LCCT."]
    },
    role_schoolYear: {
      type: String,
      required: [true, "Indicate the positions/role at LCCT."]
    },
    work_status: {
      type: String,
      enum: ["Part-Time","Full-Time","Contractual"],
      required: [true, "Employment status is required."]
    },
    employment_type: {
        type: String,
        enum: ["Active", "Inactive"],
        required: [true, "Employment Type is required."]
      },
  },
  {
    timestamps: true,
  }
);
    
const Employee = model("Employee", employeeSchema);
    
export default Employee;
