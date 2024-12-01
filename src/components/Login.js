import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: theme.shadows[5],
}));

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // To store error message if login fails
    const [success, setSuccess] = useState(false); // To track success login state
    const [rolest,setRole]=useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { username, password } = credentials;
        const payload = { username, password };

        setLoading(true); // Set loading to true while the request is in progress
        setError(null); // Clear any previous error

        try {
            // Step 1: Login and get token, userId
            const response = await axios.post('https://fandoexpert1.onrender.com/api/login', payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Log the full response to check what is being returned from the backend
            console.log('Login Response:', response.data);

            const { token, userId, role } = response.data; // Ensure backend returns role
            console.log('Token:', token, 'UserId:', userId, 'Role:', role);
            if (token) {
                // Step 2: Store token, userId, and role in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('role', role); // Store role in localStorage as well
            }
                       alert("Token record");

            // Step 3: Record attendance after successful login
            await recordLogin(userId);
                       alert("record login");

            // Step 4: Show success message and navigate after a short delay
            setSuccess(true);
                       alert("success");

            const tokenget = localStorage.getItem('token');
            const roleget = localStorage.getItem('role');
            const trimmedRole = roleget ? roleget.trim() : roleget; // Ensure roleget is not null or undefined
                       alert("trimed role");

            // Navigate to the appropriate dashboard based on the role

            if (tokenget  && trimmedRole) {
           alert(trimmedRole);
            if (trimmedRole == 'Admin') {
                alert(tokenget);

                navigate('/admindashboard'); // Redirect to admin dashboard
            } else if (trimmedRole == 'Agent'){
           navigate('/dashboard'); // Redirect to agent dashboard

            }
        }           
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials.'); // Set error message
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };

    const recordLogin = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'https://fandoexpert1.onrender.com/api/attendance/login',
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Successfully recorded attendance for userId:", userId);
        } catch (error) {
            console.error("Error during attendance recording:", error);
        }
    };


    return (
        <StyledContainer>
            <StyledPaper>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                
                {/* Show success message */}
                {success && (
                    <Alert severity="success" style={{ marginBottom: '16px' }}>
                        Login successful! Redirecting...
                    </Alert>
                )}

                {/* Show error message */}
                {error && (
                    <Alert severity="error" style={{ marginBottom: '16px' }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={credentials.username}
                    onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={credentials.password}
                    onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Logging In...' : 'Login'}
                </Button>
            </StyledPaper>
        </StyledContainer>
    );
};

export default Login;
