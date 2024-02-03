import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import {useSavePassGetMutation} from "../slices/api"
import { toast } from 'react-toastify';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {useDeletePassMutation} from "../slices/api"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Body = () => {
  const [getDataAPI] = useSavePassGetMutation();
  const [deleteAPI] = useDeletePassMutation();
  const navigate = useNavigate();
  const [data,SetData] = useState('');
  const [flag,setFlag] = useState(false);
   const { userInfo } = useSelector((state) => state.auth);
  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }
    getDataAPI().unwrap().then((datas)=>{
      const data = datas[0]?.savedPassword.filter((index)=>index!==null)
      SetData(data);
      console.log(datas[0].savedPassword) 
    }).catch((err)=>{toast.error(err?.error?.msg);})
  },[flag])
  const deletePass =(index)=>{
      deleteAPI(index).unwrap().then((res)=> toast.info("deleted successfully")).catch((err)=>toast.error("something went wrong"))
      setFlag((prevFlag) => !prevFlag);
  }
  return (
    <div className="p-2 m-2 ml-10" >
      <Link to="pass">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Generate Password
        </button>
      </Link>
      <>
        {data.length!=0 ? <div className=" w-6/6">
          <div className="text-center mt-4">
            <h1 className="text-white text-xl font-bold">
              Generated passwords
            </h1>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen flex items justify-center font-sans overflow-hidden">
              <div className="w-full lg:w-4/6 ">
                <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg mt-10 bg-white ">
                  <table className="w-full bg-slate-400 text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Platform</th>
                        <th className="py-3 px-6 text-left">password</th>
                        <th className="py-3 px-6 text-center">Delete</th>
                      </tr>
                    </thead>
                    {data
                      ? data?.map((index, i) => (
                          <tbody className="text-gray-600 text-sm font-light">
                            <tr
                              key={i}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    {index.field}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>{index.password}</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div className="flex items-center justify-center">
                                  <button
                                    className="mr-3"
                                    onClick={() => deletePass(index._id)}
                                  >
                                    <AiFillDelete
                                      style={{
                                        color: "red",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))
                      : null}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> : <div className="min-w-screen min-h-screen flex items justify-center font-sans overflow-hidden">
              <div className="w-full lg:w-4/6 ">
                <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg mt-10 "><p>No data to show </p></div> 
                </div>
                </div>}
        
      </>
    </div>
  );
}

export default Body