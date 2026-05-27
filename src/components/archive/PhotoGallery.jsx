import React, { useState } from 'react';
import './archives.css';

const PhotoGallery = ({ photos, alt }) => {
  const [active, setActive] = useState(0);
  if (!photos?.length) return null;

  return (
    <div className="archive-gallery">
      <div className="archive-gallery-main">
        <img src={photos[active]} alt={alt} />
      </div>
      {photos.length > 1 && (
        <div className="archive-gallery-thumbs">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              className={i === active ? 'active' : ''}
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
