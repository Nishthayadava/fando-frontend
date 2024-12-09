import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Button
} from '@mui/material';

// Replace with your backend URL
const socket = io('https://webhook-api-rw66.onrender.com');

function UserConsent() {
    const [webhookData, setWebhookData] = useState([]);

    // Fetch the current webhook data from the backend when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://webhook-api-rw66.onrender.com/api/webhook-data');
                const data = await response.json();
                setWebhookData(data);  // Set the data received from the backend
                console.log('Initial data fetched:', data);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchData();

        // Listen for real-time updates from the backend
        socket.on('update', (data) => {
            console.log('Data received:', data);
            setWebhookData(data); // Update state with new data
        });

        // Cleanup on unmount
        return () => {
            socket.off('update');
        };
    }, []);

    return (
        <Box sx={{ padding: 4, fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom>
                User Consent
            </Typography>
            {webhookData.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                    <CircularProgress />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        Waiting for data...
                    </Typography>
                </Box>
            ) : (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Name
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Email
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Phone
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Agreed
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {webhookData.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{entry.name || '-'}</TableCell>
                                    <TableCell align="center">{entry.email || '-'}</TableCell>
                                    <TableCell align="center">{entry.phone || '-'}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: entry.secondConfirmationSent ? 'green' : 'red',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: entry.secondConfirmationSent ? 'darkgreen' : 'darkred',
                                                },
                                            }}
                                        >
                                            {entry.secondConfirmationSent ? 'Agreed' : 'Pending'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

export default UserConsent;
