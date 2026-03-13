import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLeaderboard([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4">🏆 Leaderboard</h2>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : leaderboard.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Points</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>
                      {idx === 0 && '🥇'}
                      {idx === 1 && '🥈'}
                      {idx === 2 && '🥉'}
                      {idx > 2 && `#${idx + 1}`}
                    </strong>
                  </td>
                  <td><strong>{entry.team?.name || entry.team}</strong></td>
                  <td>
                    <span className="badge bg-success" style={{fontSize: '1rem'}}>{entry.points}</span>
                  </td>
                  <td>
                    <div className="progress">
                      <div className="progress-bar bg-success" role="progressbar" style={{width: `${Math.min((entry.points / 1000) * 100, 100)}%`}} aria-valuenow={entry.points} aria-valuemin="0" aria-valuemax="1000"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          <h5>No leaderboard data</h5>
          <p>Leaderboard will appear once activities are logged.</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
