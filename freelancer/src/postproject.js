import { useState } from 'react';

import { Spinner, Alert } from 'react-bootstrap';
import './App.css'; 

function PostProject() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    skillsRequired: '',
    minBudget: '',
    maxBudget: '',
    duration: '',
    category: '',
    projectType: 'fixed',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
   const token = localStorage.getItem("token");
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess(false);

  try {
    const res = await fetch('http://localhost:5001/api/project/postp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        minBudget: Number(form.minBudget),
        maxBudget: Number(form.maxBudget),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      setForm({
        title: '',
        description: '',
        skillsRequired: '',
        minBudget: '',
        maxBudget: '',
        duration: '',
        category: '',
        projectType: 'fixed',
      });
    } else {
      setError(data.message || 'Failed to post project');
    }
  } catch (err) {
    console.error(err);
    setError('Something went wrong.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container mt-4 post-project-container">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-primary">📢 Post a New Project</h2>

        {success && <Alert variant="success">✅ Project posted successfully!</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Project Title</label>
            <input
              name="title"
              value={form.title}
              required
              placeholder="e.g. Build a full-stack eCommerce website"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Project Description</label>
            <textarea
              name="description"
              value={form.description}
              required
              className="form-control"
              placeholder="Give a detailed description about your project..."
              rows={4}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Required Skills</label>
            <input
              name="skillsRequired"
              value={form.skillsRequired}
              required
              placeholder="e.g. Creative, soft skills"
              className="form-control"
              onChange={handleChange}
            />
            <small className="text-muted">Separate skills with commas</small>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-semibold">Min Budget ($)</label>
              <input
                name="minBudget"
                type="number"
                min={0}
                value={form.minBudget}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label className="form-label fw-semibold">Max Budget ($)</label>
              <input
                name="maxBudget"
                type="number"
                min={form.minBudget}
                value={form.maxBudget}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Duration</label>
            <input
              name="duration"
              value={form.duration}
              required
              placeholder="e.g. 2 weeks, 1 month"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Project Category</label>
           <select
  name="category"
  className="form-select"
  value={form.category}
  onChange={handleChange}
  required
>
  <option value="">Select Category</option>
  <option>Plumbing</option>
  <option>Electrical</option>
  <option>Carpentry</option>
  <option>Painting</option>
  <option>Home Cleaning</option>
  <option>Appliance Repair</option>
  <option>AC Service & Repair</option>
  <option>Mobile Repair</option>
  <option>Bike Repair</option>
  <option>Car Repair</option>
  <option>Photography</option>
  <option>Event Management</option>
  <option>Gardening</option>
  <option>Pest Control</option>
  <option>Tuition / Coaching</option>
  <option>Tailoring</option>
  <option>Laundry</option>
  <option>Beauty & Salon</option>
  <option>Babysitting</option>
  <option>Pet Care</option>
  <option>Delivery & Pickup</option>
  <option>Construction</option>
  <option>Others</option>
</select>

          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Project Type</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="projectType"
                value="fixed"
                checked={form.projectType === 'fixed'}
                onChange={handleChange}
              />
              <label className="form-check-label">Fixed Price</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="projectType"
                value="hourly"
                checked={form.projectType === 'hourly'}
                onChange={handleChange}
              />
              <label className="form-check-label">Hourly</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" /> Posting...
              </>
            ) : (
              '🚀 Post Project'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostProject;
