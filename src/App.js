import './App.css';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Route/Dashboard';
import ViewCard from './Route/viewCard';
import DataProvider from './Route/data';
import SignUp from './Route/User/SignUp';
import SignIn from './Route/User/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forget from './Route/User/forget';


export const url = "https://tmdb-clone.onrender.com"

function App() {
  const {data , setData, count , setCount, cart, setCart, loading, setLoading} = DataProvider();
  return (
   <div>
    <Routes>
      <Route path ='/' element={<SignIn/>}/>
      <Route path ='/signup' element={<SignUp/>}/>
      <Route path ='/forget' element={<Forget/>}/>
      <Route path='/dashboard' element={<Dashboard
      data={data}
      setData = {setData}
      setCount={setCount}
      count = {count}
      cart = {cart}
      setCart = {setCart}
      loading= {loading}
      setLoading = {setLoading}
      />} />
      <Route path='/view/:id' element={<ViewCard/>}/>

      {/* <Route path="*" element={<Navigate to='/'/>}  /> */}
    </Routes>
      <ToastContainer/>

   </div>
  );
}

export default App;


