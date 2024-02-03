import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../middleware/generateToken.js";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.json({ error: "please create an acccount" });
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then(function (result) {
          if (result) {
            generateToken(res, user._id);
            res.status(200).json({ message: result, user });
          } else {
            res.status(200).json("invalid password");
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err) throw err;
        });
    }
  } catch (err) {}
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
      res.status(400).json({ userExists: "user exists" });
      return;
    } else {
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hash });
      if (user) {
        res.status(201).json({ message: user });
        return;
      } else {
        res.status(400).json("invalid user data");
        return;
      }
    }
  } catch (err) {
    console.log(err.message);
    if (err) throw err;
  }
}
const logout = (req,res)=>{
  try{
     res.cookie("password", "", {
       httpOnly: true,
       expires: new Date(0),
     });
     res.status(200).json("user logged out successfully");
  }catch(err){
    console.log(err)
    res.status(400).json("error ocuured ")
  }
}
export { login, signup, logout };
