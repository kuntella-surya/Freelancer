import React, { useEffect, useState } from 'react';

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    qualifications: '',
    skills: '',
    certifications: '',
    profilePic: null,
    coverPic: null,
    certificates: [],
    portfolio: [{ title: '', link: '', description: '' }],
    workExperience: [{ position: '', company: '', duration: '' }],
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/freelance-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.profile) {
          setProfile(data.profile);
          setFormData({
            name: data.profile.name || '',
            description: data.profile.description || '',
            qualifications: data.profile.qualifications || '',
            skills: data.profile.skills ? data.profile.skills.join(', ') : '',
            certifications: data.profile.certifications
              ? data.profile.certifications.join(', ')
              : '',
            profilePic: null,
            coverPic: null,
            certificates: [],
            portfolio: data.profile.portfolio.length
              ? data.profile.portfolio
              : [{ title: '', link: '', description: '' }],
            workExperience: data.profile.workExperience.length
              ? data.profile.workExperience
              : [{ position: '', company: '', duration: '' }],
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic' || name === 'coverPic') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === 'certificates') {
      setFormData({ ...formData, certificates: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePortfolioChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPortfolio = [...formData.portfolio];
    updatedPortfolio[index][name] = value;
    setFormData({ ...formData, portfolio: updatedPortfolio });
  };

  const handleWorkExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkExperience = [...formData.workExperience];
    updatedWorkExperience[index][name] = value;
    setFormData({ ...formData, workExperience: updatedWorkExperience });
  };

  const addPortfolioItem = () => {
    setFormData({
      ...formData,
      portfolio: [...formData.portfolio, { title: '', link: '', description: '' }],
    });
  };

  const addWorkExperienceItem = () => {
    setFormData({
      ...formData,
      workExperience: [...formData.workExperience, { position: '', company: '', duration: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const multipartForm = new FormData();
    multipartForm.append('name', formData.name);
    multipartForm.append('description', formData.description);
    multipartForm.append('qualifications', formData.qualifications);
    multipartForm.append('skills', formData.skills);
    multipartForm.append('certifications', formData.certifications);
    multipartForm.append('portfolio', JSON.stringify(formData.portfolio));
    multipartForm.append('workExperience', JSON.stringify(formData.workExperience));
    if (formData.profilePic) {
      multipartForm.append('profilePic', formData.profilePic);
    }
    if (formData.coverPic) {
      multipartForm.append('coverPic', formData.coverPic);
    }
    formData.certificates.forEach((file) =>
      multipartForm.append('certificates', file)
    );

    try {
      const res = await fetch(
        profile ? 'http://localhost:5001/api/update-profile' : 'http://localhost:5001/api/create-profile',
        {
          method: profile ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: multipartForm,
        }
      );
      const result = await res.json();
      if (res.ok) {
        alert(`Profile ${profile ? 'updated' : 'created'} successfully`);
        setProfile(result.profile);
        setIsEditing(false);
      } else {
        alert(result.message || `Error ${profile ? 'updating' : 'creating'} profile`);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  if (!profile || isEditing) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>{profile ? 'Edit' : 'Create'} Freelance Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required /><br />
          <input type="text" name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} /><br />
          <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} /><br />
          <input type="text" name="certifications" placeholder="Certifications (comma separated)" value={formData.certifications} onChange={handleChange} /><br />

          <h3>Portfolio</h3>
          {formData.portfolio.map((item, index) => (
            <div key={index}>
              <input type="text" name="title" placeholder="Title" value={item.title} onChange={(e) => handlePortfolioChange(index, e)} /><br />
              <input type="text" name="link" placeholder="Link" value={item.link} onChange={(e) => handlePortfolioChange(index, e)} /><br />
              <textarea name="description" placeholder="Description" value={item.description} onChange={(e) => handlePortfolioChange(index, e)} /><br />
            </div>
          ))}
          <button type="button" onClick={addPortfolioItem}>Add Portfolio Item</button><br />

          <h3>Work Experience</h3>
          {formData.workExperience.map((item, index) => (
            <div key={index}>
              <input type="text" name="position" placeholder="Position" value={item.position} onChange={(e) => handleWorkExperienceChange(index, e)} /><br />
              <input type="text" name="company" placeholder="Company" value={item.company} onChange={(e) => handleWorkExperienceChange(index, e)} /><br />
              <input type="text" name="duration" placeholder="Duration" value={item.duration} onChange={(e) => handleWorkExperienceChange(index, e)} /><br />
            </div>
          ))}
          <button type="button" onClick={addWorkExperienceItem}>Add Work Experience</button><br />

          <label>Profile Pic: <input type="file" name="profilePic" onChange={handleChange} /></label><br />
          <label>Cover Pic: <input type="file" name="coverPic" onChange={handleChange} /></label><br />
          <label>Certificates: <input type="file" name="certificates" multiple onChange={handleChange} /></label><br />
          <button type="submit">{profile ? 'Update' : 'Submit'} Profile</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{profile.name}</h1>
      <img src={`http://localhost:5001${profile.profilePicUrl}`} alt="Profile" style={{ width: 150, borderRadius: '50%' }} />
      <img src={`http://localhost:5001${profile.coverPicUrl}`} alt="Cover" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
      <h3>Description</h3><p>{profile.description}</p>
      <h3>Skills</h3><ul>{profile.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
      <h3>Qualifications</h3><p>{profile.qualifications}</p>
      <h3>Certifications</h3><ul>{profile.certifications.map((c, i) => <li key={i}>{c}</li>)}</ul>
      <h3>Portfolio</h3><ul>{profile.portfolio.map((p, i) => <li key={i}><b>{p.title}</b> - <a href={p.link}>{p.link}</a><p>{p.description}</p></li>)}</ul>
      <h3>Work Experience</h3><ul>{profile.workExperience.map((w, i) => <li key={i}><b>{w.position}</b> at {w.company} ({w.duration})</li>)}</ul>
      <button onClick={() => setIsEditing(true)}>Edit Profile</button>
    </div>
  );
};

export default ViewProfile;
