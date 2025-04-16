import React from "react";
import YouTubePlayer from "./YoutubePlayer";
import NetflixIcon from "../assets/netflixIcon.svg";
import PrimeVideoIcon from "../assets/primevideo.svg";
import "./indetail.css"

export default function InDetail() {
    return (
        <>
            <div className="indetail-wrapper">

                <div className="indetail_left-container">
                    <div className="img_banner">
                        <img src="https://image.tmdb.org/t/p/w500/9lLuhV703HGCbnz6FxnqCwIwzAZ.jpg" alt="banner" />
                    </div>

                    <div className="indetail_left-content">
                        <h2>Daredevil : Born Again</h2>
                        <p className="indetail_overview">
                            Daredevil: Born Again is an upcoming American television series created for Disney+ by Matt Corman and Chris Ord, based on the Marvel Comics character Daredevil. It is intended to be a reboot of the Netflix series Daredevil, which was developed by Drew Goddard.
                        </p>
                    

                        <div className="buttons">
                            <button>Watchlist</button>
                            <button>Favourite</button>    
                        </div>
                    </div>    

                </div>

                <div className="indetail_right-container">
                    <div className="trailer-container">
                        <YouTubePlayer videoId={"7xALolZzhSM"}  className="youtube-player"/>
                    </div>

                    <div className="ott_platform_avail">
                        <img src={NetflixIcon} alt="netflix"  className="netflixIcon"/>
                        <img src={PrimeVideoIcon} alt="primevideo" className="primevideoIcon" />
                    </div>
                    <div className="trailer-container">
                        <YouTubePlayer videoId={"7xALolZzhSM"}  className="youtube-player"/>
                    </div>
                </div>
            </div>
        </>
    );
}