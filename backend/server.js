
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import homepageRoute from './routes/homepage.js'
import authRoute from './routes/auth.js'
// import { Pool } from 'pg'


 const app = express()
 
 
 app.use(cors())
 app.use(express.json())


 app.use("/", homepageRoute);

 app.use("/api/auth", authRoute)



 app.get("/detail/:type/:id", async (req, res) => {
    try {
        const { type, id } = req.params;
        
        // Validate type
        if (type !== 'movie' && type !== 'tv') {
            return res.status(400).json({ error: "Invalid type. Must be 'movie' or 'tv'" });
        }

        // Construct URLs dynamically based on type
        const detailUrl = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=credits`;
        const imagesUrl = `https://api.themoviedb.org/3/${type}/${id}/images`;

        const [detailResponse, imagesResponse] = await Promise.all([
            axios.get(detailUrl, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGIxYzY4NTg3ODVkYzFhOGE4YmY5NDA3MTIxMjE3NCIsIm5iZiI6MTczODI1Nzk1Mi4yOTIsInN1YiI6IjY3OWJiNjIwNGViYzk5MWVhNGJkOGU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfDgcwzod5uVu-wrJq7RRKDbnCoUgJxanLeNgzXbzzE'
                }
            }),
            axios.get(imagesUrl, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGIxYzY4NTg3ODVkYzFhOGE4YmY5NDA3MTIxMjE3NCIsIm5iZiI6MTczODI1Nzk1Mi4yOTIsInN1YiI6IjY3OWJiNjIwNGViYzk5MWVhNGJkOGU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfDgcwzod5uVu-wrJq7RRKDbnCoUgJxanLeNgzXbzzE'
                }
            })
        ]);

        // Construct details object with different properties for movies and TV shows
        const details = type === 'movie' ? {
            title: detailResponse.data.title,
            overview: detailResponse.data.overview,
            poster_path: `https://image.tmdb.org/t/p/w500${detailResponse.data.poster_path}`,
            productionCountries: detailResponse.data.production_countries.map(item => item.name),
            release_date: detailResponse.data.release_date,
            tagline: detailResponse.data.tagline,
            runtime: detailResponse.data.runtime,
            genres: detailResponse.data.genres,
            backdrop_path: `https://image.tmdb.org/t/p/original${detailResponse.data.backdrop_path}`,
            credits: detailResponse.data.credits.cast,
        } : {
            title: detailResponse.data.name,
            overview: detailResponse.data.overview,
            poster_path: `https://image.tmdb.org/t/p/w500${detailResponse.data.poster_path}`,
            productionCountries: detailResponse.data.origin_country,
            first_air_date: detailResponse.data.first_air_date,
            last_air_date: detailResponse.data.last_air_date,
            number_of_seasons: detailResponse.data.number_of_seasons,
            number_of_episodes: detailResponse.data.number_of_episodes,
            genres: detailResponse.data.genres,
            backdrop_path: `https://image.tmdb.org/t/p/original${detailResponse.data.backdrop_path}`,
            credits: detailResponse.data.credits.cast,
        };

        const images = imagesResponse.data.backdrops.slice(1,5).map(item => ({
            file_path: `https://image.tmdb.org/t/p/original${item.file_path}`
        }));

        res.json({details, images});
    } catch (err) {
        console.log("Error fetching data:", err);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});

app.get("/search/:query", async(req, res) => {
    try {
        const query = req.params.query
        const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`

        const response = await axios.get(searchUrl, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGIxYzY4NTg3ODVkYzFhOGE4YmY5NDA3MTIxMjE3NCIsIm5iZiI6MTczODI1Nzk1Mi4yOTIsInN1YiI6IjY3OWJiNjIwNGViYzk5MWVhNGJkOGU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfDgcwzod5uVu-wrJq7RRKDbnCoUgJxanLeNgzXbzzE'

            }
        })

        const searchResults = response.data.results
            .filter(item => item.poster_path) // Filter out items without poster
            .map(item => ({
                title: item.title || item.name,
                id: item.id,
                overview: item.overview || "No overview available",
                release_date: item.release_date || item.first_air_date || "Unknown",
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                vote_average: Number(item.vote_average || 0).toFixed(1),
                media_type: item.media_type 
                    ? item.media_type
                    : "Unknown"
            }))

        res.json(searchResults) 
        

    } catch(err) {
        console.error("Error fetching search data:", err.response?.data || err.message)
        res.status(500).json({
            error: "Error fetching data from API", 
            details: err.response?.data || "Unknown error"
        })
    }
})

 app.listen(3000 , ()=>{
    console.log("sevrer is listerning on 3000")
 })
