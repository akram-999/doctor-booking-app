import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout
import Layout from './components/Layout/Layout';
import AdminLayout from './components/Admin/AdminLayout';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import BookAppointment from './pages/BookAppointment';

// Admin pages
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import UpcomingAppointments from './pages/Admin/UpcomingAppointments';
import ManageTimeSlots from './pages/Admin/ManageTimeSlots';
import Profile from './pages/Admin/Profile';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/book-appointment" element={<Layout><BookAppointment /></Layout>} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/appointments" element={<AdminLayout><UpcomingAppointments /></AdminLayout>} />
          <Route path="/admin/time-slots" element={<AdminLayout><ManageTimeSlots /></AdminLayout>} />
          <Route path="/admin/profile" element={<AdminLayout><Profile /></AdminLayout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
