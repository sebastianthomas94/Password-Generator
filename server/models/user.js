import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: false,
  },
  savedPassword: [
    {
      password: String,
      field: String,
    },
  ],
});

const User = mongoose.model("user",userSchema);
export default User;