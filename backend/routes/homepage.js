import express from "express";
const router = express.Router();
import axios from "axios";

import { fetchIndianMovies,
     fetchAnimeReleases,
      fetchTrendingMovies,
       fetchNetflixTrendingMovies,
       fetchAmazonTrendingMovies   } from "../controllers/homecontroller.js";

router.get("/", async(req, res) => {
    try {
        const [indianMovies, animeReleases, trendingMovies, nfTrendMovies, amazonTrendMovies] = await Promise.all([
            fetchIndianMovies(),
            fetchAnimeReleases(),
            fetchTrendingMovies(),
            fetchNetflixTrendingMovies(),
            fetchAmazonTrendingMovies()
        ])

        res.json({
            indianMovies,
            animeReleases,
            trendingMovies,
            nfTrendMovies,
            amazonTrendMovies

        })
    } catch(err) {
        console.log("error!!", err)
        res.status(500).json({error: "error from api fetching"})
    }
})

export default router;
