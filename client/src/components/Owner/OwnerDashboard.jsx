// src/components/Owner/OwnerDashboard.jsx
import { useNavigate } from 'react-router-dom';
import './OwnerDashboard.css'; // Dashboard styles

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const handleAddProperty = () => {
    navigate('/add-places');
  };

  const handleViewRequests = () => {
    navigate('/owner-request-list');
  };

  return (
    <div className="owner-dashboard-container">
      <h1>Welcome, Owner 👑</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={handleAddProperty}>
          <h2>Add Property</h2>
          <p>List your new property for guests</p>
        </div>

        <div className="dashboard-card" onClick={handleViewRequests}>
          <h2>My Properties</h2>
          <p>Manage your listed properties</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
