import { useState } from 'react'
import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import logo from './assets/logo.png';
import background from './assets/background.jpg';

function App() {
  const [link, setLink] = useState('')

  return (
    <Box sx={{
      width: '100%',
      padding: 0,
      height: '100%',
      overflow: 'hidden',
      backgroundColor: '#cccccc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'rgba(99, 99, 99, 0.4)',
      WebkitBackdropFilter: 'blur(4px)',
      backdropFilter: 'blur(50px) grayscale(0.2)',
      position: 'relative'
    }}>
      <Box component={'img'} src={logo} sx={{
        position: 'absolute',
        maxHeight: '12%',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000
      }} />
      <Box component={'img'} src={background} sx={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        zIndex: -1
      }} />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '50%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `
            radial-gradient(ellipse, rgba(152, 158, 154, 0), rgba(0, 77, 23, 0.47)),
      linear-gradient(0deg, rgba(72, 80, 73, 0.33), rgba(35, 138, 86, 0.33))
      `,
          }}
        />
        <Box
          sx={{
            width: '50%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `
            radial-gradient(ellipse, rgba(152, 158, 154, 0), rgba(88, 1, 1, 0.47)),
            linear-gradient(0deg, rgba(72, 80, 73, 0.33), rgba(128, 0, 0, 0.33))
          `,
          }}
        />
      </Box>
      <Stack sx={{
        width: { xs: '80%', md: '50%' },
        margin: 'auto',
        position: 'absolute',
        alignItems: 'center',
        top: '25%',
        zIndex: 1000,
        padding: '20px',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        gap: 3
      }}>
        <Box sx={{
          width: '100%',
          color: '#ffffff',
          fontWeight: 'semibold',
          textShadow: 'inherit'
        }}>
          <Typography>Converta uma <b>playlist pública</b> do <b>Spotify</b> em uma playlist no <b>Youtube</b></Typography>
        </Box>
        <Box sx={{
          padding: '20px',
          backgroundColor: '#ffffff',
          background: 'rgba(255, 255, 255, 0.4)',
          WebkitBackdropFilter: 'blur(4px)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          width: '100%'
        }}>
        <TextField
          label="Link de uma playlist pública"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          variant='standard'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{'&:hover': {color:'#ffffff'},             zIndex: 1000
              }} >
                <SwapHorizIcon/>
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            zIndex: 1000
          }}
        />
        </Box>
      </Stack>
    </Box>
  )
}

export default App
