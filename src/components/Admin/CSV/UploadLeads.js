import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import LeadList from './LeadList';
import AssignAgent from './AssignAgent';
function UploadLeads({ token }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a CSV file to upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);  // Make sure this field name matches what multer expects ('file')
    axios
    .post('https://fandoexpert1.onrender.com/uploadleads', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      alert('Leads uploaded successfully');
    })
    .catch((error) => {
      console.error(error);  // Log the error to inspect what went wrong
      alert('Error uploading leads: ' + (error.response?.data?.message || error.message));
    });
  
  };
  

  const downloadSampleCSV = () => {
    const sampleData = [
      ['name', 'email', 'phone_number', 'address'], // CSV header
      ['Sanjay Dutt', 'sanjay@example.com', '1234567890', 'Andheri'],
      ['Salman Khan', 'beingsalman@example.com', '0987654321', 'Bandra'],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + sampleData.map(e => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sample_leads.csv');
    link.click();
  };

  return (
    <Box>
      <TextField
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 2 }}
      >
        Upload Leads
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={downloadSampleCSV}
        sx={{ mt: 2, ml: 2 }}
      >
        Download Sample CSV
      </Button>
      <LeadList/>
      <AssignAgent/>
    </Box>
  );
}

export default UploadLeads;
