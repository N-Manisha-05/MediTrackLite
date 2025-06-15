import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientPendingAppointments.css'; // custom styles
import { toast } from 'react-toastify';
import PatientSidebar from "./PatientSidebar";
import Footer from './Footer';
const PatientPendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/appointments/pending/patients', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(res.data);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.msg || 'Failed to load appointments');
      }
    };

    fetchPendingAppointments();
  }, []);

  return (
    <div className="pending-appointments-container">
      <PatientSidebar/>
      <h2>Your Pending Appointments</h2>
      {appointments.length === 0 ? (
        <p className="no-appointments">No pending appointments found.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((app, index) => (
            <div className="appointment-card" key={index}>
              <p><strong>Doctor:</strong> {app.doctorName || 'Unknown'}</p>
              <p><strong>Date:</strong> {app.date}</p>
              <p><strong>Time:</strong> {app.time}</p>
              <p><strong>Symptoms:</strong> {app.symptoms}</p>
              <p><strong>Status:</strong> <span className="pending-tag">Pending</span></p>
            </div>
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default PatientPendingAppointments;
