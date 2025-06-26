import { useEffect, useState } from 'react';
import { Spinner, Alert, Badge } from 'react-bootstrap';
import './App.css';

function MyProjects() {
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/project/getp", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setProjects(data.projects);
        } else {
          setError(data.message || "Failed to fetch projects");
        }
      } catch (err) {
        setError("Error fetching projects.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">📁 My Posted Projects</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && projects.length === 0 && (
        <Alert variant="info" className="text-center">
          You haven’t posted any projects yet.
        </Alert>
      )}

      <div className="project-list">
        {projects.map((project) => (
          <div className="project-card shadow-sm" key={project._id}>
            <div className="project-card-header">
              <h4>{project.title}</h4>
              <Badge bg="secondary" className="me-2">{project.category}</Badge>
              <Badge bg="info">{project.projectType}</Badge>
            </div>
            <div className="project-card-body">
              <p className="description">{project.description}</p>
              <p><strong>🛠 Skills:</strong> {project.skillsRequired.join(', ')}</p>
              <p><strong>💰 Budget:</strong> ${project.budget.min} - ${project.budget.max}</p>
              <p><strong>⏳ Duration:</strong> {project.duration}</p>
              <p>
                <strong>📌 Status:</strong>{' '}
                <Badge bg={
                  project.status === 'open' ? 'success' :
                  project.status === 'in-progress' ? 'primary' :
                  project.status === 'completed' ? 'dark' : 'danger'
                }>
                  {project.status}
                </Badge>
              </p>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Posted on: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProjects;
