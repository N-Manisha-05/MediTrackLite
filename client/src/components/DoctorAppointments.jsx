import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorAppointments.css'; // Optional: for styling

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchMyAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/appointments/my', {
            headers: {
              Authorization: `Bearer ${token}`,
            },  
        });
        console.log('Appointments fetched:', res.data); // Add this line
        setAppointments(res.data);
        setAppointments(res.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchMyAppointments();
  }, []);

  return (
    <div className="doctor-appointments">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments accepted yet.</p>
      ) : (
        <ul className="appointment-list">
          {appointments.map((app) => (
            <li key={app._id}  style={{ color: 'black' }}  >
              <strong>Patient:</strong> {app.patientName} <br />
              <strong>Date:</strong> {app.date} <br />
              <strong>Time:</strong> {app.time} <br />
              <strong>Status:</strong> {app.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorAppointments;
