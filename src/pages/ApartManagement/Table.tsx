import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { Post } from '../../redux/slices/postSlice';

interface TableProps {
  data: Post[];
  status: number;
}

const TableComponent: React.FC<TableProps> = ({ data, status }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Thời gian đăng</TableCell>
            {status === 1 && <TableCell>Đánh giá</TableCell>}
            {status === 0 && <TableCell>Trạng thái</TableCell>}
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length == 0 ? (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                height: 100,
              }}
            >
              <TableCell colSpan={6} align="center">
                <Typography variant="h6" color="text.secondary">
                  Không có dữ liệu
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((apart, index) => (
              <TableRow
                key={apart.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{apart.title}</TableCell>
                <TableCell>{apart.address}</TableCell>
                <TableCell>
                  {moment(apart.created_at).format('DD/MM/YYYY')}
                </TableCell>
                {status === 1 && <TableCell>{apart.total_rating}/5</TableCell>}
                {status === 0 && (
                  <TableCell>
                    {apart.status === 0 ? 'Đang chờ duyệt' : 'Bị từ chối'}
                  </TableCell>
                )}
                {status === 1 && (
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
                )}
                {status === 0 && (
                  <TableCell>
                    <IconButton>
                      <SvgIcon component={Edit} color="primary" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
