import React, { useEffect } from 'react'
import NavPage from './NavPage';
import HomePage from './HomePage';
import { useNavigate } from 'react-router-dom';

function Dashboard({ data,setData, setCount, count, cart, setCart }) {
  return (
    <div>
    <NavPage
    data={data}
    setData = {setData}
    setCount={setCount}
    count = {count}
    cart = {cart}
    setCart = {setCart}
    />
    <HomePage
    count = {count}
    setCart = {setCart}
    cart = {cart}
    data={data}
    setCount={setCount}
    setData = {setData}
    />
  </div>
  )
}

export default Dashboard