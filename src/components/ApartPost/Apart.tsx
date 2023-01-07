import { Star } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ApartModel } from '../../model/ApartModel';
import { numberWithCommas } from '../../utils/utils';

interface ApartListItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  item: ApartModel;
}

const Apart: React.FC<ApartListItemProps> = (props) => {
  const { item } = props;
  const navigate = useNavigate();

  return (
    <Grid item xl={3} md={4} xs={6}>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: '10px',
          boxShadow: '0 0 20px 0 rgb(112 121 138 / 18%)',
          '&:hover': {
            border: '1px solid #b772ff',
          },
        }}
      >
        <CardActionArea onClick={() => navigate(`/apart-detail/${item.id}`)}>
          <CardMedia
            component="img"
            height="140"
            image={item.image[0]}
            alt={item.title}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.address}
            </Typography>
            <Stack pt={3} direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <SvgIcon sx={{ color: yellow[700] }} component={Star} />
                <Typography variant="body2" color="text.secondary">
                  {Math.round(item.total_rating)} / 5
                </Typography>
              </Stack>
              <Typography variant="body1">
                {numberWithCommas(Number(item.price))} VND
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Apart;
