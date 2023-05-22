import React from 'react'
import {   Button, Pagination } from '@mui/material'
import { Cards, RetutnData } from './data';
import { useNavigate } from 'react-router-dom';

function HomePage({data,setData,setCount,count , cart, setCart}) {
  const navigate = useNavigate()
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
        <div>
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

