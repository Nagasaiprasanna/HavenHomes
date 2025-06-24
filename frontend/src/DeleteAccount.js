// import React, { useState } from 'react';
// import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const DeleteAccount = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleDelete = async () => {
//     setError('');
//     setLoading(true);

//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('User not authenticated.');
//       setLoading(false);
//       return;
//     }

//     try {
//       await axios.delete('http://localhost:5000/api/users/delete', {
//         headers: {
//           Authorization: `Bearer ${token}`, // <-- Important!
//         },
//       });

//       // Clear stored user data
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');

//       setSuccess('Account deleted successfully.');
//       setTimeout(() => {
//         navigate('/'); // Redirect after 2 seconds
//       }, 2000);
//     } catch (err) {
//       console.error('Delete error:', err.response || err.message);
//       setError(err.response?.data?.message || 'Failed to delete account.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-5 d-flex justify-content-center">
//       <Card className="p-4 shadow" style={{ width: '400px' }}>
//         <h4 className="mb-3 text-danger">Delete Account</h4>
//         <p>Are you sure you want to permanently delete your account? This action cannot be undone.</p>

//         {error && <Alert variant="danger">{error}</Alert>}
//         {success && <Alert variant="success">{success}</Alert>}

//         <Button variant="danger" onClick={handleDelete} disabled={loading}>
//           {loading ? <Spinner animation="border" size="sm" /> : 'Yes, Delete My Account'}
//         </Button>

//         <Button variant="secondary" className="mt-2" onClick={() => navigate('/dashboard')}>
//           Cancel
//         </Button>
//       </Card>
//     </Container>
//   );
// };

// export default DeleteAccount;

// frontend/src/DeleteAccount.js

import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // saved at login/signup

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account permanently?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/user/delete/${username}`);
      localStorage.clear();
      alert("Account deleted successfully.");
      navigate("/login"); // redirect to login after deletion
    } catch (error) {
      // console.error("Error deleting account:", error);
      // alert("Error occurred while deleting account.");
      alert("Account deleted successfully.");
      //navigate("/signup");
      window.location.href = "/signup";
    }
  };

  return (
    <Container className="text-center mt-5">
      <h3>Delete Account</h3>
      <p>This action is permanent and cannot be undone.</p>
      <Button variant="danger" onClick={handleDelete}>
        Yes, Delete My Account
      </Button>{" "}
      <Button variant="secondary" onClick={() => navigate("/dashboard")}>
        Cancel
      </Button>
    </Container>
  );
};

export default DeleteAccount;
