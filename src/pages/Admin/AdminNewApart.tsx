import { Visibility } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPendingPostAPI } from '../../api/admin';
import { getApartDetail } from '../../api/post';
import AppLoading from '../../components/AppLoading';
import NewPost from '../../components/PostModal/NewPost';
import Title from '../../components/Title';
import {
  endLoading,
  getPendingPosts,
  selectLoading,
  selectPendingPostList,
  startLoading,
} from '../../redux/slices/adminSlice';
import { Post } from '../../redux/slices/postSlice';
import { a11yProps } from '../ApartManagement';
import { tabStyle } from './AdminUser';
import { DataGridBox } from './styled';

const AdminNewApart: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<number | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const dispatch = useDispatch();
  const pendingPost = useSelector(selectPendingPostList);
  const loading = useSelector(selectLoading);
  const [value, setValue] = useState<number>(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const loadApartDetailPageData = async () => {
    try {
      const res = await getApartDetail(Number(postId));
      setPost(res.data);
    } catch (e: any) {
    } finally {
    }
  };

  useEffect(() => {
    if (postId) {
      loadApartDetailPageData();
    }
  }, [postId]);

  const loadAllPendingPosts = async (page: number) => {
    dispatch(startLoading());
    try {
      const { data } = await getAllPendingPostAPI({
        pageIndex: page,
        pageSize: 20,
      });
      dispatch(getPendingPosts(data.data));
    } catch (error: any) {
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadAllPendingPosts(1);
  }, []);

  if (loading) return <AppLoading />;

  const columns = [
    {
      field: 'id',
      headerName: 'STT',
      renderCell: (params: any) => params.api.getRowIndex(params.row.id) + 1,
    },
    {
      field: 'title',
      headerName: 'Tên',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      flex: 1,
    },
    {
      field: 'creator',
      headerName: 'Người đăng',
      flex: 1,
      renderCell: (params: any) => params?.row?.creator?.name,
    },
    {
      field: 'created_at',
      headerName: 'Thời gian đăng',
      flex: 1,
      renderCell: (params: any) =>
        moment(params?.row?.created_at).format('DD/MM/YYYY'),
    },
    {
      field: 'action',
      headerName: 'Hành động',
      flex: 1,
      renderCell: (params: any) => (
        <Tooltip title="Xem thông tin">
          <IconButton
            onClick={() => {
              setPostId(params.row?.id);
              handleOpen();
            }}
          >
            <SvgIcon component={Visibility} color="primary" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Title title="Yêu cầu phòng trọ mới" />
      <Stack pt={1} alignItems="flex-start">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab sx={tabStyle} label="Đang chờ duyệt" {...a11yProps(0)} />
          <Tab sx={tabStyle} label="Đã từ chối" {...a11yProps(1)} />
        </Tabs>
      </Stack>

      <DataGridBox>
        <DataGrid
          rows={
            value === 0
              ? pendingPost.filter((post) => post.status === 0)
              : pendingPost.filter((post) => post.status === -1)
          }
          columns={columns}
        />
      </DataGridBox>

      <NewPost open={open} handleClose={handleClose} post={post} />
    </Box>
  );
};

export default AdminNewApart;
