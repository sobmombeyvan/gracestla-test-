import React from 'react';

const DashAvatar = ({ initials, imageUrl, size = 'md', className = '' }) => (
  <span className={`dash-avatar dash-avatar--${size} ${className}`.trim()} aria-hidden="true">
    {imageUrl ? <img src={imageUrl} alt="" className="dash-avatar-img" /> : initials}
  </span>
);

export default DashAvatar;
