import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { username, employee_id, email, password } = req.body;

    const isUserExist = await User.findOne({ $or: [{ employee_id }, { email }] });

    if (isUserExist) {
      if (isUserExist.email === email) {
        return res.status(400).send({ message: "Email already exists." });
      }
      if (isUserExist.employee_id === employee_id) {
        return res.status(400).send({ message: "Employee ID already exists." });
      }
    } else {
        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          employee_id,
          email,
          password: hash,
        });

        await newUser.save();

        res.status(201).send({
          message: "User has been created.",
          data: newUser,
        });
    }    
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ message: "Server error", error: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { employee_id, password } = req.body;

    const user = await User.findOne ({ employee_id });

    if (!user) {
      res.status(404).send({ message: "User does not exist." });
    } else {
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched)  {
          res.status(400).send({ message: "Password didn't match." });
        } else {
            res.status(200).send({
                message: "Login Successful.",
                data: user,     
            });
        }
    } 
  } catch (error) {
    console.error(error.message);
  }
};

export { signup, signin };