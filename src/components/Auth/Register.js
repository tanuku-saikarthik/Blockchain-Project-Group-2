import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';
import bcrypt from 'bcryptjs';
import "../Styles/Shared/Register.css";

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Buyer');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [aadhaarFile, setAadhaarFile] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { role: selectedRole } = useParams();

    useEffect(() => {
        if (selectedRole) {
            setRole(selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1));
        }
    }, [selectedRole]);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
            } catch (error) {
                console.error('Wallet Connection Error:', error);
                setError('Failed to connect wallet. Please try again.');
            }
        } else {
            setError('MetaMask not detected. Please install MetaMask.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Check for required fields that might not be enforced by HTML attributes
        if (!walletAddress) {
            setError("Wallet address is required. Please connect your wallet.");
            return;
        }
        if (!aadhaarFile) {
            setError("Aadhaar file is required. Please upload your Aadhaar file.");
            return;
        }

        // Step 1: Register user with Supabase Auth (Supabase stores a hashed password internally)
        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            console.error('Error signing up:', signUpError.message);
            setError(signUpError.message);
            return;
        }

        let aadhaarFilePath = null;
        if (aadhaarFile) {
            const { data: fileData, error: fileError } = await supabase
                .storage
                .from('aadhaar_uploads')
                .upload(`${email}/${aadhaarFile.name}`, aadhaarFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (fileError) {
                console.error('File Upload Error:', fileError.message);
                setError('Aadhaar file upload failed!');
                return;
            }

            const { data, error: urlError } = supabase
                .storage
                .from('aadhaar_uploads')
                .getPublicUrl(fileData.path);

            if (urlError) {
                console.error('URL Generation Error:', urlError.message);
                setError('Failed to generate Aadhaar file URL!');
                return;
            }

            aadhaarFilePath = data.publicUrl;
            console.log("Aadhaar file URL:", aadhaarFilePath);
        }

        // Hash the password before storing it in the custom "users" table
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Step 3: Insert user details into "users" table (password is stored as hashed)
        const { error: insertError } = await supabase
            .from('users')
            .insert([{
                full_name: fullName,
                email,
                password: hashedPassword,
                role_id: role === 'Buyer' ? 1 : 2,
                age,
                phone_number: phone,
                pan_number: panNumber,
                aadhaar_number: aadhaarNumber,
                wallet_address: walletAddress,
                aadhaar_file_url: aadhaarFilePath,
                created_at: new Date().toISOString()
            }]);

        if (insertError) {
            console.error('Error inserting user:', insertError.message);
            setError('Registration failed!');
            return;
        }

        console.log('User registered successfully');

        // Step 4: Redirect based on role
        if (role === 'Buyer') {
            navigate('/buyerdashboard');
        } else if (role === 'Seller') {
            navigate('/sellerdashboard');
        }
    };

    return (
        <div className='register-page'>
            <div className="register-container">
                <div className="register-form">
                    <h2>Register as {role}</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
                        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <input type="text" placeholder="PAN Number" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} required />
                        <input type="text" placeholder="Aadhaar Number" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} required />

                        <label htmlFor="aadhaar-upload" className="file-input">
                            <FaUpload className="upload-icon" />
                            {aadhaarFile ? aadhaarFile.name : 'Upload Aadhaar'}
                        </label>
                        <input type="file" id="aadhaar-upload" onChange={(e) => setAadhaarFile(e.target.files[0])} hidden />

                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="Buyer">Buyer</option>
                            <option value="Seller">Seller</option>
                        </select>

                        <button type="button" onClick={connectWallet}>
                            {walletAddress ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
                        </button>

                        <button type="submit">Register</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Register;
