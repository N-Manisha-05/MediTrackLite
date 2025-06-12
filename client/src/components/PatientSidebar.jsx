import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, CalendarDays, Bell, ClipboardList, HeartPulse } from 'lucide-react';
import './navbar.css'; 

const PatientNavbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Profile', icon: <User className="sidebar-icon" />, path: "/patient-profile" },
    { label: 'Appointments', icon: <CalendarDays className="sidebar-icon" />, path: '/appointments/pending/patient' },
    { label: 'My Doctors', icon: <HeartPulse className="sidebar-icon" />, path: '/doctors/approved' },
    { label: 'Health Records', icon: <ClipboardList className="sidebar-icon" />, path: 'records' },
    { label: 'Notifications', icon: <Bell className="sidebar-icon" />, path: 'notifications' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">MediTrackLite</div>

      <nav className="sidebar-nav">
        {navItems.map(({ label, icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default PatientNavbar;
