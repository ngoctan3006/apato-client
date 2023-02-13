import { Box, styled } from '@mui/material';

export const DataGridBox = styled(Box)({
  margin: '40px 0 0 0',
  height: '80vh',
  '& .MuiDataGrid-root': {
    border: 'none',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: 'none',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#a4a9fc',
    borderBottom: 'none',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: 'none',
    backgroundColor: '#a4a9fc',
  },
});
