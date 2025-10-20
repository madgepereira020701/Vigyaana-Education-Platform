// import React, { useState } from 'react';
// import { API } from '../../../service/api';

// const confirmValue = { email: '' };

// const ConfirmEmail = () => {
//   const [error, setError] = useState('');
//   const [warnings, setWarnings] = useState({});
//   const [emailInput, setEmailInput] = useState(confirmValue);

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validateFields = (field, value) => {
//     const newWarnings = { ...warnings };
//     if (field === 'email' && !validateEmail(value)) {
//       newWarnings.email = 'Please enter a valid email address';
//     } else {
//       delete newWarnings.email;
//     }
//     setWarnings(newWarnings);
//   };

//   const onInputChange = (e) => {
//     setEmailInput({ ...emailInput, [e.target.name]: e.target.value });
//     validateFields(e.target.name, e.target.value);
//   };

//   const confirmUserEmail = async () => {
//     if (!emailInput.email) {
//       setError('Email is required');
//       return;
//     }
//     if (Object.keys(warnings).length > 0) {
//       setError('Resolve all warnings');
//       return;
//     }

//     try {
//       const response = await API.passwordresetrequest(emailInput); // Admin functionality reused
//       if (response.isSuccess) {
//         alert('Password reset email sent successfully');
//       } else {
//         setError(response.message || 'Something went wrong');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//       console.error('Error in confirmUserEmail:', err);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>User Password Reset</h2>
//       {error && <div className="error">{error}</div>}<br />

//       <input
//         type="email"
//         name="email"
//         className="input-field"
//         placeholder="Email"
//         onChange={onInputChange}
//       /><br /><br />
//       {warnings.email && <div className="warnings">{warnings.email}</div>}<br />

//       <button onClick={confirmUserEmail}>Confirm</button>
//     </div>
//   );
// };

// export default ConfirmEmail;
