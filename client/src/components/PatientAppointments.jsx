import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PatientAppointment.css';
const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // optional loader
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user || !user._id) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const userId = user._id;

        const res = await axios.get(
          `http://localhost:5000/api/appointments/status/patient/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAppointments(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={{ marginLeft: '250px', padding: '20px' }}>
      <div className="container-fluid">
        <h2 className="mb-4 text-center">My Appointments</h2>

        {loading ? (
          <p className="text-center">Loading appointments...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-center">No appointments found.</p>
        ) : (
          <div className="row">
          {appointments.map((appointment) => (
  <div key={appointment._id} className="col-md-6 mb-4">
    <div
      className="card h-100 shadow-sm"
      style={{ fontSize: '1rem', cursor: 'default' }} // added cursor style
      onClick={(e) => e.preventDefault()} // block any accidental click behavior
    >
      <div className="card-body py-2 px-3">
        <div style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          <strong>Date:</strong> {appointment.date}<br />
          <strong>Time:</strong> {appointment.time}<br />
          <strong>Doctor ID:</strong> {appointment.doctorId.name || appointment.doctorId}<br />
          <strong>Symptom:</strong> {appointment.symptoms || 'N/A'}<br />
          <strong>Status:</strong>{' '}
          <span
            className={
              appointment.status === 'Approved'
                ? 'badge bg-success'
                : appointment.status === 'Rejected'
                ? 'badge bg-danger'
                : 'badge bg-warning text-dark'
            }
          >
            {appointment.status}
          </span>
        </div>
      </div>
    </div>
  </div>
))}


          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
