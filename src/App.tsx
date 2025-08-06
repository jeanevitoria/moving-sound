import { useEffect, useState } from 'react'
import { Box, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import { generateYoutubePlaylist, searchSpotifyPlaylist } from './services/api';
import VideoCard from './components/VideoCard';

function App() {
  const [link, setLink] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<string[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => { localStorage.removeItem('token') }, [])

  const searchPlaylist = async () => {
    const playlist_id = link.split('/').pop()?.split('?')[0];

    await searchSpotifyPlaylist(playlist_id)
      .then((res: string[]) => setTracks(res))
      .catch((err) => console.error(err))
  }

  useEffect(() => { generatePlaylist(); }, [tracks])

  const generatePlaylist = async () => {
    if (!tracks || tracks.length === 0) return;
    setLoading(true)

    generateYoutubePlaylist(tracks)
      .then((res) => {
        setVideos(res ? res : [])
        setLoading(false)
        setOpen(true);
      })
      .catch((err) => alert(err))
  }

  return (
    <Box sx={{
      padding: 0,
      height: '100vh',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: '#1A2730',
      backgroundImage: `
    radial-gradient(circle, rgba(0,255,255,0.1) 1px, transparent 1px),
    radial-gradient(circle, rgba(0,255,255,0.08) 1px, transparent 1px)
  `,
      backgroundSize: '30px 30px, 60px 60px',
      backgroundPosition: '0 0, 15px 15px',
      boxShadow: 'inset 0 0 70px rgba(0,255,255,0.04)',
      color: '#00f6ff',
    }}>
      <Typography
        sx={{
          fontFamily: 'Uncial Antiqua',
          position: 'absolute',
          color: '#ffffff',
          maxHeight: '15%',
          textWrap: 'nowrap',
          fontSize: { xs: '2.15rem', md: '2.75rem' },
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000
        }}
      >
        MOVING SOUND
      </Typography>
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
      </Box>
      <Stack
        sx={{
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
          gap: 0
        }}
      >
        <Stack gap={7} sx={{ marginBottom: '10px' }}>
          <Box sx={{
            width: '100%',
            fontWeight: 'semibold',
            textShadow: 'inherit',
            display: 'flex',
            boxShadow: 'initial',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            marginX: 'auto',
          }}>
            <Typography variant='subtitle2' sx={{ boxShadow: 'inherit' }}>Converta uma <b>playlist pública</b> do</Typography>
            <Typography variant='subtitle2' sx={{ boxShadow: 'inherit' }}> <b style={{ color: '#2fce16' }}> Spotify</b> para o <b style={{ color: '#ff0000' }}> Youtube </b></Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', color: 'yellow', justifyContent: 'center' }}>
            <InfoOutlinedIcon sx={{ marginRight: '5px', fontSize: '20px' }} />
            <Typography variant='caption'>Apenas playlists não oficiais do Spotify.</Typography>
          </Box>
        </Stack>
        <Paper
          elevation={5}
          sx={{
            borderRadius: '15px',
            overflow: 'hidden',
            width: '100%',
            border: 'solid 1px #fff'
          }}>
          <TextField
            size='small'
            label="Link de uma playlist pública"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            variant="filled"
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={searchPlaylist}
                    sx={{
                      color: '#000',
                      "&:hover": { color: "#555" },
                    }}
                  >
                    <SwapHorizIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              height: '100%',
              border: 'solid 1px #fff',
              backgroundColor: "#fff",
              borderRadius: "15px",
              "& .MuiFilledInput-root": {
                backgroundColor: "#fff",
                "&:before, &:after": {
                  display: "none",
                },
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&.Mui-focused": {
                  backgroundColor: "#fff",
                },
              },
              "& .MuiInputBase-input": {
                color: "#000",
              },
            }}
          />

        </Paper>
        {loading &&
          <Box sx={{ width: '100%', my: 6 }}>
            <Typography variant='subtitle1' sx={{ mb: 2 }}>Processando... Isso levará aproximadamente {Math.floor((tracks.length * 5) / 60)} minutos. Aguarde.</Typography>
            <LinearProgress />
          </Box>
        }
        <Box sx={{ marginBottom: '20px', my: 3 }}>
          <Stack direction="column" alignContent={'center'} justifyContent={'center'} >
            <Collapse in={open}>
              <Alert
                severity='info'
                action={
                  <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                }
                sx={{ my: 3 }}
              >
                <Typography textAlign={'left'} variant='subtitle2'>Devido a limitações da API do Youtube, há um limite de 200 músicas por playlist.</Typography>
              </Alert>
            </Collapse>
            {videos.length > 0 && (
              <VideoCard videos={videos} />
            )}
          </Stack>
        </Box>
      </Stack >
    </Box >
  )
}

export default App
