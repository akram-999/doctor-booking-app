import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
  Alert,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse, isBefore } from 'date-fns';

// Validation schema for time slot form
const validationSchema = yup.object({
  dayOfWeek: yup.string().required('Day of week is required'),
  startTime: yup.date().required('Start time is required').nullable(),
  endTime: yup
    .date()
    .required('End time is required')
    .nullable()
    .test(
      'is-after-start',
      'End time must be after start time',
      function (value) {
        const { startTime } = this.parent;
        if (!startTime || !value) return true;
        return isBefore(startTime, value);
      }
    ),
  maxAppointments: yup
    .number()
    .required('Maximum appointments is required')
    .min(1, 'Must be at least 1')
    .integer('Must be an integer'),
});

const ManageTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [deleteSlotId, setDeleteSlotId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Simulated data for the time slots
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const sampleTimeSlots = [
        {
          id: 1,
          dayOfWeek: 'Monday',
          startTime: '09:00',
          endTime: '09:30',
          isAvailable: true,
          maxAppointments: 1,
          currentAppointments: 0,
        },
        {
          id: 2,
          dayOfWeek: 'Monday',
          startTime: '09:30',
          endTime: '10:00',
          isAvailable: true,
          maxAppointments: 1,
          currentAppointments: 0,
        },
        {
          id: 3,
          dayOfWeek: 'Monday',
          startTime: '10:00',
          endTime: '10:30',
          isAvailable: true,
          maxAppointments: 1,
          currentAppointments: 1,
        },
        {
          id: 4,
          dayOfWeek: 'Tuesday',
          startTime: '09:00',
          endTime: '09:30',
          isAvailable: true,
          maxAppointments: 1,
          currentAppointments: 0,
        },
        {
          id: 5,
          dayOfWeek: 'Tuesday',
          startTime: '09:30',
          endTime: '10:00',
          isAvailable: true,
          maxAppointments: 1,
          currentAppointments: 0,
        },
        {
          id: 6,
          dayOfWeek: 'Wednesday',
          startTime: '14:00',
          endTime: '14:30',
          isAvailable: true,
          maxAppointments: 1,
          currentAppointments: 0,
        },
        {
          id: 7,
          dayOfWeek: 'Wednesday',
          startTime: '14:30',
          endTime: '15:00',
          isAvailable: false,
          maxAppointments: 1,
          currentAppointments: 0,
        },
        {
          id: 8,
          dayOfWeek: 'Thursday',
          startTime: '10:00',
          endTime: '10:30',
          isAvailable: true,
          maxAppointments: 2,
          currentAppointments: 1,
        },
        {
          id: 9,
          dayOfWeek: 'Friday',
          startTime: '11:00',
          endTime: '11:30',
          isAvailable: true,
          maxAppointments: 1,
          currentAppointments: 0,
        },
      ];
      
      setTimeSlots(sampleTimeSlots);
    }, 500);
  }, []);

  const formik = useFormik({
    initialValues: {
      dayOfWeek: '',
      startTime: null,
      endTime: null,
      isAvailable: true,
      maxAppointments: 1,
    },
    validationSchema,
    onSubmit: (values) => {
      const formattedStartTime = format(values.startTime, 'HH:mm');
      const formattedEndTime = format(values.endTime, 'HH:mm');

      if (editingSlotId) {
        // Edit existing time slot
        setTimeSlots(
          timeSlots.map((slot) =>
            slot.id === editingSlotId
              ? {
                  ...slot,
                  dayOfWeek: values.dayOfWeek,
                  startTime: formattedStartTime,
                  endTime: formattedEndTime,
                  isAvailable: values.isAvailable,
                  maxAppointments: values.maxAppointments,
                }
              : slot
          )
        );
        setSnackbar({
          open: true,
          message: 'Time slot updated successfully',
          severity: 'success',
        });
      } else {
        // Create new time slot
        const newSlot = {
          id: Math.max(...timeSlots.map((slot) => slot.id), 0) + 1,
          dayOfWeek: values.dayOfWeek,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          isAvailable: values.isAvailable,
          maxAppointments: values.maxAppointments,
          currentAppointments: 0,
        };
        setTimeSlots([...timeSlots, newSlot]);
        setSnackbar({
          open: true,
          message: 'Time slot added successfully',
          severity: 'success',
        });
      }

      handleCloseDialog();
    },
  });

  const handleAddSlot = () => {
    formik.resetForm();
    setEditingSlotId(null);
    setOpenDialog(true);
  };

  const handleEditSlot = (slot) => {
    // Parse time strings to Date objects for the form
    const parseTime = (timeString) => {
      return parse(timeString, 'HH:mm', new Date());
    };

    formik.setValues({
      dayOfWeek: slot.dayOfWeek,
      startTime: parseTime(slot.startTime),
      endTime: parseTime(slot.endTime),
      isAvailable: slot.isAvailable,
      maxAppointments: slot.maxAppointments,
    });

    setEditingSlotId(slot.id);
    setOpenDialog(true);
  };

  const handleDeleteSlot = (id) => {
    setDeleteSlotId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteSlot = () => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== deleteSlotId));
    setOpenDeleteDialog(false);
    setSnackbar({
      open: true,
      message: 'Time slot deleted successfully',
      severity: 'success',
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => {
      formik.resetForm();
      setEditingSlotId(null);
    }, 100);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Group time slots by day of week for display
  const groupedTimeSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.dayOfWeek]) {
      acc[slot.dayOfWeek] = [];
    }
    acc[slot.dayOfWeek].push(slot);
    return acc;
  }, {});

  // Sort days of the week in proper order
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Manage Time Slots
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddSlot}
        >
          Add Time Slot
        </Button>
      </Box>

      {daysOfWeek.map((day) => (
        groupedTimeSlots[day] && (
          <Paper key={day} sx={{ mb: 3, p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              {day}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Bookings</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedTimeSlots[day]
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((slot) => (
                      <TableRow key={slot.id}>
                        <TableCell>{slot.startTime}</TableCell>
                        <TableCell>{slot.endTime}</TableCell>
                        <TableCell>
                          {slot.isAvailable ? (
                            <Chip label="Available" color="success" size="small" />
                          ) : (
                            <Chip label="Unavailable" color="default" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          {slot.currentAppointments} / {slot.maxAppointments}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditSlot(slot)}
                            title="Edit slot"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteSlot(slot.id)}
                            title="Delete slot"
                            disabled={slot.currentAppointments > 0}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )
      ))}

      {/* Add/Edit Time Slot Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>{editingSlotId ? 'Edit Time Slot' : 'Add Time Slot'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl 
                  fullWidth 
                  error={formik.touched.dayOfWeek && Boolean(formik.errors.dayOfWeek)}
                >
                  <InputLabel id="day-of-week-label">Day of Week</InputLabel>
                  <Select
                    labelId="day-of-week-label"
                    id="dayOfWeek"
                    name="dayOfWeek"
                    value={formik.values.dayOfWeek}
                    onChange={formik.handleChange}
                    label="Day of Week"
                  >
                    {daysOfWeek.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.dayOfWeek && formik.errors.dayOfWeek && (
                    <FormHelperText>{formik.errors.dayOfWeek}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Start Time"
                    value={formik.values.startTime}
                    onChange={(value) => formik.setFieldValue('startTime', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                        helperText={formik.touched.startTime && formik.errors.startTime}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="End Time"
                    value={formik.values.endTime}
                    onChange={(value) => formik.setFieldValue('endTime', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                        helperText={formik.touched.endTime && formik.errors.endTime}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="maxAppointments"
                  name="maxAppointments"
                  label="Maximum Appointments"
                  type="number"
                  value={formik.values.maxAppointments}
                  onChange={formik.handleChange}
                  error={formik.touched.maxAppointments && Boolean(formik.errors.maxAppointments)}
                  helperText={formik.touched.maxAppointments && formik.errors.maxAppointments}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.isAvailable}
                      onChange={(e) =>
                        formik.setFieldValue('isAvailable', e.target.checked)
                      }
                      name="isAvailable"
                      color="primary"
                    />
                  }
                  label="Available"
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" color="primary">
              {editingSlotId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Time Slot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this time slot? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDeleteSlot} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
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

export default ManageTimeSlots; 