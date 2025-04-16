import React from 'react';
import './MovieCard.css';
// import image from "./assets/image.jpg";

const MovieCard = () => {
  return (
    <div className="parent">
      <div className="image-frame">
        <img src="https://media-hosting.imagekit.io//1d486c3040514cd8/176698_izuku_midoriya_my_hero_ones_justice_my_hero_academia_all.jpg?Expires=1834077350&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=X8PXNRW~c4OHhQXh85Ndvx5TZFD0TpxGK9YGR1~krgnAGYeRHG6h1vsXWksJl3Mf3HF6krKHtmi1sZWPZH1f~cRJHZZnl3DEfn0VeQBee0p9J~uMQb0tCYhG4vjKU~0KQSkvv0-8TNDuHwJmo5OEe5moqReLD9KNiXgn7UJXmI0Ehe3HNKFcvSTgD~-vz~hDFNhSUQVgAM~0sNYsB4Qh6L2w9X7SelzCTMUUdAzizxCU-3hQ9A1ui3mShJH95j5IUXeiWNAZR09rzq0zXVN0V4-r3yRZ5~4VTlNlEHuFSaR1sadrn9nhZ2-yJ~bfGm8QJ~tQhZkOBon5WrF4IRUQ-Q__" alt="Movie Poster" className="image" />
      </div>
      
      <div className="movie-details">
        <span className="movie-title">Naruto</span>
        
        <div className="buttons_MovieCard">
          <button className="watch-btn">Watch</button>
          <button className="detail-btn">Detail</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;