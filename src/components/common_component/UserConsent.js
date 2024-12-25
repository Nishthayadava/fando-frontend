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
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import the search icon
import dayjs from 'dayjs'; // Install dayjs for date formatting (`npm install dayjs`)

// Replace with your backend URL
const socket = io('https://webhook-api-rw66.onrender.com');

function UserConsent() {
  const [webhookData, setWebhookData] = useState([]);
  const [filter, setFilter] = useState(''); // Track filter input

  // Fetch the current webhook data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://webhook-api-rw66.onrender.com/api/webhook-data');
        const data = await response.json();
        const enrichedData = data.map((entry) => ({
          ...entry,
          receivedAt: dayjs().format('YYYY-MM-DD - HH:mm:ss'), // Add current date and time
        }));
        setWebhookData(enrichedData); // Set the enriched data
        console.log('Initial data fetched:', enrichedData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();

    // Listen for real-time updates from the backend
    socket.on('update', (data) => {
      console.log('Data received:', data);
      const enrichedData = data.map((entry) => ({
        ...entry,
        receivedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'), // Add current date and time
      }));
      setWebhookData(enrichedData); // Update state with enriched data
    });

    // Cleanup on unmount
    return () => {
      socket.off('update');
    };
  }, []);

  // Filtered data based on the filter input
  const filteredData = webhookData.filter((entry) =>
    entry.name?.toLowerCase().includes(filter.toLowerCase()) ||
    entry.email?.toLowerCase().includes(filter.toLowerCase()) ||
    entry.phone?.toLowerCase().includes(filter.toLowerCase())
  );

  // Function to mask phone number, showing only last 4 digits
  const maskPhoneNumber = (phone) => {
    if (!phone) return '-';
    return `*******${phone.slice(-4)}`; // Mask all but last 4 digits
  };

  // Function to highlight the filter keyword in the text
  const highlightText = (text) => {
    if (!text) return text;
    const regex = new RegExp(`(${filter})`, 'gi'); // Case-insensitive match for the filter
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === filter.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      {/* Quick filter input with search icon */}
      <Box sx={{ marginBottom: 0 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ maxWidth: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon /> {/* Add search icon */}
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredData.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            No matches Found
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Date & Time
                </TableCell>
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
              {filteredData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{entry.receivedAt || '-'}</TableCell> {/* Display receivedAt */}
                  <TableCell align="center">{highlightText(entry.name) || '-'}</TableCell>
                  <TableCell align="center">{highlightText(entry.email) || '-'}</TableCell>
                  <TableCell align="center">{highlightText(maskPhoneNumber(entry.phone))}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: entry.second_confirmation_sent ? 'green' : 'red',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: entry.second_confirmation_sent ? 'darkgreen' : 'darkred',
                        },
                      }}
                    >
                      {entry.second_confirmation_sent ? 'Agreed' : 'Pending'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default UserConsent;
