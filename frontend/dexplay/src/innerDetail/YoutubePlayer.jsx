import React from "react";
import axios from "axios";

export const YouTubePlayer = ({ videoId }) => {
  return (
    <div className="video-container">
      <iframe
        title="YouTube Video Player"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="youtube-iframe"
      ></iframe>
    </div>
  );
};



export function VideoEmbed({ id, type, season, episode, className }) {
  const [videoUrls, setVideoUrls] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    async function handleWatch() {
      try {
        let url = "";
        if (type === "tv") {
          url = `https://cinescope-ncpj.onrender.com/watch/${type}/${id}/season/${season}/episode/${episode}`;
        } else {
          url = `https://cinescope-ncpj.onrender.com/watch/${type}/${id}`;
        }

        const response = await axios.get(url);
        setVideoUrls(response.data || []);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Error fetching watch link:", error);
      }
    }

    if (id && type && (type === "movie" || (season && episode))) {
      handleWatch();
    }
  }, [id, type, season, episode]);

  return (
    <div className="video-container flex flex-col gap-4">
      {/* Provider Switcher */}
      {videoUrls.length > 1 && (
        <div className="flex gap-2 server-buttons z-10">
          {videoUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`px-3 py-1 rounded ${
                index === currentIndex ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              Server {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Video Player */}
      {videoUrls.length > 0 && (
        <iframe
          key={videoUrls[currentIndex]}
          title={`Provider ${currentIndex + 1}`}
          src={videoUrls[currentIndex]}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={`youtube-iframe w-full aspect-video rounded-lg ${className || ""}`}
        ></iframe>
      )}
    </div>
  );
}

 


