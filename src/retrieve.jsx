import { useState,useEffect } from "react";

const Retrieve = ()=>{
    const users = JSON.parse(localStorage.getItem('users'));
    // console.log(users);
    
    const [query, setQuery] = useState("");
    let [userObj,setUserObj] = useState([])
    const findUser  = ()=>{
      setUserObj(users.filter(user => (user.aadhar) == (query)))
    }
   
    return (
        <div className="retrieve  w-11/12 mt-16  pb-10 mx-auto border border-black">
            <p className='px-5 py-3 border-b border-r border-black w-52'>Retrieve Information</p>
            <div className="query-aadhar w-full p-5">
                <input onChange={(e)=>setQuery(e.target.value)} className="border border-black w-1/2 pl-4 py-2" placeholder="Enter Aadhar Number" type="number" />
                <button onClick={findUser} className="ease duration-500 bg-purple-500 py-2 rounded-lg px-4 ml-4 hover:text-white hover:bg-purple-700">Find</button>
            </div>
            <div className="results-cont">
                {
                    userObj?.length != 0 ?(
                        <div className="result-card rounded-lg w-11/12 bg-purple-300 mx-auto p-5">
                            <p className="font-semibold text-gray-800">Name: {userObj[0]?.name}</p>
                            <p className="font-semibold text-gray-800">Dob: {userObj[0]?.dob}</p>
                            <p className="font-semibold text-gray-800">Age: {userObj[0]?.age}</p>
                            <p className="font-semibold text-gray-800">Aadhar: {userObj[0]?.aadhar}</p>
                            <p className="font-semibold text-gray-800">Mobile No: {userObj[0]?.mobile}</p>
                        </div>
                    ):
                    <p className="text-center text-gray-800 mt-12">No user Data.</p>
                }
            </div>
        </div>
    );
}

export default Retrieve;