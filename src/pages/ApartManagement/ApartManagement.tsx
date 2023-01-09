import { Add, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CreateApartModal from '../../components/Modal/CreateApartModal';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function createData(
  no: number,
  name: string,
  address: string,
  time: string,
  rating: string
) {
  return { no, name, address, time, rating };
}

const rows = [
  createData(1, 'Chung cu A', 'Cau Giay, Ha Noi', '20/12/2022', '4/5'),
  createData(2, 'Chung cu A', 'Cau Giay, Ha Noi', '20/12/2022', '3/5'),
  createData(3, 'Chung cu A', 'Cau Giay, Ha Noi', '20/12/2022', '3/5'),
  createData(4, 'Chung cu A', 'Cau Giay, Ha Noi', '20/12/2022', '4/5'),
  createData(5, 'Chung cu A', 'Cau Giay, Ha Noi', '20/12/2022', '2/5'),
];

const ApartManagement: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            href="/post-apart"
          >
            Create Apart
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
              label="Phòng đã đăng"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
              label="Đang duyệt"
              {...a11yProps(1)}
            />
          </Tabs>
        </Stack>

        <TabPanel value={value} index={0}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Time Created</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.no}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.rating}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton>
                          <SvgIcon component={Edit} color="primary" />
                        </IconButton>
                        <IconButton>
                          <SvgIcon component={Delete} color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Time Created</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.no}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.rating}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton>
                          <SvgIcon component={Edit} color="primary" />
                        </IconButton>
                        <IconButton>
                          <SvgIcon component={Delete} color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>

      {/*<CreateApartModal />*/}
    </>
  );
};

export default ApartManagement;
