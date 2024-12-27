import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  FreeBreakfast as FreeBreakfastIcon,
  Fastfood as FastfoodIcon,
} from '@mui/icons-material';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const Dashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOnLunchBreak, setIsOnLunchBreak] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);

  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;

  const fetchAttendance = async () => {
    if (!userId) return;
    const response = await axios.get(`https://fandoexpert1.onrender.com/api/attendance/${userId}`, {
      headers: { Authorization: token },
    });
    setAttendance(response.data);
  };

  useEffect(() => {
    fetchAttendance();
  }, [userId]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const recordLogin = async () => {
    try {
      const response = await axios.post(
        'https://fandoexpert1.onrender.com/api/attendance/login',
        { userId },
        { headers: { Authorization: token } }
      );
      if (response.status === 201) {
        await fetchAttendance();
        alert('Successfully recorded login time.');
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://fandoexpert1.onrender.com/api/attendance/logout',
        { userId },
        { headers: { Authorization: token } }
      );
      localStorage.removeItem('token');
      alert('Successfully logged out.');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleLunchBreak = async () => {
    try {
      await axios.post(
        'https://fandoexpert1.onrender.com/api/attendance/break',
        { userId, breakType: 'lunch' },
        { headers: { Authorization: token } }
      );
      setIsOnLunchBreak((prev) => !prev);
      await fetchAttendance();
    } catch (error) {
      console.error('Error during lunch break:', error);
    }
  };

  const handleBreak = async () => {
    try {
      await axios.post(
        'https://fandoexpert1.onrender.com/api/attendance/break',
        { userId, breakType: 'short' },
        { headers: { Authorization: token } }
      );
      setIsOnBreak((prev) => !prev);
      await fetchAttendance();
    } catch (error) {
      console.error('Error during break:', error);
    }
  };

  const events = attendance.map((entry) => ({
    title: entry.leave_applied === 'Y' ? 'Leave' : entry.break_type || 'Working',
    start: new Date(entry.date),
    end: new Date(entry.date),
    color: entry.break_type === 'Available' ? 'green' : 'red',
  }));

  return (
    <div>
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" startIcon={<LoginIcon />} onClick={recordLogin}>
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<FastfoodIcon />}
                    onClick={handleLunchBreak}
                  >
                    {isOnLunchBreak ? 'End Lunch Break' : 'Lunch Break'}
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<FreeBreakfastIcon />}
                    onClick={handleBreak}
                  >
                    {isOnBreak ? 'End Break' : 'Take Break'}
                  </Button>
                  <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
                    Logout
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Calendar
              localizer={dateFnsLocalizer({
                format,
                parse,
                startOfWeek,
                getDay,
                locales,
              })}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              eventPropGetter={(event) => ({
                style: { backgroundColor: event.color, color: 'white' },
              })}
              onSelectEvent={handleSelectEvent}
            />
          </Grid>
        </Grid>
      </Container>
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Typography>
              <b>Title:</b> {selectedEvent.title}
              <br />
              <b>Date:</b> {selectedEvent.start.toDateString()}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
