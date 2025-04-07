import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Shared/Landing.css";

const Landing = () => {
    console.log("Landing component loaded");

    const navigate = useNavigate();  

    const handleRegister = (role) => {
        navigate(`/register/${role.toLowerCase()}`);
    };

    return (
        <div className='landing-page'>
            <div className="landing-container">
                <h1 className="landing-title">Land Registration System</h1>
                <div className="landing-content">
                    <h2>Welcome!</h2>
                    <p>Choose your role to proceed</p>
                    <div className="role-buttons">
                        <button onClick={() => handleRegister('Buyer')} className="role-btn buyer">
                            Register as Buyer
                        </button>
                        <button onClick={() => handleRegister('Seller')} className="role-btn seller">
                            Register as Seller
                        </button>
                    </div>
                    <div className="login-link">
                        <button onClick={() => navigate('/login')} className="login-btn">
                            Already a User? Login
                        </button>
                    </div>
                    {/* Added Help button */}
                    <div className="help-link">
                        <button onClick={() => navigate('/help')} className="help-btn">
                            Help
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;

