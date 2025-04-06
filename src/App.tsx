import { useEffect, useState } from 'react'
import { Box, Button, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import background from './assets/office.png';
import { generateYoutubePlaylist, searchSpotifyPlaylist } from './services/api';
import VideoCard from './components/VideoCard';

interface SpotifyResponse {
  tracks: {
    items: TrackItem[];
  };
}

interface TrackItem {
  track: Track;
}

interface Track {
  album: Album;
  artists: Artist[];
  href: string;
  name: string;
}

interface Album {
  href: string;
}

interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface YoutubeResponse {
  etag: string,
  items: Item[]
}

interface Item {
  etag: string,
  id: id,
  kind: string,
  snippet: Snippet
}

interface Snippet {
  channelId: string,
  channelTitle: string,
  description: string,
  title: string
}

interface id {
  kind: string,
  videoId: string
}

function App() {
  const [link, setLink] = useState<string>('')
  // const [videos, setVideos] = useState<Map<string, Item[]>>(new Map([
  //   ["Kelly Banda Labaredas", [
  //     {
  //       kind: "youtube#searchResult",
  //       etag: "dk6zMIi34d7TlMF-3EdRLPOKLeE",
  //       id: {
  //         kind: "youtube#video",
  //         videoId: "mejypuT-nIU"
  //       },
  //       snippet: {
  //         channelId: "UCzeatHUmIlIuWRxbWw1nj9Q",
  //         channelTitle: "O Melhor do Brega",
  //         title: "Banda Labaredas - 40 Anos de Estrada (Show Completo)",
  //         description: "Prepare-se para celebrar os 40 anos da maior banda de brega do Brasil: Labaredas! Com um currículo recheado de sucessos, ...",
  //         publishTime: "2022-05-27T22:00:11Z",
  //         thumbnails: {
  //           default: {/* ... */},
  //           medium: {/* ... */},
  //           high: {/* ... */}
  //         },
  //         liveBroadcastContent: "none",
  //         publishedAt: "2022-05-27T22:00:11Z"
  //       }
  //     }
  //   ]],
  //   ["Largado Às Traças - Ao Vivo Zé Neto & Cristiano", [
  //     {
  //       kind: "youtube#searchResult",
  //       etag: "plkQVqGRJI9YYfl8L1sL1Ag7yrM",
  //       id: {
  //         kind: "youtube#video",
  //         videoId: "WcTRQXtXJPs"
  //       },
  //       snippet: {
  //         channelId: "UCRRu9OXVYd5clj2Bs29gUVQ",
  //         channelTitle: "Zé Neto e Cristiano",
  //         title: "Zé Neto e Cristiano - LARGADO ÀS TRAÇAS - Zé Neto e Cristiano Acústico",
  //         description: "Zé Neto e Cristiano - Largado às traças Clique no link abaixo e ouça no seu APP de música favorito ...",
  //         publishTime: "2018-01-30T12:58:01Z",
  //         thumbnails: {
  //           default: {/* ... */},
  //           medium: {/* ... */},
  //           high: {/* ... */}
  //         },
  //         liveBroadcastContent: "none",
  //         publishedAt: "2018-01-30T12:58:01Z"
  //       }
  //     }
  //   ]],
  //   ["Medo Bobo - Ao Vivo Maiara & Maraisa", [
  //     {
  //       kind: "youtube#searchResult",
  //       etag: "kwtGYhAHNNmKsksEjtew54dEZVI",
  //       id: {
  //         kind: "youtube#video",
  //         videoId: "Jzl_nrTkfIM"
  //       },
  //       snippet: {
  //         channelId: "UCULzCZWkkOb9dW8rr6dguQQ",
  //         channelTitle: "Maiara e Maraisa",
  //         title: "Maiara & Maraisa - Medo Bobo (Ao Vivo em Goiânia)",
  //         description: "INSCREVA-SE NO NOSSO CANAL: https://goo.gl/8rlBhZ Para shows: (62) 3241-7163 comercial@maiaraemaraisa.com.br Ouça ...",
  //         publishTime: "2015-08-16T23:53:02Z",
  //         thumbnails: {
  //           default: {/* ... */},
  //           medium: {/* ... */},
  //           high: {/* ... */}
  //         },
  //         liveBroadcastContent: "none",
  //         publishedAt: "2015-08-16T23:53:02Z"
  //       }
  //     }
  //   ]],
  //   ["Ausência - Ao Vivo | Acústico Marília Mendonça", [
  //     {
  //       kind: "youtube#searchResult",
  //       etag: "plkQVqGRJI9YYfl8L1sL1Ag7yrM",
  //       id: {
  //         kind: "youtube#video",
  //         videoId: "WcTRQXtXJPs"
  //       },
  //       snippet: {
  //         channelId: "UCRRu9OXVYd5clj2Bs29gUVQ",
  //         channelTitle: "Zé Neto e Cristiano",
  //         title: "Zé Neto e Cristiano - LARGADO ÀS TRAÇAS - Zé Neto e Cristiano Acústico",
  //         description: "Zé Neto e Cristiano - Largado às traças Clique no link abaixo e ouça no seu APP de música favorito ...",
  //         publishTime: "2018-01-30T12:58:01Z",
  //         thumbnails: {
  //           default: {/* ... */},
  //           medium: {/* ... */},
  //           high: {/* ... */}
  //         },
  //         liveBroadcastContent: "none",
  //         publishedAt: "2018-01-30T12:58:01Z"
  //       }
  //     }
  //   ]],
  //   ["Borboletas Victor & Leo", [
  //     {
  //       kind: "youtube#searchResult",
  //       etag: "4HMlQ2G5Ca-8E8hl_aY4KHctzuw",
  //       id: {
  //         kind: "youtube#video",
  //         videoId: "28iW_O5qWfU"
  //       },
  //       snippet: {
  //         channelId: "UCBAb_DK4GYZqZR9MFA7y2Xg",
  //         channelTitle: "Galinha Pintadinha",
  //         title: "Borboletinha - Galinha Pintadinha 2 - OFICIAL",
  //         description: "Ouça em: Spotify: https://open.spotify.com/artist/070CnHC2iZh5oLpyWYPf8h Amazon Music: https://amzn.to/GalinhaPintadinha ...",
  //         publishTime: "2009-12-07T10:36:44Z",
  //         thumbnails: {
  //           default: {/* ... */},
  //           medium: {/* ... */},
  //           high: {/* ... */}
  //         },
  //         liveBroadcastContent: "none",
  //         publishedAt: "2009-12-07T10:36:44Z"
  //       }
  //     }
  //   ]]
  // ]));

  const [videos, setVideos] = useState<Map<string, Item[]>>(new Map());

  let tracks: TrackItem[] | null = null;

  useEffect(() => { localStorage.removeItem('token') }, [])

  const searchPlaylist = async () => {
    const playlist_id = link.split('/').pop()?.split('?')[0];

    await searchSpotifyPlaylist(playlist_id)
      .then((res: SpotifyResponse) => tracks = res.tracks.items)
      .catch((err) => console.error(err))

    console.log(tracks)
    generatePlaylist();
  }

  const generatePlaylist = async () => {
    if (!tracks) return;

    const searchFields = tracks.map((value) => {
      const artists: string = value.track.artists.map(artist => artist.name).join(", ");

      return value.track.name + " " + artists;
    });
    searchFields.forEach((trackTitle) => {
      generateYoutubePlaylist(trackTitle)
        .then((res) => {
          if (res) {
            if (!res.data) return;

            console.log("res:", res.data)

            const newVideos = new Map(videos);
            console.log(newVideos);

            if (!newVideos.has(trackTitle)) {
              newVideos.set(trackTitle, []);
            }

            newVideos.set(trackTitle, res.data.items);

            setVideos((prevVideos) => {
              const updatedVideos = new Map(prevVideos);

              if (!updatedVideos.has(trackTitle)) {
                updatedVideos.set(trackTitle, []);
              }

              updatedVideos.set(trackTitle, res.data.items);

              return updatedVideos;
            });
            
          } else {
            alert('Erro ao buscar vídeos no Youtube: Cota de API excedida ou erro interno. Tente novamente mais tarde.')
            console.error("Nenhum vídeo encontrado para:", trackTitle);
          }
        })
        .catch((err) => console.error("Erro inesperado:", err));
    });

    useEffect(() => {
      console.log("Estado atualizado:", videos);
    }, [videos]);


    console.log(searchFields);
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

      // Efeito glass com textura
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backgroundImage: `url(${background})`, // textura sutil
      backgroundSize: 'auto',
      backdropFilter: 'blur(10px) grayscale(0.2)',
      WebkitBackdropFilter: 'blur(10px) grayscale(0.2)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
    }}>


      <Typography
        sx={{
          fontFamily: 'Monoton',
          position: 'absolute',
          color: '#ffffff',
          maxHeight: '15%',
          textWrap: 'nowrap',
          fontSize: { xs: '2.0rem', md: '2.5rem' },
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
              disableUnderline: true, // Remove a linha inferior padrão
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={searchPlaylist}
                  sx={{
                    "&:hover": { color: "#000", cursor: "pointer" },
                    zIndex: 1000,
                  }}
                >
                  <SwapHorizIcon />
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
        <Box sx={{
          width: '100%',
          maxWidth: '1200px',
          overflow: 'auto', // Adiciona rolagem caso o conteúdo ultrapasse
          padding: '20px',
        }}>
        </Box>

        {videos && (
          <Box sx={{ marginBottom: '20px' }}>
            <Stack direction="row" flexWrap="wrap" gap={5} alignContent={'center'} justifyContent={'center'} >
                <VideoCard videos={videos} />
            </Stack>
          </Box>
        )}
      </Stack >
    </Box >
  )
}

export default App
