import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Validation schema
const validationSchema = yup.object({
  patientName: yup.string().required('Name is required'),
  patientEmail: yup.string().email('Enter a valid email').required('Email is required'),
  patientPhone: yup.string().required('Phone number is required'),
  appointmentDate: yup.date().required('Date is required').nullable(),
  timeSlot: yup.string().required('Time slot is required'),
  reason: yup.string().required('Reason for appointment is required'),
});

const BookAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const steps = ['Personal Information', 'Appointment Details', 'Confirmation'];

  // Mock time slots - replace with API call in production
  useEffect(() => {
    setTimeSlots([
      { id: 1, startTime: '09:00', endTime: '09:30' },
      { id: 2, startTime: '09:30', endTime: '10:00' },
      { id: 3, startTime: '10:00', endTime: '10:30' },
      { id: 4, startTime: '10:30', endTime: '11:00' },
      { id: 5, startTime: '11:00', endTime: '11:30' },
      { id: 6, startTime: '14:00', endTime: '14:30' },
      { id: 7, startTime: '14:30', endTime: '15:00' },
      { id: 8, startTime: '15:00', endTime: '15:30' },
      { id: 9, startTime: '15:30', endTime: '16:00' },
    ]);
  }, []);

  const formik = useFormik({
    initialValues: {
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      appointmentDate: null,
      timeSlot: '',
      reason: '',
      notes: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Prepare data for API
        const selectedSlot = timeSlots.find(slot => slot.id.toString() === values.timeSlot);
        const appointmentData = {
          patientName: values.patientName,
          patientEmail: values.patientEmail,
          patientPhone: values.patientPhone,
          appointmentDate: format(values.appointmentDate, 'yyyy-MM-dd'),
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          reason: values.reason,
          notes: values.notes,
        };

        // Mock API call - replace with actual API in production
        // await axios.post('http://localhost:5000/api/appointments', appointmentData);
        
        // Simulate API response
        setTimeout(() => {
          setSnackbarMessage('Appointment booked successfully!');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          setLoading(false);
          handleNext();
        }, 1500);
      } catch (error) {
        setSnackbarMessage('Error booking appointment. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setLoading(false);
      }
    },
  });

  const handleNext = () => {
    if (activeStep === 0) {
      if (formik.values.patientName && formik.values.patientEmail && formik.values.patientPhone) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        formik.validateField('patientName');
        formik.validateField('patientEmail');
        formik.validateField('patientPhone');
      }
    } else if (activeStep === 1) {
      if (formik.values.appointmentDate && formik.values.timeSlot && formik.values.reason) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        formik.validateField('appointmentDate');
        formik.validateField('timeSlot');
        formik.validateField('reason');
      }
    } else if (activeStep === 2) {
      formik.handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary" align="center">
          Book an Appointment
        </Typography>

        <Box sx={{ width: '100%', mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="patientName"
                  name="patientName"
                  label="Full Name"
                  value={formik.values.patientName}
                  onChange={formik.handleChange}
                  error={formik.touched.patientName && Boolean(formik.errors.patientName)}
                  helperText={formik.touched.patientName && formik.errors.patientName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="patientEmail"
                  name="patientEmail"
                  label="Email"
                  value={formik.values.patientEmail}
                  onChange={formik.handleChange}
                  error={formik.touched.patientEmail && Boolean(formik.errors.patientEmail)}
                  helperText={formik.touched.patientEmail && formik.errors.patientEmail}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="patientPhone"
                  name="patientPhone"
                  label="Phone Number"
                  value={formik.values.patientPhone}
                  onChange={formik.handleChange}
                  error={formik.touched.patientPhone && Boolean(formik.errors.patientPhone)}
                  helperText={formik.touched.patientPhone && formik.errors.patientPhone}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Appointment Details
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Appointment Date"
                    value={formik.values.appointmentDate}
                    onChange={(value) => {
                      formik.setFieldValue('appointmentDate', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={formik.touched.appointmentDate && Boolean(formik.errors.appointmentDate)}
                        helperText={formik.touched.appointmentDate && formik.errors.appointmentDate}
                      />
                    )}
                    disablePast
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={formik.touched.timeSlot && Boolean(formik.errors.timeSlot)}
                >
                  <InputLabel id="timeSlot-label">Time Slot</InputLabel>
                  <Select
                    labelId="timeSlot-label"
                    id="timeSlot"
                    name="timeSlot"
                    value={formik.values.timeSlot}
                    onChange={formik.handleChange}
                    label="Time Slot"
                  >
                    {timeSlots.map((slot) => (
                      <MenuItem key={slot.id} value={slot.id.toString()}>
                        {slot.startTime} - {slot.endTime}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.timeSlot && formik.errors.timeSlot && (
                    <FormHelperText>{formik.errors.timeSlot}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="reason"
                  name="reason"
                  label="Reason for Appointment"
                  multiline
                  rows={3}
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                  error={formik.touched.reason && Boolean(formik.errors.reason)}
                  helperText={formik.touched.reason && formik.errors.reason}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="notes"
                  name="notes"
                  label="Additional Notes (Optional)"
                  multiline
                  rows={2}
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Review Appointment Details
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Name:</Typography>
                      <Typography variant="body1" gutterBottom>
                        {formik.values.patientName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Phone:</Typography>
                      <Typography variant="body1" gutterBottom>
                        {formik.values.patientPhone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Email:</Typography>
                      <Typography variant="body1" gutterBottom>
                        {formik.values.patientEmail}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Date:</Typography>
                      <Typography variant="body1" gutterBottom>
                        {formik.values.appointmentDate && format(formik.values.appointmentDate, 'MMMM dd, yyyy')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Time:</Typography>
                      <Typography variant="body1" gutterBottom>
                        {formik.values.timeSlot && `${timeSlots.find(slot => slot.id.toString() === formik.values.timeSlot).startTime} - 
                        ${timeSlots.find(slot => slot.id.toString() === formik.values.timeSlot).endTime}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Reason:</Typography>
                      <Typography variant="body1" gutterBottom>
                        {formik.values.reason}
                      </Typography>
                    </Grid>
                    {formik.values.notes && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">Additional Notes:</Typography>
                        <Typography variant="body1" gutterBottom>
                          {formik.values.notes}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}

          {activeStep === 3 && (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h5" gutterBottom>
                Thank you for booking an appointment!
              </Typography>
              <Typography variant="body1" paragraph>
                Your appointment has been confirmed. You will receive a confirmation email shortly.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Appointment Reference: {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0 || activeStep === 3}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={loading || activeStep === 3}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : activeStep === 2 ? (
                'Confirm Booking'
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookAppointment; 