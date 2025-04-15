import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Alert,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import { format } from 'date-fns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dialogAction, setDialogAction] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [tab, setTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulated data for the appointments
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const today = new Date();
      const sampleAppointments = [
        {
          id: 1,
          patientName: 'John Smith',
          patientEmail: 'john.smith@example.com',
          patientPhone: '(555) 123-4567',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0),
          status: 'scheduled',
          reason: 'Annual checkup',
          notes: 'Patient has history of high blood pressure',
        },
        {
          id: 2,
          patientName: 'Emma Johnson',
          patientEmail: 'emma.j@example.com',
          patientPhone: '(555) 987-6543',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 30),
          status: 'scheduled',
          reason: 'Flu symptoms',
          notes: '',
        },
        {
          id: 3,
          patientName: 'Michael Brown',
          patientEmail: 'michael.b@example.com',
          patientPhone: '(555) 321-7654',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 11, 0),
          status: 'scheduled',
          reason: 'Back pain',
          notes: 'Patient works in construction',
        },
        {
          id: 4,
          patientName: 'Sarah Wilson',
          patientEmail: 'sarah.w@example.com',
          patientPhone: '(555) 456-7890',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 10, 30),
          status: 'scheduled',
          reason: 'Headaches',
          notes: '',
        },
        {
          id: 5,
          patientName: 'David Lee',
          patientEmail: 'david.l@example.com',
          patientPhone: '(555) 789-0123',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 15, 0),
          status: 'scheduled',
          reason: 'Vaccination',
          notes: '',
        },
        {
          id: 6,
          patientName: 'Jennifer Miller',
          patientEmail: 'jennifer.m@example.com',
          patientPhone: '(555) 234-5678',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 13, 0),
          status: 'completed',
          reason: 'Diabetes follow-up',
          notes: 'Patient is managing blood sugar well',
        },
        {
          id: 7,
          patientName: 'Robert Taylor',
          patientEmail: 'robert.t@example.com',
          patientPhone: '(555) 876-5432',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, 11, 30),
          status: 'completed',
          reason: 'Chest pain',
          notes: 'Referred to cardiologist',
        },
        {
          id: 8,
          patientName: 'Lisa Anderson',
          patientEmail: 'lisa.a@example.com',
          patientPhone: '(555) 432-1098',
          appointmentDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3, 9, 30),
          status: 'cancelled',
          reason: 'Regular checkup',
          notes: 'Patient had to reschedule',
        },
      ];
      
      setAppointments(sampleAppointments);
      setFilteredAppointments(sampleAppointments);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [tab, searchTerm, appointments]);

  const filterAppointments = () => {
    let filtered = [...appointments];
    
    // Filter by tab (status)
    if (tab === 1) {
      filtered = filtered.filter(appointment => appointment.status === 'scheduled');
    } else if (tab === 2) {
      filtered = filtered.filter(appointment => appointment.status === 'completed');
    } else if (tab === 3) {
      filtered = filtered.filter(appointment => appointment.status === 'cancelled');
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(appointment => 
        appointment.patientName.toLowerCase().includes(searchLower) ||
        appointment.patientEmail.toLowerCase().includes(searchLower) ||
        appointment.patientPhone.includes(searchTerm) ||
        appointment.reason.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredAppointments(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDialogOpen = (appointment, action) => {
    setSelectedAppointment(appointment);
    setDialogAction(action);
    if (action === 'changeStatus') {
      setStatusValue(appointment.status);
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
    setDialogAction('');
    setStatusValue('');
  };

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };

  const handleConfirmDialog = () => {
    if (dialogAction === 'delete') {
      // In a real app, this would be an API call
      setAppointments(appointments.filter(appointment => appointment.id !== selectedAppointment.id));
      setSnackbar({
        open: true,
        message: 'Appointment deleted successfully',
        severity: 'success',
      });
    } else if (dialogAction === 'changeStatus') {
      // In a real app, this would be an API call
      setAppointments(appointments.map(appointment => 
        appointment.id === selectedAppointment.id 
          ? { ...appointment, status: statusValue } 
          : appointment
      ));
      setSnackbar({
        open: true,
        message: `Appointment status updated to ${statusValue}`,
        severity: 'success',
      });
    }
    handleDialogClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
        Appointments
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label="appointment tabs"
          >
            <Tab label="All" />
            <Tab label="Upcoming" />
            <Tab label="Completed" />
            <Tab label="Cancelled" />
          </Tabs>
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="appointment table">
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredAppointments.length > 0 ? (
                filteredAppointments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{appointment.patientEmail}</Typography>
                        <Typography variant="body2" color="text.secondary">{appointment.patientPhone}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{format(appointment.appointmentDate, 'MMM dd, yyyy')}</Typography>
                        <Typography variant="body2" color="text.secondary">{format(appointment.appointmentDate, 'h:mm a')}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{appointment.reason}</Typography>
                        {appointment.notes && (
                          <Typography variant="body2" color="text.secondary">
                            Notes: {appointment.notes}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{getStatusChip(appointment.status)}</TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary"
                          size="small"
                          onClick={() => handleDialogOpen(appointment, 'changeStatus')}
                          title="Change status"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          color="error"
                          size="small"
                          onClick={() => handleDialogOpen(appointment, 'delete')}
                          title="Delete appointment"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No appointments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAppointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Dialog for confirming delete */}
      <Dialog
        open={openDialog && dialogAction === 'delete'}
        onClose={handleDialogClose}
      >
        <DialogTitle>Delete Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the appointment for {selectedAppointment?.patientName} on {selectedAppointment?.appointmentDate && format(selectedAppointment.appointmentDate, 'MMMM dd, yyyy')} at {selectedAppointment?.appointmentDate && format(selectedAppointment.appointmentDate, 'h:mm a')}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDialog} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog for changing status */}
      <Dialog
        open={openDialog && dialogAction === 'changeStatus'}
        onClose={handleDialogClose}
      >
        <DialogTitle>Change Appointment Status</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update the status for {selectedAppointment?.patientName}'s appointment on {selectedAppointment?.appointmentDate && format(selectedAppointment.appointmentDate, 'MMMM dd, yyyy')} at {selectedAppointment?.appointmentDate && format(selectedAppointment.appointmentDate, 'h:mm a')}.
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={statusValue}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDialog} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpcomingAppointments; 