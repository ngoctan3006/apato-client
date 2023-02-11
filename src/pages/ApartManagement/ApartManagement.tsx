import { Add } from '@mui/icons-material';
import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadAllPostByUser } from '../../api/seller';
import AppLoading from '../../components/AppLoading/AppLoading';
import { Post } from '../../redux/slices/postSlice';
import {
  endLoading,
  selectAcceptedPost,
  selectPendingPost,
  selectSellerLoading,
  setAcceptedPost,
  setPendingPost,
  startLoading,
} from '../../redux/slices/sellerSlice';
import TableComponent from './Table';
import TabPanel from './TabPanel';

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const ApartManagement: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [apartList, setApartList] = useState<Post[]>([]);
  const dispatch = useDispatch();
  const pendingPost = useSelector(selectPendingPost);
  const acceptedPost = useSelector(selectAcceptedPost);
  const loading = useSelector(selectSellerLoading);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const loadPosts = async () => {
    try {
      dispatch(startLoading());
      const pending = await loadAllPostByUser(
        {
          pageIndex: 1,
          pageSize: 10,
        },
        0
      );
      const accepted = await loadAllPostByUser(
        {
          pageIndex: 1,
          pageSize: 10,
        },
        1
      );
      dispatch(setPendingPost(pending.data));
      dispatch(setAcceptedPost(accepted.data));
    } catch (e: any) {
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    setApartList(value == 0 ? pendingPost : acceptedPost);
  }, [value, pendingPost, acceptedPost]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <>
      <Box mt="85px">
        <Stack pt={4} pr={3} alignItems="flex-end">
          <Button
            sx={{
              textTransform: 'none',
            }}
            variant="outlined"
            color="secondary"
            startIcon={<Add />}
            onClick={() => navigate('/post-apart')}
          >
            Đăng phòng trọ
          </Button>
        </Stack>
        <Stack pt={1} alignItems="center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
              label="Đang duyệt"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
              label="Phòng đã đăng"
              {...a11yProps(1)}
            />
          </Tabs>
        </Stack>

        <TabPanel value={value} index={0}>
          <TableComponent data={apartList} status={value} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableComponent data={apartList} status={value} />
        </TabPanel>
      </Box>
    </>
  );
};

export default ApartManagement;
