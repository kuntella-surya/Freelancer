import React, { useEffect, useState } from "react";

import { FaUserCheck } from "react-icons/fa";
import { Spinner, Card, Button, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HireFreelancer.css"; // we'll add styling here

export default function HireFreelancer({currentUser}) {
  const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("date");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    console.log(currentUser);
    useEffect(() => {
      fetchProjects();
    }, [sortBy]);
  
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/project/getp`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          const sorted = sortProjects(data.projects, sortBy);
          setProjects(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
  
    const sortProjects = (projects, criteria) => {
      const sorted = [...projects];
      switch (criteria) {
        case "budget":
          return sorted.sort((a, b) => b.budget.max - a.budget.max);
        case "location":
          return sorted.sort((a, b) => (a.location || "").localeCompare(b.location || ""));
        case "duration":
          return sorted.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        default:
          return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    };
  
  return (
    <>
    <div className="container mt-4">
          <h2 className="text-primary mb-4">🔍 Find Work</h2>
    
          <Form.Select
            className="mb-4 w-25"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by: Date Posted</option>
            <option value="budget">Sort by: Budget</option>
            <option value="location">Sort by: Location</option>
            <option value="duration">Sort by: Duration</option>
          </Form.Select>
    
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="row g-4">
              {projects.map((project) => (
                <div className="col-md-6 col-lg-4 d-flex" key={project._id}>
                  <Card className="shadow-sm h-100 w-100 border-0 project-cardt">
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title className="text-primary fw-bold">{project.title}</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted small">
                          <Badge bg="info" className="me-2">{project.category}</Badge>
                          <Badge bg="secondary">{project.projectType}</Badge>
                        </Card.Subtitle>
    
                        <Card.Text className="desc-trim small text-dark">
                          {project.description}
                        </Card.Text>
    
                        <div className="mb-2"><strong>Skills:</strong> {project.skillsRequired}</div>
                        <div className="mb-2"><strong>Budget:</strong> ${project.budget.min} - ${project.budget.max}</div>
                        <div className="mb-2"><strong>Duration:</strong> {project.duration} days</div>
                        <div className="mb-2"><strong>Location:</strong> {project.location}</div>
                      </div>
                    </Card.Body>
    
                    <Card.Footer className="d-flex justify-content-between align-items-center bg-light border-top">
                      <small className="text-muted">👤 {project.uname || "Unknown"}</small>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/project/proposals/${project._id}`)}
                        >
                          View Details
                        </Button>
                       <Button
                          variant="outline-success"
                          size="sm"
                         onClick={() => navigate(`/chat/${project.clientId}`, {
                         state: {
                        otherUserName: project.uname  ,
                        projectId:project._id
                       }
                      })}
                       title="Start Chat"
                        >
                      
                      </Button>
    
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
    </>
  );
}
