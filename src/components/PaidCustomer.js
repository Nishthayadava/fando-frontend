import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const PaidCustomer = ({ onStatusChange }) => {
  const [formData, setFormData] = useState({
    customer_id: '',
    sale_date: '',
    full_name: '',
    package: '',
    expiry_date: '',
    payment_mode: '',
    total_received: '',
    gst_amount: 0,
    company_amount: 0,
    agent: '',
    percentage: '',
    shared_amount: 0,
    remark: '',
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getData');
        setSubmittedData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      if (name === 'total_received') {
        const gstAmount = (parseFloat(value) * 18) / 100;
        const companyAmount = (parseFloat(value) * 82) / 100;
        newFormData.gst_amount = gstAmount;
        newFormData.company_amount = companyAmount;

        if (newFormData.percentage) {
          const sharedAmount = (companyAmount * parseFloat(newFormData.percentage)) / 100;
          newFormData.shared_amount = sharedAmount;
        }
      }
      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/submit', formData);
      setSubmittedData((prevData) => [...prevData, response.data]);
      setFormData({
        customer_id: '',
        sale_date: '',
        full_name: '',
        package: '',
        expiry_date: '',
        payment_mode: '',
        total_received: '',
        gst_amount: 0,
        company_amount: 0,
        agent: '',
        percentage: '',
        shared_amount: 0,
        remark: '',
      });
      setOpenForm(false); // Close form after submit
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenForm}>
        Add Customer
      </Button>

      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Customer ID"
                  name="customer_id"
                  value={formData.customer_id}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Sale Date"
                  name="sale_date"
                  type="date"
                  value={formData.sale_date}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Package"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Expiry Date"
                  name="expiry_date"
                  type="date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Payment Mode"
                  name="payment_mode"
                  value={formData.payment_mode}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Total Received"
                  name="total_received"
                  type="number"
                  value={formData.total_received}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="GST Amount (18%)"
                  name="gst_amount"
                  value={formData.gst_amount}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Amount (82%)"
                  name="company_amount"
                  value={formData.company_amount}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Agent"
                  name="agent"
                  value={formData.agent}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Percentage"
                  name="percentage"
                  type="number"
                  value={formData.percentage}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Shared Amount"
                  name="shared_amount"
                  value={formData.shared_amount}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Remark"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseForm} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Sale Date</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Package</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Payment Mode</TableCell>
              <TableCell>Total Received</TableCell>
              <TableCell>GST Amount</TableCell>
              <TableCell>Company Amount</TableCell>
              <TableCell>Agent</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell>Shared Amount</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.customer_id}</TableCell>
                <TableCell>{new Date(row.sale_date).toLocaleString()}</TableCell> {/* Formatting sale_date */}
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.package}</TableCell>
                <TableCell>{new Date(row.expiry_date).toLocaleString()}</TableCell> {/* Formatting expiry_date */}
                <TableCell>{row.payment_mode}</TableCell>
                <TableCell>{row.total_received}</TableCell>
                <TableCell>{row.gst_amount}</TableCell>
                <TableCell>{row.company_amount}</TableCell>
                <TableCell>{row.agent}</TableCell>
                <TableCell>{row.percentage}</TableCell>
                <TableCell>{row.shared_amount}</TableCell>
                <TableCell>{row.remark}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={row.status === 'approved' ? 'success' : 'error'}
                    disabled={row.status !== 'pending'}
                    style={{ width: '100px' }}
                  >
                    {row.status === 'approved' ? 'Approved' : 'Pending'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaidCustomer;
