import { useState, useEffect } from "react";
import usePasswordGenerator from "../hooks/passWordGenertor";
import StrengthChecker from "../utilis/StrengthChecker";
import { useSavePassMutation } from "../slices/api";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const PasswordGenerator = () => {

  const [length, setLength] = useState(4);
  const [checkboxData, setCheckBoxData] = useState([
    { title: "uppercase", state: false },
    { title: "lowercase", state: false },
    { title: "numbers", state: false },
    { title: "symbols", state: false },
  ]);
  const [savepass] = useSavePassMutation();
  const [field, setField] = useState("");

  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
 useEffect(()=>{
  if(!userInfo) navigate('/login')
 },[])

  const { password, error, generatePassword } = usePasswordGenerator();


  const handleCheckboxChange = (index) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckBoxData(updatedCheckboxData);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    try {
      console.log("field is ", field);
      e.preventDefault();
      if (!password) {
        toast.info("generate passwords");

        return;
      } else if (field.trim() === "") {
        toast.info("Enter the platform Name");

        return;
      } else {
        const res = await savepass({ password, field }).unwrap();
        if (res.msg) {
          toast.info("saved successfully");
          setField("");
          navigate("/");
          return;
        } else {
          toast.error("some thing went wrong");
          return;
        }
      }
    } catch (err) {
      toast.error("some thing went wrong");
    }
  };

  
  return (
    <div
      style={{
        backgroundImage:
          'url("https://media.istockphoto.com/id/808424876/photo/password-input-field-with-padlock.jpg?s=612x612&w=0&k=20&c=vvaVPgT61fbRU_YXCgPr_EaaleWOJid5gBQ65-Jrcg4=")',
        backgroundSize: "cover",
      }}
    >
      <div className="bg-blue-800 shadow-md w-1/2 h-screen p-12 ml-96">
        <div className="flex items-center justify-between mb-5">
          {error ? (
            <h1 className="text-red-500">{error}</h1>
          ) : (
            <h1 className="text-blue-200">{password}</h1>
          )}
          <button
            className="cursor-pointer bg-blue-600 border-0 text-white py-2 px-6 mr-4"
            onClick={copyPassword}
          >
            {copied ? "copied" : "copy"}
          </button>
          <button
            className="cursor-pointer bg-blue-600 border-0 text-white py-2 px-6 mr-4"
            onClick={() => generatePassword(checkboxData, length)}
          >
            generate
          </button>
        </div>
        <div className="flex flex-col font-semibold pb-6 mb-5">
          <span>
            <label htmlFor="length">number of character</label>
            <label htmlFor="passLen">{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 font-semibold text-2xl mb-5">
          {checkboxData.map((chk, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={() => handleCheckboxChange(index)}
                  checked={chk.state}
                />
                <label htmlFor="chktitle">{chk.title}</label>
              </div>
            );
          })}
        </div>
        <StrengthChecker password={password} />

        <div className="bg-blue-800">
          <h1 className="text-white text-xl text-center mt-5 ">Save Password</h1>
          <form onSubmit={handleSubmit}>
            <label className="block text-black text-sm font-bold mb-2 px-3">
              Enter platform name
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline items-center m-4"
              id="username"
              type="text"
              placeholder="Enter platform name"
              value={field}
              onChange={(e) => setField(e.target.value)}
            />
            <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 ml-6">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
