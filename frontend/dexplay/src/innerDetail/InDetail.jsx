import React from "react";
import { useLocation } from "react-router";
import { YouTubePlayer, VideoEmbed } from "./YoutubePlayer";
import NetflixIcon from "../assets/netflixIcon.svg";
import PrimeVideoIcon from "../assets/primevideo.svg";
import axios from "axios";

import "./indetail.css";

export default function InDetail() {
  const [videoId, setVideoId] = React.useState("");
  const [recomm, setRecomm] = React.useState([]);
  const [seasonsDetails, setSeasonsDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedSeason, setSelectedSeason] = React.useState(null);
  const [selectedEpisode, setSelectedEpisode] = React.useState(null);

  const location = useLocation();
  const { media_type, id } = location.state?.data;
  const details = location.state?.data.details || location.state?.data;

    const { 
    title, 
    overview, 
    poster_path, 
    first_air_date, 
    release_date 
    } = details || {};


  const release_year = first_air_date
    ? first_air_date.substring(0, 4)
    : release_date.substring(0, 4);

  const createSlug = (title, year) =>
    `${title.toLowerCase().replace(/\s+/g, "-")}-${year}`;

  async function fetchAllEpisodes(id, season) {
    try {
      const response = await axios.get(
        `https://cinescope-ncpj.onrender.com/fetchAllEpisodes/${id}/${season}`
      );
      setSeasonsDetails((prev) => ({
        ...prev,
        [season]: response.data, // each season is an array of episodes
      }));
    } catch (error) {
      console.error("Error fetching season details:", error);
    }
  }

  const movieSlug = createSlug(title, release_year);

  // ✅ Fetch trailer for movies
  React.useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieSlug}%20official%20trailer&key=AIzaSyDVAx1WS0YmrEqvuGS2B3JLoupqHZ7RWpY`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setVideoId(data.items[0].id.videoId);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };

    if (media_type === "movie" || media_type == "tv") {
      fetchTrailer();
    }
  }, [movieSlug, media_type]);

  // ✅ Fetch recommendations
  React.useEffect(() => {
    fetch("https://cinescope-ncpj.onrender.com/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecomm(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ✅ Fetch episodes for TV shows
  React.useEffect(() => {
    if (media_type === "tv") {
      const { number_of_seasons } = location.state?.data.details;
      for (let i = 1; i <= number_of_seasons; i++) {
        fetchAllEpisodes(id, i);
      }
    }
  }, [id, media_type, location.state?.data.details]);

  return (
    <div className="indetail-wrapper">
      {/* LEFT PANEL */}
      <div className="indetail_left-container">
        <div className="img_banner">
          <img src={poster_path} alt="banner" />
        </div>

        <div className="indetail_left-content">
          <h2>{title}</h2>

          {media_type === "tv" ? (
            <div className="seasons-container">
              <h3>Seasons</h3>
              <div className="season-buttons">
                {Object.keys(seasonsDetails).map((seasonNum) => (
                  <button
                    key={seasonNum}
                    className={`season-btn ${
                      selectedSeason === seasonNum ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedSeason(seasonNum);
                      setSelectedEpisode(null); // reset episode when season changes
                    }}
                  >
                    Season {seasonNum}
                  </button>
                ))}
              </div>

              {selectedSeason && seasonsDetails[selectedSeason] && (
                <div className="episodes-dropdown">
                  <label htmlFor="episodes">Episodes:</label>
                  <select
                    id="episodes"
                    value={selectedEpisode || ""}
                    onChange={(e) => setSelectedEpisode(e.target.value)}
                  >
                    <option value="">Select Episode</option>
                    {seasonsDetails[selectedSeason].map((ep) => (
                      <option
                        key={ep.episode_number}
                        value={ep.episode_number}
                      >
                        Ep {ep.episode_number} – {ep.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ) : (
            <p className="indetail_overview">{overview}</p>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="indetail_right-container">
        <div className="trailer-section">

        {media_type === "tv" ? (
            <div className="wrapper">
                <h1 className="trailer_heading">Trailer</h1>
                <div className="trailer-container">
                    <YouTubePlayer videoId={videoId} className="youtube-player" />
                </div>
              </div>
        ): null}
          {media_type === "tv" && selectedSeason && selectedEpisode ? (
            // TV Shows → Only VideoEmbed
            <div className="wrapper">
                <h1 className="videoEmbed_heading">Stream</h1>
                <div className="trailer-container">
                <VideoEmbed
                    type="tv"
                    id={id}
                    season={selectedSeason}
                    episode={selectedEpisode}
                    className="youtube-player"
                />
                </div>
            </div>
          ) : media_type === "movie" ? (
            // Movies → YouTube + VideoEmbed stacked
            <>
            <div className="wrapper">
                <h1 className="trailer_heading">Trailer</h1>
              <div className="trailer-container mb-6">
                <YouTubePlayer videoId={videoId} className="youtube-player" />
              </div>
            </div>

              <div className="wrapper">
                <h1 className="videoEmbed_heading">Stream</h1>
                <div className="trailer-container">
                  <VideoEmbed type="movie" id={id} className="youtube-player" />
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* <div className="ott_platform_avail">
          <img src={NetflixIcon} alt="netflix" className="netflixIcon" />
          <img
            src={PrimeVideoIcon}
            alt="primevideo"
            className="primevideoIcon"
          />
        </div> */}
      </div>
    </div>
  );
}
