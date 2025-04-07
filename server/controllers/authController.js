// controllers/authController.js
import supabase from '../supabaseClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// Register User
export const registerUser = async (req, res) => {
    const { full_name, email, password, role_id, age, phone_number, pan_number, aadhaar_number, aadhaar_file_url, wallet_address } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase
            .from('users')
            .insert([{ full_name, email, password: hashedPassword, role_id, age, phone_number, pan_number, aadhaar_number, aadhaar_file_url, wallet_address }]);
        
        if (error) throw error;
        res.status(201).json({ message: 'User registered successfully', user: data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data: users, error } = await supabase.from('users').select('*').eq('email', email).single();
        if (error || !users) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, users.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: users.id, role_id: users.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, id: users.id, role_id: users.role_id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fetch User Profile
export const getUserProfile = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { data: user, error } = await supabase.from('users').select('*').eq('id', decoded.userId).single();
        
        if (error || !user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};