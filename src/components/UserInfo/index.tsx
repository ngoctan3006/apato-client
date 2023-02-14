import { WestRounded } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
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
import React from 'react';
import { User } from '../../redux/slices/authSlice';

interface Props {
  open: boolean;
  user: User | null;
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

const UserInfo: React.FC<Props> = ({ user, open, handleClose }) => {
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
            Thông tin người dùng
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container m={3} width="60%" spacing={3}>
        <Grid item xs={12} sm={3}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto',
              fontSize: 40,
              backgroundColor: deepPurple[500],
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="div">
              Tên
            </Typography>
            <Typography variant="h6" component="div">
              {user?.name}
            </Typography>
          </Stack>
          <Stack mt={2} direction="row" justifyContent="space-between">
            <Typography variant="h6" component="div">
              Địa chỉ email
            </Typography>
            <Typography variant="h6" component="div">
              {user?.email}
            </Typography>
          </Stack>
          <Stack mt={2} direction="row" justifyContent="space-between">
            <Typography variant="h6" component="div">
              Số điện thoại
            </Typography>
            <Typography variant="h6" component="div">
              {user?.phone}
            </Typography>
          </Stack>
          <Stack mt={2} direction="row" justifyContent="space-between">
            <Typography variant="h6" component="div">
              Địa chỉ
            </Typography>
            <Typography variant="h6" component="div">
              {user?.address}
            </Typography>
          </Stack>
          <Stack mt={2} direction="row" justifyContent="space-between">
            <Typography variant="h6" component="div">
              Vai trò
            </Typography>
            <Typography variant="h6" component="div">
              {user?.role === 'SELLER' ? 'Chủ phòng' : 'Người dùng'}
            </Typography>
          </Stack>
          {user?.role === 'SELLER' && (
            <Stack mt={2} direction="row" justifyContent="space-between">
              <Typography variant="h6" component="div">
                Điểm uy tín
              </Typography>
              <Typography variant="h6" component="div">
                {user?.reputation
                  ? user?.reputation?.toFixed(1) + ' / 5'
                  : 'Chủ mới'}
              </Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default UserInfo;
