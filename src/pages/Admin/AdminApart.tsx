import { Delete, Visibility } from '@mui/icons-material';
import { Box, IconButton, SvgIcon, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApartDetail, loadAllPost } from '../../api/post';
import AppLoading from '../../components/AppLoading';
import PostDetail from '../../components/PostDetail';
import Title from '../../components/Title';
import {
  endLoading,
  getAllPosts,
  selectLoading,
  selectPostList,
  startLoading,
} from '../../redux/slices/adminSlice';
import { Post } from '../../redux/slices/postSlice';
import { DataGridBox } from './styled';

const AdminApart: React.FC = () => {
  const posts = useSelector(selectPostList);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [open, setOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<number | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <>
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
          <Tooltip title="Xóa">
            <IconButton>
              <SvgIcon component={Delete} color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

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

  const loadAllPosts = async (page: number) => {
    dispatch(startLoading());
    try {
      const { data } = await loadAllPost({
        pageIndex: page,
        pageSize: 20,
      });
      console.log(data);
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
      <Title title="Quản lý phòng trọ" />
      <DataGridBox>
        <DataGrid rows={posts} columns={columns} />
      </DataGridBox>

      <PostDetail post={post} open={open} handleClose={handleClose} />
    </Box>
  );
};

export default AdminApart;
