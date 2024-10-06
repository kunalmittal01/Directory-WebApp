import { useState } from "react";
import Userinfo from "./Userinfo";
const DirectoryCont = ()=>{
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [age, setAge] = useState("");
  const [userRecords, setUserRecords] = useState(JSON.parse(localStorage.getItem("users")) || []);
  const [errRec ,setErrRec] = useState({});
  const checkUser = ()=>{
    const user = userRecords.find(record=>record.aadhar == aadharNo);
    if(user){
        return -1;
    }  
  }

  const validateName = () => {
    const regex = /^[a-zA-Z\s]+$/; // Only allows alphabets and spaces
    return regex.test(name) ? '' : 'Name should contain only alphabets and spaces';
  };

  const validateAadhar = () => {
    const regex = /^\d{12}$/; // Allows exactly 12 digits
    return regex.test(aadharNo) ? '' : 'Aadhar number must be exactly 12 digits';
  };

  const validateMobile = () => {
    const regex = /^\d{10}$/; // Allows exactly 10 digits
    return regex.test(mobileNo) ? '' : 'Mobile number must be exactly 10 digits';
  };

  const validateDOB = () => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Allows YYYY-MM-DD format
    if (!regex.test(dob)) return 'DOB must be in YYYY-MM-DD format';
      return '';
  };

  const validateAge = () => {
    return age > 0 ? '' : 'Age must be greater than 0';
  };

  const calculateAge = () => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    
    // If current month is before the birth month, or if it's the birth month but current date is before the birth date, subtract 1 from the age
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    if(isNaN(calculatedAge)) {
      setAge(0);
      return;
    }
    setAge(calculatedAge);
  };

  const getDob = (e)=>{
    setDob(e.target.value);
    console.log(dob);
    
    calculateAge();
  }

  const onSave =  (e)=> {
    e.preventDefault();
    const errObj = {
      name: validateName(),
      dob: validateDOB(),
      aadhar: validateAadhar(),
      mobile: validateMobile(),
      age: validateAge(),
    }
    if(errObj.name != '' || errObj.dob != '' || errObj.aadhar != '' || errObj.mobile != '' || errObj.age != '') {
      setErrRec(errObj);
      setTimeout(()=>{
        setErrRec({})
      },5000)
      return;
    }
    const res = checkUser();
        if(res == -1) {
            setErrRec({err:"User already exists"});
            setTimeout(()=>{
              setErrRec({})
            },5000)
            return;
        }
    if(name && dob && aadharNo && mobileNo && age) {
      const user = {name: name, dob: dob, aadhar: aadharNo, mobile: mobileNo, age: age};
      const copy = [...userRecords];
      copy.push(user);
      localStorage.setItem("users",JSON.stringify(copy));
      setUserRecords(copy);
      setName("");
      setDob("");
      setAadharNo("");
      setMobileNo("");
      setAge("");
      setShowForm(false);
    }
  }
  
  const onDelete = (aadhar)=>{
    const newRec = userRecords.filter(record=> {
      return record.aadhar!== aadhar});

    setUserRecords(newRec);
    localStorage.setItem('users', JSON.stringify(newRec));  
  }
    return (
        <div className="directory-cont overflow-x-scroll w-11/12 mt-16  mx-auto border border-black">
            <p className='px-5 py-3 border-b border-r border-black w-52'>Add New Person</p>
            <div className="entries p-7">
            <table className='w-full border'>
                <thead className="bg-purple-500">
                <tr>
                    <th className='border border-black'>Name</th>
                    <th className='border border-black'>Date Of Birth</th>
                    <th className='border border-black'>Aadhar No</th>
                    <th className='border border-black'>Mobile No</th>
                    <th className='border border-black'>Age</th>
                    <th className='border border-black'>Actions</th>
                </tr>  
                </thead>
                <tbody>
                {
                    userRecords.map((record, index) => (
                    <Userinfo key={`${Date.now()}-${Math.random()*5000}`} id={`${Date.now()}-${Math.random()*5000}`} data={record} {...record} delete={onDelete} />
                    ))
                }
                </tbody>
            </table>
            { !showForm? "":
            <div className="filling mt-4 bg-purple-400 py-2 px-3">
                <p className='text-center text-lg font-medium mb-2'>Fill below form for New Entry</p>
                <form action="" className='w-full flex justify-between flex-wrap gap-y-2'>
                  <table className="w-full">
                    <tbody className="w-full">
                      <tr className="flex w-full justify-center items-center">
                        <td className="w-full">
                          <input className="border w-full border-gray-500" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' required />
                        </td>
                        <td className="w-20 md:w-56"><input value={dob}  onChange={getDob} className='px-3 w-full border border-gray-500' type="date" required /></td>
                        <td className="w-full"><input value={aadharNo} min={100000000000} max={999999999999} onChange={(e) => setAadharNo(e.target.value)} className='px-3 w-full border border-gray-500' type="number" placeholder='Aadhar No' required/></td>
                        <td className="w-full"><input value={mobileNo} min={1000000000} max={9999999999} onChange={(e) => setMobileNo(e.target.value)} className='px-3 w-full border border-gray-500' type="number" placeholder='Mobile No' required /></td>
                        {/* <td className="w-full"><input value={age} onChange={(e) => setAge(e.target.value)} className='pl-2 w-full border border-gray-500' type="number" placeholder='Age' /></td> */}
                        <td className="w-full"><p className="w-wull border border-gray-500 h-6 bg-gray-200">{age}</p></td>
                        <td className="w-full"><button onClick={onSave} className='bg-gray-500 text-white font-medium px-4 rounded-md w-full'>Save</button></td>
                      </tr>
                    </tbody>
                  </table>
                </form> 
                <div className="errors">
                  {Object.values(errRec).map((error, index) => (
                    <p key={index} className='text-red-500 text-sm'>{error}</p>
                  ))}
                </div>
            </div>
            }
            </div>
            <div className="add-btn flex justify-end mt-20">
                <button onClick={()=>setShowForm(true)} className='px-5 py-2 rounded-md mr-2 bg-purple-500'>Add</button>
            </div>
        </div>
    )
}

export default DirectoryCont;