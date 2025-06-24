
// import React, { useState } from "react";
// import { Container, Form, Button, Card, Alert } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // for redirection

// const HomeLoan = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     loanAmount: "",
//     propertyValue: "",
//     employmentStatus: "Employed"
//   });

//   const [responseMessage, setResponseMessage] = useState(null);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // initialize navigator

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setResponseMessage(null);
//     setError(null);

//     try {
//       const res = await axios.post("http://localhost:5000/api/loanRoute/apply", formData);
      
//       // Show success alert
//       setResponseMessage(res.data.message || "Application submitted successfully ✅");

//       // Optional alert popup
//       alert("Application stored successfully in database!");

//       // Redirect to homepage after 2.5 seconds
//       setTimeout(() => {
//         navigate("/");
//       }, 3000);

//     } catch (err) {
//       console.error("Error submitting form:", err);
//       const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
//       setError(errorMessage);
//       alert(errorMessage); // Optional popup
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "80vh" }}>
//       <Card className="p-4 shadow" style={{ width: "500px", background: "#f8f9fa" }}>
//         <h3 className="text-center fw-bold">Apply for a Home Loan</h3>
//         <p className="text-center text-muted">Secure your dream home with Haven Homes</p>

//         {responseMessage && <Alert variant="success">{responseMessage}</Alert>}
//         {error && <Alert variant="danger">{error}</Alert>}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Loan Amount (USD)</Form.Label>
//             <Form.Control type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Property Value (USD)</Form.Label>
//             <Form.Control type="number" name="propertyValue" value={formData.propertyValue} onChange={handleChange} required />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Employment Status</Form.Label>
//             <Form.Select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange}>
//               <option>Employed</option>
//               <option>Self-Employed</option>
//               <option>Unemployed</option>
//               <option>Retired</option>
//             </Form.Select>
//           </Form.Group>

//           <div className="d-grid">
//             <Button variant="primary" type="submit">Submit Application</Button>
//           </div>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default HomeLoan;


import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeLoan = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanAmount: "",
    propertyValue: "",
    employmentStatus: "Employed"
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.loanAmount || parseFloat(formData.loanAmount) <= 0)
      newErrors.loanAmount = "Loan amount must be a positive number.";
    if (!formData.propertyValue || parseFloat(formData.propertyValue) <= 0)
      newErrors.propertyValue = "Property value must be a positive number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(null);
    setError(null);

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/loanRoute/apply", formData);
      setResponseMessage(res.data.message || "Application submitted successfully ✅");
      alert("Application stored successfully in database!");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Error submitting form:", err);
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow" style={{ width: "500px", background: "#f8f9fa" }}>
        <h3 className="text-center fw-bold">Apply for a Home Loan</h3>
        <p className="text-center text-muted">Secure your dream home with Haven Homes</p>

        {responseMessage && <Alert variant="success">{responseMessage}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Loan Amount (USD)</Form.Label>
            <Form.Control
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              isInvalid={!!errors.loanAmount}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.loanAmount}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Property Value (USD)</Form.Label>
            <Form.Control
              type="number"
              name="propertyValue"
              value={formData.propertyValue}
              onChange={handleChange}
              isInvalid={!!errors.propertyValue}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.propertyValue}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Employment Status</Form.Label>
            <Form.Select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange}>
              <option>Employed</option>
              <option>Self-Employed</option>
              <option>Unemployed</option>
              <option>Retired</option>
            </Form.Select>
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Submit Application
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default HomeLoan;
