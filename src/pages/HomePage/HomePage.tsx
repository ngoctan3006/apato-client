import { FilterAltOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import FilterMenu from './components/FilterMenu/FilterMenu';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} padding="40px 0 0">
        <Grid item xs={2}>
          <FilterMenu />
        </Grid>

        <Grid item xs={10}></Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
