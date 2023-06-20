import React from 'react'
import {   Button, Pagination } from '@mui/material'
import { Cards, RetutnData } from './data';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

function HomePage({data,setData,setCount,count , cart, setCart, loading, setLoading}) {
  if(data.length==0){
    toast.error('No Data Found!!!')
  }
  return <>
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
    <div>
    <div className='home'>
      {data.length > 0 ? (
        data.map((data, index) => 
       <Cards
       key={index}
       setData={setData}
          index={index}
          data={data}
          cart= {cart}
          setCart= {setCart}
          count={count}
          setCount={setCount}
        />  
          )
     
      ) : (
        <div className='nopage'> 
          <h1>No Data Found!!!</h1>
          <Button
          color="primary"
          variant='contained'
          onClick={()=>RetutnData({setData, setLoading})}
          >Back to Home</Button>
        </div>
      )}
      </div>
      {data.length > 0 && data.length <= 20 ? (
        <div className='page'>
        <Pagination 
        hidePrevButton
        variant="outlined"
        shape="rounded" 
        hideNextButton
        onClick={(e)=>RetutnData({
          setData,
          setLoading,
          num:e.target.innerText
        })}
        count={200} />
        </div>
      ) :data.length > 21 ?(
        null
      ) : (
        <div className='page'>
        <Pagination 
        hidePrevButton
        variant="outlined"
        shape="rounded" 
        hideNextButton
        onClick={(e)=>RetutnData({
          setData,
          setLoading,
          num:e.target.innerText
        })}
        count={1} />
        </div>
      )}
      
    </div>
     )}
  </>
}



export default HomePage

