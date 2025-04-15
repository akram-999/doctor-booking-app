import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const About = () => {
  const qualifications = [
    'MD from Harvard Medical School, 2008',
    'Residency in Internal Medicine, Johns Hopkins Hospital, 2008-2011',
    'Board Certified in Internal Medicine',
    'Fellowship in Primary Care, Mayo Clinic, 2012',
  ];

  const experiences = [
    'Senior Physician, City General Hospital, 2013-2016',
    'Lead Physician, HealthFirst Medical Group, 2016-2019',
    'Private Practice, 2019-Present',
  ];

  const specialties = [
    'Preventive Care',
    'Chronic Disease Management',
    'Geriatric Care',
    'Men's and Women's Health',
  ];

  const businessHours = [
    { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 12:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            About Dr. Smith
          </Typography>
        </Grid>

        {/* Doctor Info Section */}
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src="/doctor-profile.jpg"
            alt="Dr. Smith"
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: 3,
              mb: 3,
            }}
          />
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Address"
                  secondary="123 Medical Parkway, Suite 200, Anytown, USA 12345"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Phone" secondary="(555) 123-4567" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Email" secondary="drsmith@example.com" />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Office Hours
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List dense>
              {businessHours.map((item) => (
                <ListItem key={item.day}>
                  <ListItemIcon>
                    <AccessTimeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item.day} secondary={item.hours} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Doctor Bio Section */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Professional Profile
            </Typography>
            <Typography variant="body1" paragraph>
              Dr. John Smith is a board-certified physician with over 15 years of experience in 
              general medicine. He provides comprehensive medical care with a focus on preventive 
              health and managing chronic conditions.
            </Typography>
            <Typography variant="body1" paragraph>
              After completing his medical degree at Harvard and residency at Johns Hopkins, 
              Dr. Smith has dedicated his career to delivering exceptional patient care through a 
              combination of evidence-based medicine and a compassionate approach.
            </Typography>
            <Typography variant="body1" paragraph>
              Dr. Smith believes in treating the whole person, not just the symptoms. He takes time 
              to listen to his patients and works collaboratively to develop personalized treatment 
              plans that improve overall health and quality of life.
            </Typography>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Education & Qualifications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {qualifications.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Professional Experience
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {experiences.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <WorkIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Specialties
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {specialties.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <LocalHospitalIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Memberships & Affiliations
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="American Medical Association" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="American College of Physicians" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="State Medical Society" />
                </ListItem>
              </List>
            </Box>
          </Paper>
          
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Button
              component={RouterLink}
              to="/book-appointment"
              variant="contained"
              color="primary"
              size="large"
            >
              Book an Appointment
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About; 