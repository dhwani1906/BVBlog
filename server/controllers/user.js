 import bcrypt from "bcryptjs";
 import jwt from "jsonwebtoken";
 import v_users from "../models/v_users.js";     //here
 import UserModal from "../models/user.js";

 const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, smart_id, firstName, lastName } = req.body;   //here

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const user1 = await UserModal.findOne({ smart_id });         //here      //smart_id already exists
    if (user1) return res.status(400).json({ message: "User ID already exists" });

    const user2 = await v_users.findOne({ smart_id });    //here           //smart_id is not valid
    
    if (!user2) return res.status(400).json({ message: "Enter a valid userID" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword,smart_id, name: `${firstName} ${lastName}` }); //here

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};