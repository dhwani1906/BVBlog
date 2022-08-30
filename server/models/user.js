import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  smart_id: {//here
    type: String,
    required: [true, "Please enter your smart-card id"],
    length: 10,
    unique: [true, "Id already exists"],
  }, 
  email: { type: String, required: true, unique:[true, "Email already exists."]},
  password: { type: String, required: true, minlength: [6, "Password must be at least 6 characters"] , maxlength: [15, "Password must not be more than 15 characters"]},
             
});

export default mongoose.model("User", userSchema);