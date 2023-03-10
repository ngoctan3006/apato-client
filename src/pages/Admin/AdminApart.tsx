import { Delete, Visibility } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  SvgIcon,
  Tooltip,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getApartDetail, loadAllPost } from '../../api/post';
import { deletePostAPI } from '../../api/seller';
import AppLoading from '../../components/AppLoading';
import PostDetail from '../../components/PostModal/PostDetail';
import Title from '../../components/Title';
import {
  deletePost,
  endLoading,
  getAllPosts,
  selectLoading,
  selectPostList,
  startLoading,
} from '../../redux/slices/adminSlice';
import { Post } from '../../redux/slices/postSlice';
import { DataGridBox } from './styled';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AdminApart: React.FC = () => {
  const posts = useSelector(selectPostList);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [open, setOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<number | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [openCf, setOpenCf] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  const handleOpenCf = () => {
    setOpenCf(true);
  };

  const handleCloseCf = () => {
    setOpenCf(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await deletePostAPI(postId);
      dispatch(deletePost(postId));
      toast.success('X??a th??nh c??ng');
    } catch (error) {
    } finally {
      setLoadingDelete(false);
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'STT',
      renderCell: (params: any) => params.api.getRowIndex(params.row.id) + 1,
    },
    {
      field: 'title',
      headerName: 'T??n',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'address',
      headerName: '?????a ch???',
      flex: 1,
    },
    {
      field: 'creator',
      headerName: 'Ng?????i ????ng',
      flex: 1,
      renderCell: (params: any) => params?.row?.creator?.name,
    },
    {
      field: 'created_at',
      headerName: 'Th???i gian ????ng',
      flex: 1,
      renderCell: (params: any) =>
        moment(params?.row?.created_at).format('DD/MM/YYYY'),
    },
    {
      field: 'action',
      headerName: 'H??nh ?????ng',
      flex: 1,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Xem th??ng tin">
            <IconButton
              onClick={() => {
                setPostId(params.row?.id);
                handleOpen();
              }}
            >
              <SvgIcon component={Visibility} color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="X??a">
            <IconButton
              onClick={() => {
                setPostId(params.row?.id);
                handleOpenCf();
              }}
            >
              <SvgIcon component={Delete} color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const loadApartDetailPageData = async () => {
    setLoadingPost(true);
    try {
      const res = await getApartDetail(Number(postId));
      setPost(res.data);
    } catch (e: any) {
    } finally {
      setLoadingPost(false);
    }
  };

  useEffect(() => {
    if (postId) {
      loadApartDetailPageData();
    }
  }, [postId]);

  const loadAllPosts = async (page: number) => {
    dispatch(startLoading());
    try {
      const { data } = await loadAllPost({
        pageIndex: page,
        pageSize: 20,
      });
      dispatch(getAllPosts(data.data));
    } catch (error: any) {
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadAllPosts(1);
  }, []);

  if (loading) return <AppLoading />;

  return (
    <Box m="20px">
      <Title title="Qu???n l?? ph??ng tr???" />
      <DataGridBox>
        <DataGrid rows={posts} columns={columns} />
      </DataGridBox>

      <PostDetail
        post={post}
        open={open}
        handleClose={handleClose}
        loading={loadingPost}
      />
      <Dialog
        open={openCf}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCf}
        aria-describedby="delete-post"
        sx={{ margin: '40px auto auto' }}
      >
        <DialogTitle>B???n ch???c ch??n mu???n x??a nh?? n??y?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-post">
            Thao t??c n??y kh??ng th??? ho??n t??c
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ textTransform: 'none' }}
            variant="outlined"
            onClick={handleCloseCf}
          >
            H???y
          </Button>
          <LoadingButton
            sx={{ textTransform: 'none' }}
            variant="contained"
            color="error"
            onClick={async () => {
              await handleDelete();
              handleCloseCf();
            }}
            loading={loadingDelete}
          >
            X??a
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminApart;
