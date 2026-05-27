import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SessionGate = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        Chargement…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/dashboard" replace state={{ authRequired: true }} />;
  }

  return children;
};

export default SessionGate;
