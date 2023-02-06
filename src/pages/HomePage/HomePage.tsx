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

const HomePage: React.FC = () => {
  const tagsList = useSelector(selectTags);
  const loading = useSelector(selectPostLoading);
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
      const res = await getAllTags();
      console.log(res.data);
      dispatch(getAllTag(res.data));
    } catch (error: any) {
      console.log(error);
    }
  };

  const loadHomePageData: () => Promise<void> = async () => {
    try {
      dispatch(startLoading());
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
        tags: selectedTags.map((item) => item.id.toString()),
      });
      console.log(res.data);
      dispatch(getAll(res.data));
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadAllTags();
    loadHomePageData();
    setTags(tagsList);
  }, []);

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
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      // setLoading(false);
    }
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

  if (loading) {
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
              value={searchKey}
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
