import "../styles/resources.css";

export default function ResourcesPage() {

  const videos = [
    {
      title: "AI Podcast Episode 1",
      desc: "Future of AI in Education"
    },
    {
      title: "Innovation Workshop",
      desc: "Student capability building"
    },
    {
      title: "Demo Course",
      desc: "Modern learning strategies"
    }
  ];

  return (
    <div className="resources-page">

      <div className="resources-header">
        <h1>Resources</h1>

        <p>
          Explore podcasts, demo courses and educational content from Ateion.
        </p>
      </div>

      <div className="video-grid">

        {
          videos.map((video, index) => (
            <div className="video-card" key={index}>

              <div className="video-placeholder">
                ▶
              </div>

              <h2>{video.title}</h2>

              <p>{video.desc}</p>

              <button
                onClick={() =>
                  window.open("https://www.youtube.com/", "_blank")
                }
              >
                Watch Now
              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
}