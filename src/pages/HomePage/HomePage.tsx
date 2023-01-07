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
import { loadAllPost } from '../../api/service';
import ApartList from '../../components/ApartPost/ApartList';
import AppLoading from '../../components/AppLoading/AppLoading';
import useScreenState from '../../hook/useScreenState';
import { ApartModel } from '../../model/ApartModel';
import { Input } from '../LoginPage/styled';
import FilterMenu from '../../components/FilterMenu/FilterMenu';

const HomePage: React.FC = () => {
  const [searchKey, setSearchKey] = useState('');
  const [priceStart, setPriceStart] = useState('');
  const [priceEnd, setPriceEnd] = useState('');
  const [areaStart, setAreaStart] = useState('');
  const [areaEnd, setAreaEnd] = useState('');
  const [apartList, setApartList] = useState<ApartModel[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const { setLoading, loading, error, setError } = useScreenState();
  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const loadHomePageData: () => Promise<void> = async () => {
    try {
      setLoading(true);
      const res = await loadAllPost({
        searchValue: searchKey,
        priceStart: Number(priceStart),
        priceEnd: Number(priceEnd),
        areaStart: Number(areaStart),
        areaEnd: Number(areaEnd),
      });
      if (res.status === 201) {
        const newApartList = res.data.map((item) => {
          const newImage = item.image.map((_imageLink) => {
            return _imageLink;
          });
          return {
            ...item,
            image: [...newImage],
          };
        });
        setApartList(newApartList);
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomePageData().finally(() => {});
  }, []);

  const searchApart = async () => {
    try {
      const res = await loadAllPost({
        searchValue: searchKey,
      });

      if (res.status === 201) {
        const newApartList = res.data.map((item) => {
          const newImage = item.image.map((_imageLink) => {
            return _imageLink;
          });
          return {
            ...item,
            image: [...newImage],
          };
        });
        setApartList(newApartList);
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
    }
  };

  const filterHandler = async () => {
    await loadHomePageData();
    setAreaEnd('');
    setAreaStart('');
    setPriceStart('');
    setPriceEnd('');
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
            filterHandler={filterHandler}
          />
        </Grid>

        <Grid item xs={10}>
          <Box width="60%" m="auto">
            <Input
              size="small"
              fullWidth
              label="Search"
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
              count={10}
              page={page}
              onChange={handleChangePagination}
              color="secondary"
            />
          </Stack>
          <ApartList data={apartList} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
