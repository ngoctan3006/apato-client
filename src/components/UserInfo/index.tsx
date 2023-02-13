import { WestRounded } from '@mui/icons-material';
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
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
      {user?.name}
    </Dialog>
  );
};

export default UserInfo;
