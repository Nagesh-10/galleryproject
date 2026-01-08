import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState({});

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=20`
      );
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="app">
      <h1>Image Gallery</h1>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="gallery">
            {images.map((image) => (
              <div className="card small-card" key={image.id}>
                <img
                  src={image.download_url}
                  alt={image.author}
                />

                <div className="card-footer">
                  <p>{image.author}</p>
                  <button
                    className={`like-btn ${
                      likes[image.id] ? "liked" : ""
                    }`}
                    onClick={() => toggleLike(image.id)}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ← Previous
            </button>

            <span>Page {page}</span>

            <button onClick={() => setPage(page + 1)}>
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
