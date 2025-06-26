import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import {Link} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/dashboard');
        }
      }, [navigate]);
    
  const [formData,setFormData] = useState({
    email:'',
    password:'',
  });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(formData)
       });
       const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); 
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-bg">
      <form onSubmit={handleSubmit} className="p-5 shadow rounded login-form bg-white">
        <h2 className="mb-4 text-center text-primary">Login</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
