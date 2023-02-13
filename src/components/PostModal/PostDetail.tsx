import { Star, WestRounded } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Container,
  Dialog,
  Grid,
  IconButton,
  ListItem,
  Paper,
  Rating,
  Slide,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from '@mui/material';
import { deepPurple, yellow } from '@mui/material/colors';
import { TransitionProps } from '@mui/material/transitions';
import moment from 'moment';
import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Comment, Post, Tag } from '../../redux/slices/postSlice';
import { numberWithCommas } from '../../utils';

interface Props {
  open: boolean;
  post: Post | null;
  handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostDetail: React.FC<Props> = ({ post, open, handleClose }) => {
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

                  <Stack
                    mt={3}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Typography variant="h6" component="div">
                      {post?.total_rating}/5{' '}
                      {Array.from({
                        length: Math.round(Number(post?.total_rating)),
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
                  {post?.detail}
                </Typography>
              </Box>

              <Box mt={3}>
                <Typography variant="h6" component="div">
                  Tags
                </Typography>
                <Paper
                  sx={{
                    display: post?.tags?.length ? 'flex' : 'none',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    border: '1px solid #e2e8f0',
                    p: '16px 4px',
                    m: '16px 0 0',
                    width: 'fit-content',
                  }}
                  component="ul"
                >
                  {post?.tags?.map((tag: Tag) => {
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
                    {post?.comments.length}
                  </Typography>
                </Stack>

                {post?.comments.map((comment: Comment) => (
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
      </Container>
    </Dialog>
  );
};

export default PostDetail;
