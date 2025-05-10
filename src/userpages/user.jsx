import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from '../data/authslice';
export default function UserProfile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchUserById(49)); // Replace with dynamic ID as needed
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data</div>;

  return (
    <div>
      <h2>{user.fullName}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>gender: {user.gender}</p>
      <p>city: {user.role}</p>
    </div>
  );
}