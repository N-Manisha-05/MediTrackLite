import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import PatientSidebar from '../components/PatientSidebar';
import './PatientDoctors.css'; // Add this CSS file
import Footer from '../components/Footer';
const PatientDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('/api/doctors/approved')
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
   <div className="patient-doctors-container">
  <PatientSidebar />
  
  <div className="main-content">
    <div className="doctor-list-content">
      <h2>Available Doctors</h2>
      {doctors.length > 0 ? (
        <div className="doctor-grid">
          {doctors.map(doc => (
            <DoctorCard key={doc._id} doctor={doc} />
          ))}
        </div>
      ) : (
        <p>No approved doctors available right now.</p>
      )}
    </div>
    <Footer />
  </div>
</div>

  );
};

export default PatientDoctors;