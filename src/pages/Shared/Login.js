// import React, { useState } from 'react';
// import axios from 'axios';
// import "../Styles/Shared/Login.css";

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:5000/login', { email, password });
//       console.log(response.data); // For debugging

//       const roleId = response.data.role_id;

//       // Redirect based on the role_id value
//       if (roleId === 1) {
//         window.location.href = '/buyerdashboard';
//       } else if (roleId === 2) {
//         window.location.href = '/sellerdashboard';
//       } else if (roleId === 3) {
//         window.location.href = '/inspectordashboard';
//       } else if (roleId === 4) {
//         window.location.href = '/GovDashboard';
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Login failed! Please check your credentials.');
//     }
//   };

//   return (
//     <div className='login-page'>
//       <div className="login-container">
//         <div className="login-form">
//           <h2>Login</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit">Login</button>
//           </form>
//           {error && <p className="error-message">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;













import React, { useState } from 'react';
import { loginUser } from "../../API"; // Adjust the path if necessary
import "../Styles/Shared/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const responseData = await loginUser({ email, password });
      console.log(responseData); // For debugging

      // Save the token from the login response in localStorage
      localStorage.setItem("token", responseData.token);
      console.log("Token saved to localStorage:", responseData.token);
      const roleId = responseData.role_id|| 2;
      console.log("Role ID:", roleId); // For debugging
      localStorage.setItem("userId", responseData.id);
      console.log("User ID saved to localStorage:", responseData.id);
      // Redirect based on the role_id value
      if (roleId === 1) {
        window.location.href = '/buyer/dashboard';
      } else if (roleId === 2) {
        window.location.href = '/seller/dashboard';
      } else if (roleId === 3) {
        window.location.href = '/inspector/dashboard';
      } else if (roleId === 4) {
        window.location.href = '/government/dashboard';
      }
    } catch (err) {
      console.error(err);
      setError('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className='login-page'>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

