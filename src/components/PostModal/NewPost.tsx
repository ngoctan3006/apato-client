import { WestRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { TransitionProps } from '@mui/material/transitions';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { approvePostAPI, rejectPostAPI } from '../../api/admin';
import { approve, reject } from '../../redux/slices/adminSlice';
import { Post } from '../../redux/slices/postSlice';
import { numberWithCommas } from '../../utils';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  post: Post | null;
  handleClose: () => void;
}

const NewPost: React.FC<Props> = ({ post, open, handleClose }) => {
  const [rejectLoading, setRejectLoading] = useState(false);
  const [approveloading, setApproveLoading] = useState(false);
  const dispatch = useDispatch();

  const rejectPost = async () => {
    setRejectLoading(true);
    try {
      await rejectPostAPI(post?.id);
      dispatch(reject(post?.id));
      toast.success('Từ chối thành công');
      handleClose();
    } catch (error: any) {
    } finally {
      setRejectLoading(false);
    }
  };

  const approvePost = async () => {
    setApproveLoading(true);
    try {
      await approvePostAPI(post?.id);
      dispatch(approve(post?.id));
      toast.success('Duyệt thành công');
      handleClose();
    } catch (error: any) {
    } finally {
      setApproveLoading(false);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <WestRounded />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Thông tin phòng trọ
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          marginBottom: '24px',
        }}
        maxWidth="xl"
      >
        <Typography fontWeight={600} variant="h6" component="div" pt={3}>
          {post?.title}
        </Typography>
        <Grid mt={0.5} container spacing={2}>
          <Grid item xs={10}>
            <Box>
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
                    {post?.image.map((item) => (
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
                      {post?.area} m2
                    </Typography>
                  </Stack>

                  <Stack mt={3} direction="row" justifyContent="space-between">
                    <Typography variant="h6" component="div">
                      Giá
                    </Typography>
                    <Typography variant="h6" component="div">
                      {numberWithCommas(Number(post?.price))} VND
                    </Typography>
                  </Stack>

                  <Stack mt={3} direction="row" justifyContent="space-between">
                    <Typography variant="h6" component="div">
                      Địa chỉ
                    </Typography>
                    <Typography variant="h6" component="div">
                      {post?.address}
                    </Typography>
                  </Stack>

                  <Stack mt={3} direction="row" justifyContent="space-between">
                    <Typography variant="h6" component="div">
                      Ngày đăng
                    </Typography>
                    <Typography variant="h6" component="div">
                      {moment(post?.created_at).format('DD/MM/YYYY')}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Box mt={3} flexGrow={1}>
                <Typography variant="h6" component="div">
                  Mô tả
                </Typography>
                <Typography variant="body1" component="div">
                  {post?.detail}
                </Typography>
              </Box>

              <Typography mt={3} variant="h6" component="div">
                Minh chứng
              </Typography>
              <Grid container spacing={2} mt={0}>
                <Grid item xs={6}>
                  <Box>
                    <Typography
                      fontSize={16}
                      variant="h6"
                      component="div"
                      mb={1.5}
                    >
                      Căn cước công dân của người đăng
                    </Typography>
                    <img
                      width="100%"
                      src={post?.image[post?.image.length - 3]}
                      alt=""
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography
                      fontSize={16}
                      variant="h6"
                      component="div"
                      mb={1.5}
                    >
                      Giấy sở hữu nhà đất
                    </Typography>
                    <img
                      width="100%"
                      src={post?.image[post?.image.length - 2]}
                      alt=""
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography
                      fontSize={16}
                      variant="h6"
                      component="div"
                      mb={1.5}
                    >
                      Ảnh chụp mặt tiền
                    </Typography>
                    <img
                      width="100%"
                      src={post?.image[post?.image.length - 1]}
                      alt=""
                    />
                  </Box>
                </Grid>
              </Grid>
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
                <Avatar
                  sx={{ width: 40, height: 40, bgcolor: deepPurple[500] }}
                >
                  {post?.creator?.name?.charAt(0)}
                </Avatar>
              </Stack>
              <Typography textAlign="center" variant="h6" component="div">
                {post?.creator?.name}
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
                  color={post?.creator?.reputation ? '000' : '#337eff'}
                >
                  {post?.creator?.reputation
                    ? `${post?.creator?.reputation.toFixed(1)} / 5`
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
                  {post?.creator?.phone || 'Không có'}
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
                  {post?.creator?.email || 'Không có'}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {post?.status === 0 && (
          <Grid container my={2}>
            <Grid item xs={4} mx="auto">
              <Stack mt={2} direction="row" spacing={4} justifyContent="center">
                <LoadingButton
                  loading={rejectLoading}
                  sx={{ textTransform: 'none' }}
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={rejectPost}
                >
                  Từ chối
                </LoadingButton>
                <LoadingButton
                  loading={approveloading}
                  sx={{ textTransform: 'none' }}
                  variant="outlined"
                  color="success"
                  fullWidth
                  onClick={approvePost}
                >
                  Duyệt
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </Dialog>
  );
};

export default NewPost;
