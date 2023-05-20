import axios from 'axios'
import { useEffect, useState } from 'react'
import { url } from '../App'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function DataProvider() {
    const [data , setData] = useState([])
    const [count, setCount ] = useState(0);
    const [ cart , setCart ] = useState([])
    let token = sessionStorage.getItem('token')
    let navigate = useNavigate()

  let logout = ()=>{
      sessionStorage.clear()
      navigate('/')
  }
  const fetchData = async () => {
    try {
      let res = await axios.get(`${url}`,{
        headers:{Authorization:`Bearer ${token}`}
      })
      setData(res.data.data);
      console.log(res.data)
      toast.success(res.data.message)
    } catch (error) {
      if(error.response.status === 401 || error.response.status===400)
      {
        toast.error(error.response.data.message)
        logout()
      }
    }
   
  }

    useEffect(() => {
      if(token)
      fetchData()
      else
      logout()    
      }, [token])


  return {data,setData,count,setCount,cart,setCart}
}

export default DataProvider

let shows;
   let details;
export const RetutnData = async ({show, detail,setData,num}) =>{
   let page = 1;
   
   if(!show){
    show = shows
    detail = details
    console.log(show,detail);
   }
     page = num;
   console.log(show,detail);
    let payload = {page,show , detail}
    try {
      let res = await axios.post(`${url}/show`,payload)
      setData(res.data.data)
    } catch (error) {
      console.log(error);
    }
    shows = show;
    details = detail;
  }

export const SearchData = async({setData, query}) =>{
  // console.log(query )

  let payload= {query,show:"movie"}
  let payload1= {query,show:"tv"}
  
  try {
    let res = await axios.post(`${url}/search`,payload)
    let res1 = await axios.post(`${url}/search`,payload1)

    setData([...res.data.data,...res1.data.data])
    let inp = document.querySelector('input')
    inp.value = '';
   } catch (error) {
   console.log(error); 
  }

}