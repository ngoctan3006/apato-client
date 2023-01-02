import React, { useRef } from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Rating,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './apart-detail.css';
import { Star } from '@mui/icons-material';
import { deepPurple, yellow } from '@mui/material/colors';
import { Input } from '../LoginPage/styled';

const ApartDetail: React.FC = () => {
  return (
    <Container
      sx={{
        marginTop: '85px',
      }}
      maxWidth="xl"
    >
      <Typography fontWeight={600} variant="h6" component="div" pt={3}>
        Chung cu A12 Tan Mai
      </Typography>
      <Grid mt={0.5} container spacing={2}>
        <Grid item xs={10}>
          <Box
            sx={{
              border: '2px solid #b772ff',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Swiper
                  style={{
                    height: '300px',
                    '--swiper-navigation-color': '#b772ff',
                    '--swiper-pagination-color': '#b772ff',
                  }}
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true, dynamicBullets: true }}
                >
                  <SwiperSlide>Slide 1</SwiperSlide>
                  <SwiperSlide>Slide 2</SwiperSlide>
                  <SwiperSlide>Slide 3</SwiperSlide>
                  <SwiperSlide>Slide 4</SwiperSlide>
                </Swiper>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    Area
                  </Typography>
                  <Typography variant="h6" component="div">
                    20 m2
                  </Typography>
                </Stack>

                <Stack mt={3} direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    Price
                  </Typography>
                  <Typography variant="h6" component="div">
                    20.000.000 VND
                  </Typography>
                </Stack>

                <Stack mt={3} direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    Address
                  </Typography>
                  <Typography variant="h6" component="div">
                    Cau Giay, Ha Noi
                  </Typography>
                </Stack>

                <Stack
                  mt={3}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div">
                    3/5 <SvgIcon component={Star} sx={{ color: yellow[500] }} />
                    <SvgIcon component={Star} sx={{ color: yellow[500] }} />
                    <SvgIcon component={Star} sx={{ color: yellow[500] }} />
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Typography variant="h6" component="div">
                Description
              </Typography>
              <Typography variant="body1" component="div">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quae, voluptatum, quod, voluptas quibusdam voluptates
                quidem voluptatibus quos quia quas nesciunt. Quisquam, quae.
                Quisquam
              </Typography>
            </Box>
          </Box>

          <Box mt={3}>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: deepPurple[500] }}>
                TA
              </Avatar>
              <Box flexGrow={1}>
                <Input
                  size="small"
                  fullWidth
                  label="Comment"
                  multiline
                  maxRows={3}
                />
                <Rating sx={{ mt: '10px' }} />
              </Box>
            </Stack>

            <Box mt={3}>
              <Stack direction="row" alignItems="center">
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  mr={2}
                  variant="h6"
                  component="div"
                >
                  Comment
                </Typography>
                <Typography
                  p={1}
                  width="50px"
                  height="50px"
                  textAlign="center"
                  borderRadius="50%"
                  variant="h6"
                  component="div"
                  border="1px solid #b772ff"
                  fontWeight={600}
                  fontSize={16}
                  lineHeight={2}
                >
                  3
                </Typography>
              </Stack>

              <Stack mt={3} direction="row" alignItems="center" spacing={3}>
                <Avatar
                  sx={{ width: 40, height: 40, bgcolor: deepPurple[500] }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontSize={16}
                    component="div"
                  >
                    Nguyen Van A
                  </Typography>
                  <Typography variant="body1" component="div">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Typography>
                  <Stack
                    mt={1.5}
                    spacing={2}
                    direction="row"
                    alignItems="center"
                  >
                    <Rating value={3} readOnly />
                    <Typography variant="body1" component="div">
                      12/12/2022
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack mt={3} direction="row" alignItems="center" spacing={3}>
                <Avatar
                  sx={{ width: 40, height: 40, bgcolor: deepPurple[500] }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontSize={16}
                    component="div"
                  >
                    Nguyen Van A
                  </Typography>
                  <Typography variant="body1" component="div">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Typography>
                  <Stack
                    mt={1.5}
                    spacing={2}
                    direction="row"
                    alignItems="center"
                  >
                    <Rating value={3} readOnly />
                    <Typography variant="body1" component="div">
                      12/12/2022
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack mt={3} direction="row" alignItems="center" spacing={3}>
                <Avatar
                  sx={{ width: 40, height: 40, bgcolor: deepPurple[500] }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontSize={16}
                    component="div"
                  >
                    Nguyen Van A
                  </Typography>
                  <Typography variant="body1" component="div">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Typography>
                  <Stack
                    mt={1.5}
                    spacing={2}
                    direction="row"
                    alignItems="center"
                  >
                    <Rating value={3} readOnly />
                    <Typography variant="body1" component="div">
                      12/12/2022
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Stack
            sx={{
              border: '2px solid #b772ff',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <Typography textAlign="center" variant="h6" component="div">
              Landlord
            </Typography>
            <Stack alignItems="center">
              <Avatar sx={{ width: 40, height: 40 }} />
            </Stack>
            <Typography textAlign="center" variant="h6" component="div">
              Nguyen Van A
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize={14} variant="h6" component="div">
                Email
              </Typography>
              <Typography fontSize={14} variant="h6" component="div">
                abc@gmail.com
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize={14} variant="h6" component="div">
                Phone
              </Typography>
              <Typography fontSize={14} variant="h6" component="div">
                0123456789
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApartDetail;
