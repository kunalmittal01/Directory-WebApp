const Userinfo = (props)=>{
    return (
        <tr>
            <td className='text-center border border-black'>{props.name}</td>
            <td className='text-center border border-black'>{props.dob}</td>
            <td className='text-center border border-black'>{props.aadhar}</td>
            <td className='text-center border border-black'>{props.mobile}</td>
            <td className='text-center border border-black'>{props.age}</td>
            <td className='text-center border border-black'><button onClick={()=>props.delete(props.aadhar)} className="bg-red-500 px-2 text-white rounded-lg">Delete</button></td>
        </tr>
    )
}

export default Userinfo