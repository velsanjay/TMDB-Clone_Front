import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../../App';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Forget() {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]= useState(null);
  const [password , setPassword] =useState(null)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  };
const handleForget = async(e) =>{
  e.preventDefault();
const payload ={email,password}
try {
  let res = await axios.patch(`${url}/forget` , payload)
  toast.success(res.data.message)

  const a= document.querySelectorAll('input')

  for(let i of a){
    i.value='';
  }
  navigator('/')

} catch (error) {
  toast.error(error.response.data.message)
}  
}
  return (
    <div className='sigin'>
    <h1> Forget Password </h1>
    <form onSubmit={handleForget}>
    <div className='items'>

    <FormControl  variant="standard">
        <InputLabel
        htmlFor="input-with-icon-adornment">
          email
        </InputLabel>
        <Input
        required
        onChange={(e)=>setEmail(e.target.value)}
          id="input-with-icon-adornment"
          label="email"
          className='email'
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
        </FormControl>
    <FormControl  variant="standard">
    <InputLabel htmlFor="standard-adornment-password"> Password</InputLabel>
        <Input
        required
        onChange={(e)=>setPassword(e.target.value)}
        label="First Name"
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        </FormControl>
   

    </div>

        <div className='flex'>
        <p onClick={()=>navigator('/signup')}>Create New Account?</p>
    <Button 
    type='submit'
    variant="contained" color="secondary">
      Reset
    </Button>
  </div>
          <p onClick={()=>navigator('/')} > Already You Have Account?</p>
          </form>
  </div>
  )
}

export default Forget