import mongoose from "mongoose";

const v_userSchema = new mongoose.Schema({
    // name: {
    //     minlength: [4, "Username must be at least 4 characters"],
    //     max: 20,
    //     type: String,
    //     required: [true, "Please enter your name"],
    //   },

      smart_id: {
        type: String,
        length: 10,
        unique: true,
      }
});

export default mongoose.model("v_users", v_userSchema);