import React, { useState } from 'react';
import "./Form.css";
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '', 
  });

  const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState(''); 


const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); 
        onLogin && onLogin(data.user); 
      
        const userRole = data.role || data.user.role || formData.role || '';
        setTimeout(() => {
          if (userRole === 'doctor') {
            navigate('/doctor-dashboard');
          } else {
            navigate('/patient-dashboard');
          }
        }, 1000);
      
      

      } else {
        //setMessage(data.message || 'Login failed');
        //setMessageType('error');
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      //setMessage('Error: ' + error.message);
      //setMessageType('error');
      toast.error('Error: ' + error.message);
    }
  };


  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <label>Role:</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <button type="submit">Login</button>

      {message && <p className={`message ${messageType}`}>{message}</p>}

      <p style={{ marginTop: '15px' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;