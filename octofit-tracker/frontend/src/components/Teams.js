import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : '/api/teams/';

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setTeams([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">👥 Teams</h2>
        <button className="btn btn-primary">+ Create Team</button>
      </div>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : teams.length > 0 ? (
        <div className="row">
          {teams.map((team, idx) => (
            <div key={idx} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{team.description || 'No description available'}</p>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-primary me-2">View Details</button>
                  <button className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          <h5>No teams found</h5>
          <p>Create or join a team to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Teams;
