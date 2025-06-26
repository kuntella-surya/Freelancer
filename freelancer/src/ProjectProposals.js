import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spinner, Badge, Modal, Alert } from "react-bootstrap";
import { FaUserCheck } from "react-icons/fa";
import "./ProjectProposals.css";

export default function ProjectProposals() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");

 useEffect(() => {
  const fetchProjectData = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/project/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setProject({ ...data.project, proposals: data.proposals });
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch project data", error);
      setLoading(false);
    }
  };

  fetchProjectData();
}, [projectId, token]);


  const assignWork = async (proposalId) => {
    setAssigning(true);
    try {
      const res = await fetch(`http://localhost:5001/api/project/${projectId}/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ proposalId })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(`✅ Work assigned to ${data.freelancerName}`);
      }
    } catch (error) {
      console.error("Assignment failed", error);
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  if (!project) {
    return <p className="text-center text-danger mt-4">Project not found.</p>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-primary">📂 {project.title}</h3>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <Badge bg="info">{project.category}</Badge>{" "}
            <Badge bg="secondary">{project.projectType}</Badge>
          </Card.Subtitle>
          <Card.Text>{project.description}</Card.Text>
          <p><strong>Budget:</strong> ${project.budget?.min} - ${project.budget?.max}</p>
          <p><strong>Duration:</strong> {project.duration} days</p>
          <p><strong>Skills:</strong> {project.skillsRequired}</p>
        </Card.Body>
      </Card>

      <h5 className="mb-3">💬 Proposals Received</h5>
      {project.proposals?.length === 0 ? (
        <p className="text-muted">No proposals yet.</p>
      ) : (
        project.proposals.map((proposal, index) => (
          <Card key={proposal._id} className="mb-3 shadow-sm proposal-card">
            <Card.Body>
              <h6 className="text-dark fw-bold">
                #{index + 1}. {proposal.freelancerName}
              </h6>
              <p className="mb-2 text-muted small">{proposal.description}</p>
              <p><strong>Bid:</strong> ${proposal.amount}</p>

              <div className="d-flex justify-content-end">
                <Button
                  variant="success"
                  size="sm"
                  disabled={assigning}
                  onClick={() => assignWork(proposal._id)}
                  title="Assign Work"
                >
                  <FaUserCheck className="me-1" />
                  Assign
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      {success && <Alert variant="success" className="mt-3">{success}</Alert>}

      <div className="mt-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>← Back</Button>
      </div>
    </div>
  );
}
