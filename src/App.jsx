import { useState } from 'react'
import Userinfo from './Userinfo';
import Retrieve from './retrieve';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import DirectoryCont from './directoryCont';
import './App.css'
import './index.css'
function App() {
  
  return (
    <>
    <Router>
      <p className="bg-purple-400 py-4 text-2xl text-center">Kunal Mittal Directory App</p>
      <div className="btn-cont ml-5 mt-10 md:ml-12">
       <NavLink to="/" className={({isActive,isPending})=>{isActive?'bg-gray-200':isPending?'bg-slate-50':''}}><button className="ease duration-700 hover:text-white hover:bg-purple-700 bg-purple-400 px-3 py-2 rounded-md text-slate-700 font-medium">Add New Person</button></NavLink>
       <NavLink to="/retrieve"><button className="mt-2 ease duration-700 hover:text-white hover:bg-purple-700 bg-purple-400 ml-4 px-3 py-2 rounded-md text-slate-700 font-medium"> Retrieve Information</button></NavLink>
      </div>
        <Routes>
          <Route path='/' element={<DirectoryCont />}></Route>
          <Route path='/retrieve' element={<Retrieve />}></Route>
        </Routes>
    </Router>
    </>
  )
}

export default App
