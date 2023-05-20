import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { url } from '../../App';



function SignUp() {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name , setName] = useState(null);
  const [password , setPsssword] = useState(null);
  const [email , setEmail] = useState(null);
  const [confirmPassword , setConfirmPsssword] = useState(null);

  const handleUser = async(e) =>{
  e.preventDefault();

    let payload = {name,email,password,confirmPassword}
    try {
      let res = await axios.post(`${url}/signup`,payload)
      toast.success(res.data.message)
      console.log(res.data)
      let data =document.querySelectorAll('input')
      for(let i of data){
        i.value='';
      }
      navigator('/')
    } catch (error) {
      toast.error(error.response.data.message)
 
    }

  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    // <div>
    //     <h1>Hii</h1>
    // </div>
    <div className='sigin'>
      <h1> Sign Up </h1>
      <form onSubmit={handleUser}>
      <div className='items'>
      <TextField 
      id="outlined-basic"
      onChange={(e)=>setName(e.target.value)}
      required label="Name" variant="standard" />
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
          onChange={(e)=>setPsssword(e.target.value)}
          required
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
          <FormControl  variant="standard">
      <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
          <Input
         required
         onChange={(e)=>setConfirmPsssword(e.target.value)}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            label="confirm"
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
          <p  onClick={()=>navigator('/forget')}>Forget Password?</p>
      <Button 
      variant="contained" 
      type='submit'
      color="secondary">
        Sign Up
      </Button>
      
    </div>
            <p onClick={()=>navigator('/')} > Already You Have Account?</p>
            </form>
    </div>
  )
}

export default SignUp