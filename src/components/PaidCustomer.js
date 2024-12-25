import React, { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from '@mui/material';

const PaidCustomer = ({ onStatusChange }) => {
  const [formData, setFormData] = useState({
    email: '',
    sale_date: '',
    full_name: '',
    package: '',
    expiry_date: '',
    payment_mode: '',
    total_received: '',
    gst_amount: 0,
    company_amount: 0,
    agents: [],
    agentPercentages: {},
    shared_amounts: {},
    remark: '',
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agentList, setAgentList] = useState(['Agent A', 'Agent B', 'Agent C']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      if (name === 'total_received') {
        const gstAmount = (parseFloat(value) * 18) / 100;
        const companyAmount = (parseFloat(value) * 82) / 100;
        newFormData.gst_amount = gstAmount;
        newFormData.company_amount = companyAmount;

        let newSharedAmounts = {};
        Object.keys(newFormData.agentPercentages).forEach((agent) => {
          const percentage = newFormData.agentPercentages[agent];
          const sharedAmount = (companyAmount * percentage) / 100;
          newSharedAmounts[agent] = sharedAmount;
        });
        newFormData.shared_amounts = newSharedAmounts;
      }

      return newFormData;
    });
  };

  const handleAgentPercentageChange = (e, agent) => {
    const { value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev };
      newFormData.agentPercentages[agent] = parseFloat(value);

      const companyAmount = newFormData.company_amount;
      let newSharedAmounts = { ...newFormData.shared_amounts };
      const sharedAmount = (companyAmount * parseFloat(value)) / 100;
      newSharedAmounts[agent] = sharedAmount;
      newFormData.shared_amounts = newSharedAmounts;

      return newFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Store the form data locally in the submittedData state
      setSubmittedData((prevData) => [...prevData, formData]);

      // Clear form fields after submission
      setFormData({
        email: '',
        sale_date: '',
        full_name: '',
        package: '',
        expiry_date: '',
        payment_mode: '',
        total_received: '',
        gst_amount: 0,
        company_amount: 0,
        agents: [],
        agentPercentages: {},
        shared_amounts: {},
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
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Contact Number"
                  name="contact-number"
                  value={formData.contact}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Package"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Payment Mode"
                  name="payment_mode"
                  value={formData.payment_mode}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
                <TextField
                  label="GST Amount (18%)"
                  name="gst_amount"
                  value={formData.gst_amount}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Company Amount (82%)"
                  name="company_amount"
                  value={formData.company_amount}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Agents</InputLabel>
                  <Select
                    multiple
                    value={formData.agents}
                    onChange={(e) => setFormData({ ...formData, agents: e.target.value })}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {agentList.map((agent) => (
                      <MenuItem key={agent} value={agent}>
                        {agent}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {formData.agents.map((agent) => (
                <Grid item xs={12} sm={4} key={agent}>
                  <TextField
                    label={`Percentage for ${agent}`}
                    name={`percentage_${agent}`}
                    type="number"
                    value={formData.agentPercentages[agent] || ''}
                    onChange={(e) => handleAgentPercentageChange(e, agent)}
                    fullWidth
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={4}>
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
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Sale Date</TableCell>
              
              <TableCell>Package</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Payment Mode</TableCell>
              <TableCell>Total Received</TableCell>
              <TableCell>GST Amount</TableCell>
              <TableCell>Company Amount</TableCell>
              <TableCell>Agents</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell>Shared Amount</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{new Date(row.sale_date).toLocaleString()}</TableCell>
                
                <TableCell>{row.package}</TableCell>
                <TableCell>{new Date(row.expiry_date).toLocaleString()}</TableCell>
                <TableCell>{row.payment_mode}</TableCell>
                <TableCell>{row.total_received}</TableCell>
                <TableCell>{row.gst_amount}</TableCell>
                <TableCell>{row.company_amount}</TableCell>
                <TableCell>{row.agents.join(', ')}</TableCell>
                <TableCell>{Object.values(row.agentPercentages).join(', ')}</TableCell>
                <TableCell>{Object.values(row.shared_amounts).join(', ')}</TableCell>
                <TableCell>{row.remark}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onStatusChange(row.email, 'completed')}
                  >
                    Edit
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
