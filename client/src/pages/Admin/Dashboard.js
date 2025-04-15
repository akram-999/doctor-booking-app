import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { format } from 'date-fns';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
  });
  
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  // Simulated data for the dashboard
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setStats({
        totalAppointments: 24,
        upcomingAppointments: 8,
        completedAppointments: 14,
        cancelledAppointments: 2,
      });
      
      const today = new Date();
      setUpcomingAppointments([
        {
          id: 1,
          patientName: 'John Smith',
          patientEmail: 'john.smith@example.com',
          patientPhone: '(555) 123-4567',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0),
          status: 'scheduled',
        },
        {
          id: 2,
          patientName: 'Emma Johnson',
          patientEmail: 'emma.j@example.com',
          patientPhone: '(555) 987-6543',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 30),
          status: 'scheduled',
        },
        {
          id: 3,
          patientName: 'Michael Brown',
          patientEmail: 'michael.b@example.com',
          patientPhone: '(555) 321-7654',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 11, 0),
          status: 'scheduled',
        },
        {
          id: 4,
          patientName: 'Sarah Wilson',
          patientEmail: 'sarah.w@example.com',
          patientPhone: '(555) 456-7890',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 10, 30),
          status: 'scheduled',
        },
        {
          id: 5,
          patientName: 'David Lee',
          patientEmail: 'david.l@example.com',
          patientPhone: '(555) 789-0123',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 15, 0),
          status: 'scheduled',
        },
      ]);
    }, 500);
  }, []);

  const getStatusChip = (status) => {
    switch (status) {
      case 'scheduled':
        return <Chip label="Scheduled" color="primary" size="small" />;
      case 'completed':
        return <Chip label="Completed" color="success" size="small" />;
      case 'cancelled':
        return <Chip label="Cancelled" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              borderLeft: '4px solid #1976d2',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Appointments
                </Typography>
                <EventNoteIcon color="primary" />
              </Box>
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {stats.totalAppointments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              borderLeft: '4px solid #2196f3',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Upcoming
                </Typography>
                <AccessTimeIcon color="info" />
              </Box>
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {stats.upcomingAppointments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              borderLeft: '4px solid #4caf50',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Completed
                </Typography>
                <CheckCircleIcon color="success" />
              </Box>
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {stats.completedAppointments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              borderLeft: '4px solid #f44336',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Cancelled
                </Typography>
                <CancelIcon color="error" />
              </Box>
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {stats.cancelledAppointments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Upcoming Appointments
          </Typography>
          <Button 
            variant="outlined" 
            component={RouterLink} 
            to="/admin/appointments"
            size="small"
          >
            View All
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="upcoming appointments table">
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{appointment.patientEmail}</Typography>
                      <Typography variant="body2" color="text.secondary">{appointment.patientPhone}</Typography>
                    </TableCell>
                    <TableCell>{format(appointment.appointmentDate, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{format(appointment.appointmentDate, 'h:mm a')}</TableCell>
                    <TableCell>{getStatusChip(appointment.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No upcoming appointments
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard; 