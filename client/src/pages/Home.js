import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';

const Home = () => {
  const services = [
    {
      title: 'General Consultation',
      description: 'Comprehensive medical checkups and treatment planning for all general health concerns.',
      icon: <LocalHospitalIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Flexible Scheduling',
      description: 'Book appointments online at your convenience with our easy-to-use booking system.',
      icon: <AccessTimeIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Personalized Care',
      description: 'Every patient receives individualized attention and care tailored to their specific needs.',
      icon: <PersonIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/doctor-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Expert Medical Care You Can Trust
              </Typography>
              <Typography variant="h6" paragraph>
                Dr. Smith offers comprehensive medical services with a focus on
                patient comfort and exceptional care.
              </Typography>
              <Button
                component={RouterLink}
                to="/book-appointment"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
              >
                Book an Appointment
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Container>
        <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/doctor-profile.jpg"
              alt="Dr. Smith"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom color="primary">
              About Dr. Smith
            </Typography>
            <Typography variant="body1" paragraph>
              With over 15 years of experience in general medicine, Dr. Smith provides 
              exceptional care using the latest medical techniques and a patient-centered approach.
            </Typography>
            <Typography variant="body1" paragraph>
              Dr. Smith graduated from Harvard Medical School and completed residency at 
              Johns Hopkins Hospital. Board-certified in Internal Medicine, Dr. Smith specializes 
              in preventive care and managing chronic conditions.
            </Typography>
            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              color="primary"
              sx={{ mt: 1 }}
            >
              Learn More
            </Button>
          </Grid>
        </Grid>

        {/* Services Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom color="primary">
            Our Services
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
            We offer a range of medical services to meet your healthcare needs
          </Typography>

          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h6" component="h3" align="center" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" align="center">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            bgcolor: 'primary.light',
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
            mb: 6,
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom color="white">
            Ready to Schedule Your Appointment?
          </Typography>
          <Typography variant="body1" paragraph color="white">
            Book your consultation online and take the first step towards better health.
          </Typography>
          <Button
            component={RouterLink}
            to="/book-appointment"
            variant="contained"
            color="secondary"
            size="large"
          >
            Book Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 