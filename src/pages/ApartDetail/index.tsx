import { Star } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  ListItem,
  Paper,
  Rating,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { deepPurple, yellow } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { commentPostAPI, getApartDetail } from '../../api/post';
import AppLoading from '../../components/AppLoading';
import {
  Comment,
  commentPost,
  endLoading,
  getOne,
  selectCurPost,
  selectPostLoading,
  startLoading,
  Tag,
} from '../../redux/slices/postSlice';
import { numberWithCommas } from '../../utils';
import { Input } from '../LoginPage/styled';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

const ApartDetail: React.FC = () => {
  const params = useParams();
  const [rating, setRating] = useState<number | null>(5);
  const loading = useSelector(selectPostLoading);
  const curPost = useSelector(selectCurPost);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  const loadApartDetailPageData = async () => {
    try {
      dispatch(startLoading());
      const res = await getApartDetail(Number(params.apartId));
      dispatch(getOne(res.data));
    } catch (e: any) {
    } finally {
      dispatch(endLoading());
    }
  };

  const handleCommentPost = async (data: any) => {
    setCommentLoading(true);
    try {
      const res = await commentPostAPI(curPost?.id, {
        comment: data.comment,
        rating,
      });
      dispatch(commentPost(res.data));
      reset();
      setRating(5);
    } catch (error: any) {
    } finally {
      setCommentLoading(false);
    }
  };

  useEffect(() => {
    loadApartDetailPageData();
  }, []);

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
        {curPost?.title}
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
                  {curPost?.image.map((item) => (
                    <SwiperSlide key={item}>
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
                    {curPost?.area} m2
                  </Typography>
                </Stack>

                <Stack mt={3} direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    Giá
                  </Typography>
                  <Typography variant="h6" component="div">
                    {numberWithCommas(Number(curPost?.price))} VND
                  </Typography>
                </Stack>

                <Stack mt={3} direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    Địa chỉ
                  </Typography>
                  <Typography variant="h6" component="div">
                    {curPost?.address}
                  </Typography>
                </Stack>

                <Stack
                  mt={3}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div">
                    {curPost?.total_rating}/5{' '}
                    {Array.from({
                      length: Math.round(Number(curPost?.total_rating)),
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
                {curPost?.detail}
              </Typography>
            </Box>

            <Box mt={3}>
              <Typography variant="h6" component="div">
                Tags
              </Typography>
              <Paper
                sx={{
                  display: curPost?.tags?.length ? 'flex' : 'none',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  border: '1px solid #e2e8f0',
                  p: '16px 4px',
                  m: '16px 0 0',
                  width: 'fit-content',
                }}
                component="ul"
              >
                {curPost?.tags?.map((tag: Tag) => {
                  return (
                    <ListItem
                      key={tag.id}
                      sx={{
                        width: 'fit-content',
                        p: 1,
                      }}
                    >
                      <Chip
                        label={tag.tag_name}
                        variant="outlined"
                        size="small"
                        color="secondary"
                      />
                    </ListItem>
                  );
                })}
              </Paper>
            </Box>
          </Box>

          <Box mt={3}>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: deepPurple[500] }}>
                {curPost?.creator?.name?.charAt(0)}
              </Avatar>
              <Box flexGrow={1}>
                <form onSubmit={handleSubmit(handleCommentPost)}>
                  <Input
                    size="small"
                    fullWidth
                    label="Đánh giá"
                    multiline
                    maxRows={3}
                    {...register('comment', {
                      required: true,
                    })}
                    error={!!errors.comment}
                    helperText={
                      errors.comment?.type === 'required' &&
                      'Bạn chưa nhập nội dung nhận xét'
                    }
                  />
                  <Stack direction="row" mt={1} spacing={2}>
                    <Rating
                      sx={{
                        mt: 1,
                      }}
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                    />
                    <LoadingButton
                      loading={commentLoading}
                      variant="contained"
                      size="small"
                      type="submit"
                      sx={{
                        backgroundColor: '#9854df',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: 16,
                        '&:hover': {
                          backgroundColor: '#b772ff',
                        },
                      }}
                    >
                      Nhận xét
                    </LoadingButton>
                  </Stack>
                </form>
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
                  {curPost?.comments.length}
                </Typography>
              </Stack>

              {curPost?.comments.map((comment: Comment) => (
                <Stack
                  key={comment.id}
                  mt={3}
                  direction="row"
                  alignItems="center"
                  spacing={3}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: deepPurple[500],
                      mb: 'auto',
                    }}
                  >
                    {comment.user.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      fontSize={16}
                      component="div"
                    >
                      {comment.user.name}
                    </Typography>
                    <Typography variant="body1" component="div">
                      {comment.comment}
                    </Typography>
                    <Stack
                      mt={1.5}
                      spacing={2}
                      direction="row"
                      alignItems="center"
                    >
                      <Rating value={comment.rating} readOnly />
                      <Typography variant="body1" component="div">
                        {moment(comment.created_at).format('DD/MM/YYYY')}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              ))}
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
                {curPost?.creator?.name?.charAt(0)}
              </Avatar>
            </Stack>
            <Typography textAlign="center" variant="h6" component="div">
              {curPost?.creator?.name}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize={14} variant="h6" component="div">
                Uy tín
              </Typography>
              <Typography
                fontSize={14}
                variant="h6"
                component="div"
                color={curPost?.creator?.reputation ? '000' : '#337eff'}
              >
                {curPost?.creator?.reputation
                  ? `${curPost?.creator?.reputation.toFixed(1)} / 5`
                  : 'Chủ mới'}
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
                {curPost?.creator?.phone || 'Không có'}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize={14} variant="h6" component="div">
                Email
              </Typography>
              <Typography fontSize={14} variant="h6" component="div">
                {curPost?.creator?.email || 'Không có'}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApartDetail;
