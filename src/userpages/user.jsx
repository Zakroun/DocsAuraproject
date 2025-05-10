// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUserById } from '../data/authslice';
// export default function UserProfile() {
//   const dispatch = useDispatch();
//   const { user, loading, error } = useSelector(state => state.auth);

//   useEffect(() => {
//   // Get user data from localStorage
//   const userData = localStorage.getItem('user');
  
//   if (userData) {
//     try {
//       const parsedUser = JSON.parse(userData);
//       const userId = parsedUser.id || parsedUser.value?.id; // Handle both storage formats
      
//       if (userId) {
//         dispatch(fetchUserById(userId));
//       } else {
//         console.error('No user ID found in localStorage');
//         // Handle missing ID (redirect to login, etc.)
//       }
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       // Handle parse error
//     }
//   } else {
//     console.error('No user data in localStorage');
//     // Handle missing user data
//   }
// }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!user) return <div>No user data</div>;

//   return (
//     <div>
//       <h2>{user.fullName}</h2>
//       <p>Email: {user.email}</p>
//       <p>Role: {user.role}</p>
//       <p>gender: {user.gender}</p>
//       <p>city: {user.role}</p>
//     </div>
//   );
// }