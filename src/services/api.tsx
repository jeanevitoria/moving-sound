import axios from "axios";

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

export const getSpotifyToken = async () => {
    try {
        const res = await axios.post('http://localhost:8000/spotify/get-token/');
        console.log(res)
        localStorage.setItem('token', res.data.access_token);
        return res.data;
    } catch (err) {
        console.error("Erro ao obter novo token:", err);
        throw err; // Se falhar, propaga o erro
    }
};

const apiSpotify = axios.create({
    baseURL: 'http://localhost:8000/spotify/playlist/',
    headers: {
        'Content-Type': 'application/json',
    }
});

apiSpotify.interceptors.response.use(
    response => response,

    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await getSpotifyToken();
                apiSpotify.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return apiSpotify(originalRequest);
            } catch (err) {
                console.error("Falha ao renovar token.");
            }
        }

        return Promise.reject(error);
    }
);

export const searchSpotifyPlaylist = async (playlist_id: string | undefined) => {
    let token = localStorage.getItem('token');

    if (!token) {
        const newToken = await getSpotifyToken();
        token = newToken;
    }

    return apiSpotify.get(`${playlist_id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(res => res.data)
        .catch(err => console.error("Erro ao buscar playlist:", err));
};

// export const generateYoutubePlaylist = async (searchFields: string) => {
//     console.log("chegou: " + searchFields)
//     return axios.post<YoutubeResponse>(`http://localhost:8000/youtube/youtube_search/`, { search_data: searchFields }, {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//         .then((res) => res)
//         .catch((err) => console.error(err))
// }

export const generateYoutubePlaylist = async (searchFields: string) => {
    console.log("chegou: " + searchFields)
    return axios.post<YoutubeResponse>(`http://localhost:8000/crawler/youtube-search/`, { search_data: searchFields }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res)
        .catch((err) => console.error(err))
}
