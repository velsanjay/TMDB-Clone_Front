import React from 'react'
import NavPage from './NavPage';
import HomePage from './HomePage';
import { HashLoader } from 'react-spinners';

function Dashboard({ data,setData, setCount, count, cart, setCart, loading, setLoading }) {
  return <>
   
    <div>
    <NavPage
    data={data}
    setData = {setData}
    setCount={setCount}
    count = {count}
    cart = {cart}
    setCart = {setCart}
    setLoading = {setLoading}
    />
    {loading ?(
        <div className='load'>
            <HashLoader
        color="darkblue"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
       ):(
    <HomePage
    count = {count}
    setCart = {setCart}
    cart = {cart}
    data={data}
    setCount={setCount}
    loading = { loading }
    setData = {setData}
    setLoading={setLoading}
    />
       )}
  </div>

  </>
}

export default Dashboard