import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/';

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setWorkouts([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  const getDifficultyBadgeColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🏋️ Workouts</h2>
        <button className="btn btn-primary">+ Create Workout</button>
      </div>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : workouts.length > 0 ? (
        <div className="row">
          {workouts.map((workout, idx) => (
            <div key={idx} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="mb-0">{workout.name}</h5>
                    <span className={`badge bg-${getDifficultyBadgeColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description || 'No description available'}</p>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-primary me-2">Start Workout</button>
                  <button className="btn btn-sm btn-outline-secondary">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          <h5>No workouts available</h5>
          <p>Check back later for new workouts.</p>
        </div>
      )}
    </div>
  );
};

export default Workouts;
