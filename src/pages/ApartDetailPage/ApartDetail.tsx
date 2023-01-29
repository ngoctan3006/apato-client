import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Rating,
  Stack,
  SvgIcon,
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
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import { ApartDetailModel } from '../../model/ApartDetailModel';
import useScreenState from '../../hook/useScreenState';
import { getApartDetail } from '../../api/service';
import { numberWithCommas } from '../../utils/utils';
import AppLoading from '../../components/AppLoading/AppLoading';

const ApartDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user;
  const [apartDetail, setApartDetail] = useState<ApartDetailModel>();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null | undefined>(null);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { setLoading, loading, error, setError } = useScreenState();

  const loadApartDetailPageData = async () => {
    try {
      setLoading(true);
      const res = await getApartDetail(Number(params.apartId));
      console.log(res);
      if (res.status === 200) {
        const newImageData = res.data.image.map((item) => {
          return item;
        });
        setApartDetail({
          ...res.data,
          image: [...newImageData],
        });
        if (res.data?.creator?.email === user?.email) {
          setCanEdit(true);
        }
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApartDetailPageData().finally(() => {});
  }, [needRefresh]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Container
      sx={{
        marginTop: '85px',
      }}
      maxWidth="xl"
    >
      <Typography fontWeight={600} variant="h6" component="div" pt={3}>
        {apartDetail?.title}
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
                  }}
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true, dynamicBullets: true }}
                >
                  {apartDetail?.image.map((item) => (
                    <SwiperSlide>
                      <img src={item} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    Diện tích
                  </Typography>
                  <Typography variant="h6" component="div">
                    {apartDetail?.area} m2
                  </Typography>
                </Stack>

                <Stack mt={3} direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    Gía
                  </Typography>
                  <Typography variant="h6" component="div">
                    {numberWithCommas(Number(apartDetail?.price))} VND
                  </Typography>
                </Stack>

                <Stack mt={3} direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    Địa chỉ
                  </Typography>
                  <Typography variant="h6" component="div">
                    {apartDetail?.address}
                  </Typography>
                </Stack>

                <Stack
                  mt={3}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div">
                    {apartDetail?.total_rating}/5{' '}
                    {Array.from({
                      length: Math.round(Number(apartDetail?.total_rating)),
                    }).map((item, index) => (
                      <SvgIcon
                        key={index}
                        component={Star}
                        sx={{ color: yellow[500] }}
                      />
                    ))}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Typography variant="h6" component="div">
                Mô tả
              </Typography>
              <Typography variant="body1" component="div">
                {apartDetail?.detail}
              </Typography>
            </Box>
          </Box>

          <Box mt={3}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                width: '70rem',
              }}
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: deepPurple[500] }}>
                {apartDetail?.creator?.name[0]}
              </Avatar>
              <Box flexGrow={1}>
                <Input
                  size="small"
<<<<<<< HEAD
                  fullWidth
                  label="Đánh giá"
=======
                  // fullWidth
                  label="Comment"
>>>>>>> master
                  multiline
                  maxRows={3}
                />
                <Rating readOnly />
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
                  Đánh giá
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
              Chủ nhà
            </Typography>
            <Stack alignItems="center">
              <Avatar sx={{ width: 40, height: 40, bgcolor: deepPurple[500] }}>
                {apartDetail?.creator?.name[0]}
              </Avatar>
            </Stack>
            <Typography textAlign="center" variant="h6" component="div">
              {apartDetail?.creator?.name}
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
                {apartDetail?.creator?.email || 'No information'}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize={14} variant="h6" component="div">
                SĐT
              </Typography>
              <Typography fontSize={14} variant="h6" component="div">
                {apartDetail?.creator?.phone || 'No information'}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApartDetail;
