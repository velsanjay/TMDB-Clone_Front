import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../App';
import { Button, Rating } from '@mui/material';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

function ViewCard() {
    const { id } = useParams();
    const [genere , setGenere] = useState(null)
    const [rend ,setRend] = useState({})
    const [time , setTime] = useState('')
    const [rating, setRating] = useState(0);
    const [back , setBack] = useState('')
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false)

   useEffect(()=>{
   const FetchData = async () =>{
    setLoading(true)
    try {
            let payload = {id}
        let res = await axios.post(`${url}/id`,payload)
        setRend(res.data.data)
        let rate =res.data.data.vote_average/2
        setRating(rate)
        toast.success(`${res.data.data.original_title} Movie ${res.data.message}`)
        let data =''
        let bgImg = `https://image.tmdb.org/t/p/w500/${res.data.data.backdrop_path}`
        // console.log(bgImg);
        setBack(bgImg)
        var hours = Math.floor(res.data.data.runtime / 60);  
        var minutes = res.data.data.runtime % 60;
        setTime(`${hours}h ${minutes}m`)
        for(let i of res.data.data.genres){
            data +=` ${i.name}`
        }
        setGenere(data)
    } catch (error) {
     toast.error(error.response.data.message)
    }
    setLoading(false)
}
    FetchData()
   },[])

   let date;
  if(rend !=null){
    let mon = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    if (rend.release_date){
      let ex1 = rend.release_date.split('-')
       date = `${ex1[2]} ${mon[Number(ex1[1])]} ${ex1[0]}` 
    }else if(rend.first_air_date){
      let ex1 = rend.first_air_date.split('-')
      date = `${ex1[2]} ${mon[Number(ex1[1])]} ${ex1[0]}` 
    }
}

 
   
    const img = (prop) => `https://image.tmdb.org/t/p/w500${prop}`
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
            { rend ? (
                <div className='view' style={{"backgroundImage":`url(${back})`,"backgroundSize":"cover","backgroundPosition":"center"}}>
                 <div>
                        <img alt={rend.title || rend.name} src={img(rend.poster_path)}/>
                </div>
                <div>
                    <h1>{rend.title || rend.name}</h1>
                     
                     <p>{date} . {genere} . {time}</p>
                     {rating !== 0 ?(
                        <Rating name="half-rating-read" defaultValue={rating } precision={0.1} readOnly />
                     ):(
                        null
                     )}
                     
                    <p className='sty'>{rend.tagline}</p>
                    <h4>OVERVIEW</h4>
                    <p>{rend.overview}</p>
                    <div className='bottom'>
                        {rend.homepage !== '' ?(
                            <a href={rend.homepage} target='_blank'>Watch Trailer</a>
                        ):(
                            null
                        )}
                    
                    <Button
                    onClick={()=>navigate('/dashboard')}
                    variant="contained">BACK</Button>
                </div>
                </div>
                </div>
            ) : (
                null
            )}

</div>
)}
</>
}

export default ViewCard