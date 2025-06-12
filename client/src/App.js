

// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import DoctorProfile from './components/DoctorProfile';
import PatientProfile from './components/PatientProfile';
import DoctorsPage from './pages/PatientDoctors';
import PatientDashboard from './components/PatientDashboard';
import PendingAppointments from './components/PendingAppointments';
import PatientPendingAppointments from './components/PatientPendingAppointments';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; 
import DoctorDashboardLayout from './components/DoctorDashboardLayout';
import BookAppointmentPage from "./components/BookAppointmentPage";

// Doctor Dashboard children components
import PatientDoctors from './pages/PatientDoctors';
import AppointmentList from './components/AppointmentList';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import PatientHistory from './components/PatientHistory';
import ApprovalStatus from './components/ApprovalStatus';
import Notifications from './components/Notifications';
import ProfileSettings from './components/ProfileSettings';


function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });
  
  

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm onLogin={setUser} />} />
        <Route path="/patient-profile" element={<PatientProfile user={user} />} />
        <Route path="/doctors" element={<div className="min-h-screen bg-gray-50"><DoctorsPage /></div>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/patient-dashboard" element={<PatientDashboard user={user} />} />
       
        <Route path= "/doctors/approved" element={<PatientDoctors user={user} />} />
      <Route path="/appointments/pending/patient" element={<PatientPendingAppointments />} />
         
      <Route path="/appointments/pending" element={<PendingAppointments />} />
        <Route path="/appointment/:id" element={<BookAppointmentPage />} />

        <Route path="/doctor-dashboard" element={<DoctorDashboardLayout />}>
        <Route path="doctor-profile" element={<DoctorProfile user={user} />} />
          <Route path="appointments/p" element={<AppointmentList />} />
          <Route path="appointments" element={<PendingAppointments />} />
          <Route path="availability" element={<AvailabilityCalendar />} />
          <Route path="history" element={<PatientHistory />} />
          <Route path="approval-status" element={<ApprovalStatus />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

      
        <Route path="*" element={<LoginForm onLogin={setUser} />} />
      
      </Routes>
    </Router>
  );
}

export default App;
