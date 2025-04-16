import axios from 'axios';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGIxYzY4NTg3ODVkYzFhOGE4YmY5NDA3MTIxMjE3NCIsIm5iZiI6MTczODI1Nzk1Mi4yOTIsInN1YiI6IjY3OWJiNjIwNGViYzk5MWVhNGJkOGU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfDgcwzod5uVu-wrJq7RRKDbnCoUgJxanLeNgzXbzzE';


const getCurrentMonthRange = () => {
    const today = new Date(); // Current date (e.g., 2025-04-09)
    
    // Start of the current month
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const start = startDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // End of the current month
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const end = endDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    return { start, end };
}
const { start, end } = getCurrentMonthRange();

async function fetchTrendingMovies(){
    

                const url = `https://api.themoviedb.org/3/trending/all/week?language=en-US`
                
                const response = await axios.get(url, {
                    headers: {accept : 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGIxYzY4NTg3ODVkYzFhOGE4YmY5NDA3MTIxMjE3NCIsIm5iZiI6MTczODI1Nzk1Mi4yOTIsInN1YiI6IjY3OWJiNjIwNGViYzk5MWVhNGJkOGU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfDgcwzod5uVu-wrJq7RRKDbnCoUgJxanLeNgzXbzzE'
                    }
                })
        
                const movies = response.data.results.map(item => (
                    {
                        title: item.title || item.name,
                        id: item.id,
                        name: item.name,
                        overview: item.overview,
                        release_date: item.release_date,
                        poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                        media_type: item.media_type,  
                        
                    }
                ))
        
                // res.send(movies)
              return movies
                
            
            
}

async function fetchIndianMovies() {
    const url = `https://api.themoviedb.org/3/discover/movie`;
    const res = await axios.get(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        },
        params: {
            language: 'en-US',
            region: 'IN',
            sort_by: 'release_date.desc',
            sort_by: 'popularity.desc',
            with_original_language: 'hi', // Hindi, Tamil, Telugu, Malayalam, Kannada
            'release_date.lte': end,       // Movies up to today
            'primary_release_date.gte': start, // Movies from 2025 onward
            with_origin_country: 'IN',                // Indian origin
            page: 1                                  // Start at page 1
        }
    })


    const data = res.data.results.map(item => (
        {
            title: item.title || item.name,
            id: item.id,
            name: item.name,
            overview: item.overview,
            release_date: item.release_date,
            poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            media_type: 'movie',  
            
        }
    ))
    return data
}


async function fetchAnimeReleases() {
    const url = `https://api.themoviedb.org/3/discover/tv`
    const res = await axios.get(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        },
        params: {
            language: 'en-US',
            sort_by: 'first_air_date.desc',
            sort_by: 'popularity.desc',
            'release_date.lte': end,       // Movies up to today
            'primary_release_date.gte': start,
            with_original_language: 'ja',
            with_genres: '16'
        }
    })

    const data = res.data.results.map(item => (
        {
            title: item.title || item.name,
            id: item.id,
            name: item.name,
            overview: item.overview,
            release_date: item.release_date,
            poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            media_type: 'tv',  
            
        }
    ))
    return data
}


async function fetchNetflixTrendingMovies(){
    const url = `https://api.themoviedb.org/3/discover/movie`
    const res = await axios.get(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        },
        params: {
            language: 'en-US',
            with_watch_providers: '8',
            watch_region: 'IN',
            'watch_providers': '8',
            'with_watch_monetization_types': 'flatrate',
            sort_by: 'popularity.desc',
            page: 1
        }
    })

    const data = res.data.results.map(item => (
        {
            title: item.title || item.name,
            id: item.id,
            name: item.name,
            overview: item.overview,
            release_date: item.release_date,
            poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            media_type: 'movie',  
            
        }
    ))
    return data
}

async function fetchAmazonTrendingMovies(){
    const url = `https://api.themoviedb.org/3/discover/movie`
    const res = await axios.get(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        },
        params: {
            language: 'en-US',
            with_watch_providers: '119',
            watch_region: 'IN',
            'watch_providers': '119',
            'with_watch_monetization_types': 'flatrate',
            sort_by: 'popularity.desc',
            page: 1
        }
    })

    const data = res.data.results.map(item => (
        {
            title: item.title || item.name,
            id: item.id,
            name: item.name,
            overview: item.overview,
            release_date: item.release_date,
            poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            media_type: 'movie',  
            
        }
    ))
    return data
}

export {
    fetchIndianMovies,
    fetchAnimeReleases,
    fetchTrendingMovies,
    fetchNetflixTrendingMovies,
    fetchAmazonTrendingMovies
}
