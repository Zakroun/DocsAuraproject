import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function UsersList() {
  const doctors = useSelector((s) => s.Docsaura.doctors);
  const clinics = useSelector((s) => s.Docsaura.clinics);
  const laboratories = useSelector((s) => s.Docsaura.laboratories);

  const allUsers = useMemo(() => [...doctors, ...clinics, ...laboratories], [doctors, clinics, laboratories]);

  const [filters, setFilters] = useState({
    type: '',
    verified: '',
    email: '',
    year: '',
  });

  const handleFilterChange = (e, field) => {
    setFilters({ ...filters, [field]: e.target.value });
  };

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const type = user.role === 'doctor' ? 'Doctor' : user.role === 'clinic' ? 'Clinic' : 'Laboratory';
      const userYear = new Date(user.create_at).getFullYear().toString();

      return (
        (filters.type === '' || filters.type === type) &&
        (filters.verified === '' || (user.Verified ? 'Verified' : 'Unverified') === filters.verified) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        (filters.year === '' || filters.year === userYear)
      );
    });
  }, [filters, allUsers]);

  const renderRow = (user) => {
    const type = user.role === 'doctor' ? 'Doctor' : user.role === 'clinic' ? 'Clinic' : 'Laboratory';
    return (
      <tr key={`${type}-${user.id}`}>
        <td className="name-cell">{user.fullName}</td>
        <td className="type-cell">{type}</td>
        <td className="status-cell">
          <span className={`status-badge ${user.Verified ? 'verified' : 'pending'}`}>
            {user.Verified ? 'Verified' : 'Unverified'}
          </span>
        </td>
        <td className="email-cell">{user.email}</td>
        <td className="year-cell">{new Date(user.create_at).getFullYear()}</td>
      </tr>
    );
  };

  return (
    <div className="users-list-container">
      <div className="list-header">
        <h1 className="list-title">Users List</h1>
        <p className="list-subtitle">Manage all system users</p>
      </div>

      <div className="list-filters">
        <div className="filter-group">
          <label>User Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange(e, 'type')}
          >
            <option value="">All Users</option>
            <option value="Doctor">Doctors</option>
            <option value="Clinic">Clinics</option>
            <option value="Laboratory">Laboratories</option>
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
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
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
              filteredUsers.map((user) => renderRow(user))
            ) : (
              <tr className="no-results">
                <td colSpan="5">
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