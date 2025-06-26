import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function Signup() {
  const [formData, setFormData] = useState({
  name: '',
  uname:'',
  email: '',
  phno: '',
  password: '',
  role: '',
  country: '',
  city: '',
  address: '',
});

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("Please accept the Terms and Conditions.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); // Save token 🧠
        navigate('/dashboard');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Signup failed due to a network error');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 signup-bg">
      <form onSubmit={handleSubmit} className="p-5 shadow rounded signup-form bg-white">
        <h2 className="mb-4 text-center text-success">Signup</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="uname"
            placeholder="User name"
            value={formData.uname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="phno"
            placeholder="Phone Number"
            value={formData.phno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
  <input
    type="text"
    className="form-control"
    name="country"
    placeholder="Country"
    value={formData.country}
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <input
    type="text"
    className="form-control"
    name="city"
    placeholder="City"
    value={formData.city}
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <textarea
    className="form-control"
    name="address"
    placeholder="Full Address"
    rows="2"
    value={formData.address}
    onChange={handleChange}
    required
  />
</div>


        <div className="mb-3">
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="freelancer">Freelancer</option>
            <option value="hire">Hire Freelancer</option>
          </select>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={e => setAcceptedTerms(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="terms">
            I accept the <a href="/terms" target="_blank" rel="noreferrer">Terms and Conditions</a>
          </label>
        </div>

        <button type="submit" className="btn btn-success w-100">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
