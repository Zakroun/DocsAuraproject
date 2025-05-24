import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    type: '',
    verified: '',
    email: '',
    year: '',
  });

  // Fetch all users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e, field) => {
    setFilters({ ...filters, [field]: e.target.value });
  };

  // Filter users based on selected filters
  const filteredUsers = users.filter((user) => {
    const userYear = new Date(user.created_at).getFullYear().toString();
    
    return (
      (filters.type === '' || user.type === filters.type) &&
      (filters.verified === '' || (user.verified ? 'Verified' : 'Unverified') === filters.verified) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      (filters.year === '' || filters.year === userYear)
    );
  });

  // Get available years for filter dropdown
  const availableYears = [...new Set(
    users.map(user => new Date(user.created_at).getFullYear().toString())
  )].sort((a, b) => b - a);

  // Render user row
  const renderRow = (user) => {
    return (
      <tr key={`${user.role}-${user.id}`}>
        <td className="name-cell">{user.fullName}</td>
        <td className="type-cell">{user.type}</td>
        <td className="status-cell">
          <span className={`status-badge ${user.verified ? 'verified' : 'pending'}`}>
            {user.verified === 1 ? 'Verified' : 'Unverified'}
          </span>
        </td>
        <td className="email-cell">{user.email}</td>
        <td className="year-cell">{new Date(user.created_at).getFullYear()}</td>
      </tr>
    );
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="list-header">
        <h1>All System Users</h1>
        <p>Manage users across all roles</p>
      </div>

      <div className="list-filters">
        <div className="filter-group">
          <label>User Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange(e, 'type')}
          >
            <option value="">All Types</option>
            <option value="Doctor">Doctors</option>
            <option value="Clinic">Clinics</option>
            <option value="Laboratory">Laboratories</option>
            <option value="Patient">Patients</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.verified}
            onChange={(e) => handleFilterChange(e, 'verified')}
          >
            <option value="">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Year</label>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange(e, 'year')}
          >
            <option value="">All Years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="filter-group search-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by email..."
            value={filters.email}
            onChange={(e) => handleFilterChange(e, 'email')}
          />
        </div>
      </div>

      <div className="list-table-container">
        <table className="list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Email</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(renderRow)
            ) : (
              <tr className="no-results">
                <td colSpan="6">
                  <div className="no-results-content">
                    <span>📭</span>
                    <p>No users found matching your filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}