import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import  { RetutnData, SearchData } from './data';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



function NavPage({ data, setData ,count,cart }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState('');
  const [val, setVal] = useState(null)
  const [detail, setDetail] = useState('');
  const [query, setQuery] = useState("");
  let navigate = useNavigate()

  const tvData = [
    {
      "name": "Popular",
      "detail": "popular"
    },
    {
      "name": "Airing Today",
      "detail": "airing_today"
    },
    {
      "name": "On TV",
      "detail": "on_the_air"
    },
    {
      "name": "Top Rated",
      "detail": "top_rated"
    }
  ]
  const movieData = [
    {
      "name": "Popular",
      "detail": "popular"
    },
    {
      "name": "Now Playing",
      "detail": "now_playing"
    },
    {
      "name": "Upcoming",
      "detail": "upcoming"
    },
    {
      "name": "Top Rated",
      "detail": "top_rated"
    }
  ]

  const onSelect = async (event) => {
    setShow(event.target.value)

    if (show === 'tv') {
      setVal(false)
    } else if (show === 'movie') {
      setVal(true)
    }
    console.log(val)
  }
  let logout = ()=>{
    sessionStorage.clear()
    navigate('/')
}


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      console.log(show, detail);
    }
  };
  const SubmitDetail = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      RetutnData({
        show,
        detail,
        data,
        setData
      })
    }
  };
  return (
    <div className="App">
      <img className='img' alt='logo' src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg' />
      <div>

        <Button onClick={handleClickOpen}>choose</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Catogorie</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={show}
                  label="Catogorie"
                  onChange={onSelect}
                >
                  <MenuItem value={'movie'}>Movie</MenuItem>
                  <MenuItem value={'tv'}>TV</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">select</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                >
                  {val === false ? (
                    movieData.map((data, index) => (
                      <MenuItem
                        key={index}
                        value={data.detail}>{data.name}</MenuItem>
                    ))

                  ) : val === true ? (
                    tvData.map((data, index) => (
                      <MenuItem key={index} value={data.detail}>{data.name}</MenuItem>
                    ))
                  ) : (
                    null
                  )}



                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => SubmitDetail()}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className='search'>
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            onChange={(e) => setQuery(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
          <SendIcon
            onClick={() => SearchData({ setData, query, setQuery })}
          />
        </Search>
      </Toolbar>
      <IconButton
      onClick={()=>setData(cart)}
      aria-label="cart">
        <StyledBadge badgeContent={count} color="secondary">
          <ShoppingCartIcon
          
          />
        </StyledBadge>
      </IconButton>
      <Button
      onClick={()=>logout()}
      >Log Out</Button>
    </div>
    </div>
  )
}

export default NavPage