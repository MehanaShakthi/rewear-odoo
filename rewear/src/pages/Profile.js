import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>User Profile</h1>
          <p>User ID: {id}</p>
        </div>
        
        <div className="profile-content">
          <p>Profile details coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;