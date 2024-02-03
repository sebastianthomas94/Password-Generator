import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
const Header = () => {
  const [logoutApi] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
   async function logoutHandler(){
      try{
        const res = await logoutApi().unwrap();
        if (res) {
          toast.info("logoutsuccessfully");
            dispatch(logout());
          navigate('/login');
        }
      }catch(err){
        toast.info("something wen wrong")
      }

    }
return(  <header className="flex items-center justify-between bg-black p-4">
    <div className="flex items-center space-x-2">
      <span
        className="text-white font-bold text-lg cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Password Generator
      </span>
    </div>
    <div className="flex space-x-4">
      

      <button className="text-white font-medium" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  </header>)
};

export default Header;
