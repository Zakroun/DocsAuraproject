import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function Userslist() {
  const doctors = useSelector((s) => s.Docsaura.doctors);
  const clinics = useSelector((s) => s.Docsaura.clinics);
  const laboratories = useSelector((s) => s.Docsaura.laboratories);

  const allUsers = useMemo(() => [...doctors, ...clinics, ...laboratories], [doctors, clinics, laboratories]);

  const [filters, setFilters] = useState({
    type: '',
    verified: '',
    rating: '',
    email: '',
    phone: '',
    year: '', 
  });

  const handleFilterChange = (e, field) => {
    setFilters({ ...filters, [field]: e.target.value });
  };

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const type = user.Role === 'doctor' ? 'Doctor' : user.Role === 'clinic' ? 'Clinic' : 'laboratory';
      const userYear = new Date(user.create_at).getFullYear().toString(); // ✅ Extraire l'année

      return (
        (filters.type === '' || filters.type === type) &&
        (filters.verified === '' || (user.Verified ? 'Yes' : 'No') === filters.verified) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        (filters.year === '' || filters.year === userYear) // ✅ Vérification année
      );
    });
  }, [filters, allUsers]);

  const renderRow = (user) => {
    const type = user.Role === 'doctor' ? 'Doctor' : user.Role === 'clinic' ? 'Clinic' : 'laboratory';
    return (
      <tr key={`${type}-${user.id}`}>
        <td>{user.fullName}</td>
        <td>{type}</td>
        <td>{user.Verified ? 'Verified' : 'Unverified'}</td>
        <td>{user.email}</td>
        <td>{new Date(user.create_at).getFullYear()}</td> {/* ✅ Affichage année */}
      </tr>
    );
  };

  return (
    <div className="users">
      <h2 className="users__title">Users List</h2><br />
      <div className="users__table__wrapper">
        <table className="users__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                <select onChange={(e) => handleFilterChange(e, 'type')}>
                  <option value="">All</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Clinic">Clinic</option>
                  <option value="laboratory">laboratory</option>
                </select>
              </th>
              <th>
                <select onChange={(e) => handleFilterChange(e, 'verified')}>
                  <option value="">All</option>
                  <option value="Yes">Verified</option>
                  <option value="No">Unverified</option>
                </select>
              </th>
              <th><input placeholder="Email" onChange={(e) => handleFilterChange(e, 'email')} /></th>
              <th>
                <select onChange={(e) => handleFilterChange(e, 'year')}> {/* ✅ Filtre année */}
                  <option value="">All</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => renderRow(user))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
