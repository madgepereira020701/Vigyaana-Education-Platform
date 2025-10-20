// import React, { useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { API } from '../../../service/api';

// const changePasswordInitials = { newpassword: '', confirmpassword: '' };

// const ChangePassword = () => {
//   const [error, setError] = useState('');
//   const [warnings, setWarnings] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [changePassword, setChangePassword] = useState(changePasswordInitials);
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get('token'); // token from URL

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const validatePassword = (password) => password.length >= 6;

//   const validateFields = (field, value) => {
//     const newWarnings = { ...warnings };

//     if (field === 'newpassword' && !validatePassword(value)) {
//       newWarnings.newpassword = 'Password must be at least 6 characters';
//     } else if (field === 'confirmpassword' && value !== changePassword.newpassword) {
//       newWarnings.confirmpassword = 'Passwords do not match';
//     } else {
//       delete newWarnings[field];
//     }

//     setWarnings(newWarnings);
//   };

//   const updateUserPassword = async () => {
//     if (!changePassword.newpassword || !changePassword.confirmpassword) {
//       setError('Fill in all fields');
//       return;
//     }
//     if (Object.keys(warnings).length > 0) {
//       setError('Resolve all warnings');
//       return;
//     }

//     try {
//       // Using the same functionality as Admin password update
//       const response = await API.updatePassword(token, changePassword);
//       if (response.isSuccess) {
//         alert('Password updated successfully');
//         navigate('/'); // Redirect to login or home
//       } else {
//         setError(response.message || 'Something went wrong');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//       console.error('Error updating user password:', err);
//     }
//   };

//   const onInputChange = (e) => {
//     setChangePassword({ ...changePassword, [e.target.name]: e.target.value });
//     validateFields(e.target.name, e.target.value);
//   };

//   return (
//   <div className="form-container">
//     {/* Add Material Icons link */}
//     <link
//       href="https://fonts.googleapis.com/icon?family=Material+Icons"
//       rel="stylesheet"
//     />
//     <h2>User Change Password</h2>
//     {error && <div className="error">{error}</div>}

//     <div className="password-container">
//       <input
//         type={showPassword ? 'text' : 'password'}
//         name="newpassword"
//         className="input-field"
//         placeholder="New Password"
//         onChange={onInputChange}
//       />
//       {warnings.newpassword && <div className="warnings">{warnings.newpassword}</div>}
//       <span className="material-icons show-hide" onClick={togglePasswordVisibility}>
//         {showPassword ? 'visibility' : 'visibility_off'}
//       </span>
//     </div>

//     <div className="password-container">
//       <input
//         type={showPassword ? 'text' : 'password'}
//         name="confirmpassword"
//         className="input-field"
//         placeholder="Confirm Password"
//         onChange={onInputChange}
//       />
//       {warnings.confirmpassword && <div className="warnings">{warnings.confirmpassword}</div>}
//       <span className="material-icons show-hide" onClick={togglePasswordVisibility}>
//         {showPassword ? 'visibility' : 'visibility_off'}
//       </span>
//     </div>

//     <button onClick={updateUserPassword} className="primary-button">Change Password</button>
//   </div>
// );
// };

// export default ChangePassword;
