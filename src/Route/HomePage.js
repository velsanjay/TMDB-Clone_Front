import React from 'react'
import {   Button, Pagination } from '@mui/material'
import { Cards, RetutnData } from './data';
import { toast } from 'react-toastify';

function HomePage({data,setData,setCount,count , cart, setCart}) {
  if(data.length==0){
    toast.error('No Data Found!!!')
  }
  return (
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
          onClick={()=>RetutnData({setData})}
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
          num:e.target.innerText
        })}
        count={1} />
        </div>
      )}
      
    </div>
  )
}



export default HomePage

