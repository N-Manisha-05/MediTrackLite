// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post('/api/admin/login', { email, password });
//       const { token, role } = res.data;

//       localStorage.setItem('adminToken', token);
//       localStorage.setItem('role', role);

//       navigate('/admin/dashboard');
//     } catch (err) {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <div className="admin-login-box">
//         <h2>Admin Login</h2>
//         <form onSubmit={handleLogin}>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {error && <p className="error-message">{error}</p>}

//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      
      // ✅ Save token to localStorage
      localStorage.setItem('adminToken', response.data.token);

      // Optionally save role if you need it later
      localStorage.setItem('role', response.data.role);
      toast.success('Login successful!');
      // ✅ Navigate to Admin Dashboard
      navigate('/admin/dashboard');
    } 
    
    catch (err) {
      setError('Invalid credentials');
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
