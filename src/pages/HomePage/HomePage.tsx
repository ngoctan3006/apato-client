import Search from '@mui/icons-material/Search';
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApartList from '../../components/ApartPost/ApartList';
import AppLoading from '../../components/AppLoading/AppLoading';
import { Input } from '../LoginPage/styled';
import FilterMenu from '../../components/FilterMenu/FilterMenu';
import { getAllTags, loadAllPost } from '../../api/post';
import { useDispatch, useSelector } from 'react-redux';
import {
  endLoading,
  getAll,
  getAllTag,
  selectPostList,
  selectPostLoading,
  selectTags,
  startLoading,
  Tag,
} from '../../redux/slices/postSlice';
import { getMeAPI } from '../../api/auth';
import {
  signIn,
  startLoading as start,
  endLoading as end,
  selectAuthLoading,
} from '../../redux/slices/authSlice';

const HomePage: React.FC = () => {
  const tagsList = useSelector(selectTags);
  const loading = useSelector(selectPostLoading);
  const authLoading = useSelector(selectAuthLoading);
  const posts = useSelector(selectPostList);
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState<string | null>(null);
  const [priceStart, setPriceStart] = useState<string | null>(null);
  const [priceEnd, setPriceEnd] = useState<string | null>(null);
  const [areaStart, setAreaStart] = useState<string | null>(null);
  const [areaEnd, setAreaEnd] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [university, setUniversity] = useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [tags, setTags] = React.useState<Tag[]>(tagsList);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const loadAllTags = async () => {
    try {
      const { data } = await getAllTags();
      dispatch(getAllTag(data));
    } catch (error: any) {}
  };

  useEffect(() => {
    getMeAPI()
      .then((res) => {
        dispatch(start());
        if (res) {
          dispatch(signIn(res.data.user_info));
        }
      })
      .finally(() => {
        dispatch(end());
      });
  }, []);

  const loadHomePageData: () => Promise<void> = async () => {
    try {
      dispatch(startLoading());
      const { data } = await loadAllPost({
        searchValue: searchKey,
        priceStart: Number(priceStart),
        priceEnd: Number(priceEnd),
        areaStart: Number(areaStart),
        areaEnd: Number(areaEnd),
        district: district,
        university: university,
        pageIndex: 1,
        pageSize: 10,
        tags: selectedTags.map((item) => item.id.toString()),
      });
      dispatch(getAll(data));
    } catch (e: any) {
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadAllTags();
    loadHomePageData();
  }, []);

  useEffect(() => {
    setTags(tagsList);
  }, [tagsList]);

  const searchApart = async () => {
    try {
      const res = await loadAllPost({
        searchValue: searchKey,
        priceStart: Number(priceStart),
        priceEnd: Number(priceEnd),
        areaStart: Number(areaStart),
        areaEnd: Number(areaEnd),
        district: district,
        university: university,
        pageIndex: 1,
        pageSize: 10,
      });

      dispatch(getAll(res.data));
    } catch (e: any) {}
  };

  const filterHandler = async () => {
    await loadHomePageData();
    setAreaEnd(null);
    setAreaStart(null);
    setPriceStart(null);
    setPriceEnd(null);
    setDistrict(null);
    setUniversity(null);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await searchApart();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKey]);

  if (loading || authLoading) {
    return <AppLoading />;
  }

  return (
    <Container
      sx={{
        marginTop: '85px',
      }}
      maxWidth="xl"
    >
      <Grid container padding="40px 0 0">
        <Grid item xs={2}>
          <FilterMenu
            priceStart={priceStart}
            setPriceStart={setPriceStart}
            priceEnd={priceEnd}
            setPriceEnd={setPriceEnd}
            areaStart={areaStart}
            setAreaStart={setAreaStart}
            areaEnd={areaEnd}
            setAreaEnd={setAreaEnd}
            district={district}
            setDistrict={setDistrict}
            university={university}
            setUniversity={setUniversity}
            filterHandler={filterHandler}
            tags={tags}
            setTags={setTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </Grid>

        <Grid item xs={10}>
          <Box width="60%" m="auto">
            <Input
              size="small"
              fullWidth
              label="Tìm kiếm"
              value={searchKey || ''}
              onChange={(e) => setSearchKey(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Search fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Stack mt={5} justifyContent="center" alignItems="flex-end">
            <Pagination
              count={1}
              page={page}
              onChange={handleChangePagination}
              color="secondary"
            />
          </Stack>
          <ApartList data={posts} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
