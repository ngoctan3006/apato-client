import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Post } from '../../redux/slices/postSlice';
import Apart from './Apart';

interface ApartListProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  data: Post[];
}

const ApartList: React.FC<ApartListProps> = (props) => {
  return (
    <Grid container p="40px 0 0 40px" spacing={2} alignItems="stretch">
      {props.data.length ? (
        props.data.map((item) => <Apart key={item.id} item={item} />)
      ) : (
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          Không có dữ liệu
        </Typography>
      )}
    </Grid>
  );
};

export default ApartList;
