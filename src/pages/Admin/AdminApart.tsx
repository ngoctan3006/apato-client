import { Delete, Visibility } from '@mui/icons-material';
import { Box, IconButton, SvgIcon, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPost } from '../../api/post';
import AppLoading from '../../components/AppLoading';
import Title from '../../components/Title';
import {
  endLoading,
  getAllPosts,
  selectLoading,
  selectPostList,
  startLoading,
} from '../../redux/slices/adminSlice';
import { DataGridBox } from './styled';

const AdminApart: React.FC = () => {
  const posts = useSelector(selectPostList);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
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
            <IconButton>
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
    </Box>
  );
};

export default AdminApart;
