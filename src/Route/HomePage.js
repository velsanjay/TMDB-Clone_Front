import React, {  useState } from 'react'
import {  Button, Pagination } from '@mui/material'
import { RetutnData } from './data';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useNavigate } from 'react-router-dom';

function HomePage({data,setData,setCount,count , cart, setCart}) {
  
  return (
    <div>
    <div className='home'>
      {data.length > 0 ? (
        data.map((data, index) => 
       <Cards
       key={index}
          index={index}
          data={data}
          cart= {cart}
          setCart= {setCart}
          count={count}
          setCount={setCount}
        />  
          )
     
      ) : (
        null
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
        count={100} />
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

function Cards({ data, index, setCount, count, cart, setCart }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const img = (prop) => `https://image.tmdb.org/t/p/w500${prop}`
  function addToCart(data) {
    setShow(!show);
    setCart([...cart,data])
    console.log(show);
    setCount(count + 1);
  }

  function removeFromCart(data) {
    setShow(!show)
    setCount(count - 1)
    let remove = cart.filter((e)=> e.id !== data.id)
    setCart(remove)
  }

  return (
    <div className='card' key={index}>
      <img src={img(data.poster_path)} alt={ data.title || data.name} />
      <h4>{data.title || data.name}</h4>
      <p>{data.release_date || data.first_air_date}</p>
     <div className='search'>
      {!show ? <BookmarkAddIcon
        variant="primary"
        onClick={()=>addToCart(data)}
      /> : ""}
      {show ? <BookmarkAddedIcon
        variant="danger"
        onClick={()=>removeFromCart(data)}
      /> : ""}
      <Button
      onClick={()=>navigate(`/view/${data.id}`) }
      variant="contained">View</Button>
     </div>
    </div>
  )
}



export default HomePage

