import axios from 'axios'
import { useEffect, useState } from 'react'
import { url } from '../App'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

function DataProvider() {
    const [data , setData] = useState([])
    const [count, setCount ] = useState(0);
    const [ cart , setCart ] = useState([])
    const [loading, setLoading] = useState(false)
    let token = sessionStorage.getItem('token')
    let navigate = useNavigate()

  let logout = ()=>{
      sessionStorage.clear()
      navigate('/')
  }
  const fetchData = async () => {
    setLoading(true)
    try {
      let res = await axios.get(`${url}`,{
        headers:{Authorization:`Bearer ${token}`}
      })
      setData(res.data.data);
      toast.success(res.data.message)
    } catch (error) {
      if(error.response.status === 401 || error.response.status===400)
      {
        toast.error(error.response.data.message)
        logout()
      }
    }
    setLoading(false)
  }
    useEffect(() => {
      if(token)
      fetchData()
      else
      logout()    
      }, [token])
  return {data,setData,count,setCount,cart,setCart, loading, setLoading}
}

export default DataProvider

let shows;
   let details;
export const RetutnData = async ({show, detail,setData,num, setLoading}) =>{
   let page = 1;
   setLoading(true)
   if(!show){
    show = shows
    detail = details
    // console.log(show,detail);
   }
     page = num;
    let payload = {page,show , detail}
    try {
      let res = await axios.post(`${url}/show`,payload)
      setData(res.data.data)
      toast.success(`${res.data.data.length} Movies Found!!!`)
      // console.log(res.data.message)
      let inputData = document.querySelector('input')
      inputData.value=''
    } catch (error) {
      toast.error(error.response.data.message);
    }
    shows = show;
    details = detail;
    setLoading(false)
  }

export const SearchData = async({setData, query, setLoading}) =>{
  if(query==''){
    RetutnData({num:1,setData,setLoading})
  }else{
    setLoading(true)
  let payload= {query,show:"movie"}
  let payload1= {query,show:"tv"}

  try {
    let res = await axios.post(`${url}/search`,payload)
    let res1 = await axios.post(`${url}/search`,payload1)
    setData([...res.data.data,...res1.data.data])
   } catch (error) {
   toast.error(error.response.data.message) 
  }
  setLoading(false)  
}
}

export function Cards({ data, index, setCount, count, cart, setCart }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(()=>{;
    let cartDetail = cart.find((e)=>e.id===data.id)
    if(cartDetail){
      setShow(true)
    }else{
      setShow(false)
    }
  })
   
  const img = (prop) => `https://image.tmdb.org/t/p/w500${prop}`

  function addToCart(data) {

    setShow(!show);
    setCart([...cart,data])
    setCount(count + 1);
  }

  function removeFromCart(data) {
    setShow(!show)
    setCount(count - 1)
    let remove = cart.filter((e)=> e.id !== data.id)
    setCart(remove)

  }
  let date;
  if(data !=null){
    let mon = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    if (data.release_date){
      let ex1 = data.release_date.split('-')
       date = `${ex1[2]} ${mon[Number(ex1[1])]} ${ex1[0]}` 
    }else if(data.first_air_date){
      let ex1 = data.first_air_date.split('-')
      date = `${ex1[2]} ${mon[Number(ex1[1])]} ${ex1[0]}` 
    }
}

  return (
    <div className='card' key={index}>
      <img src={img(data.poster_path)} alt={ data.title || data.name} />
      <h4>{data.title || data.name}</h4>
      <p>{date}</p>
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
      style={{"position":"unset"}}
      onClick={()=>navigate(`/view/${data.id}`) }
      variant="contained">View</Button>
     </div>
    </div>
  )
}
