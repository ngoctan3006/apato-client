import { FilterAltOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  ListItem,
  MenuItem,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

export interface TagData {
  id: number;
  label: string;
}

const tagsList = [
  { id: 1, label: 'Tiện nghi' },
  { id: 2, label: 'Giá rẻ' },
  { id: 3, label: 'Tối giản' },
  { id: 4, label: 'Cho phép thú nuôi' },
  { id: 5, label: 'Yên Tĩnh' },
  { id: 6, label: 'Có nơi để xe' },
  { id: 7, label: 'Hiện đại' },
  { id: 8, label: 'Phòng mới' },
  { id: 9, label: 'Phòng nhiều người' },
  { id: 10, label: 'Phòng đơn' },
];

const Input = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: 12,
  },
  '& label.Mui-focused': {
    color: '#b772ff',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#9854df',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#b772ff',
    },
  },
});

const FilterMenu: React.FC = () => {
  const [tags, setTags] = React.useState<TagData[]>([]);

  const handleAdd = (tag: TagData) => () => {
    setTags((tags) => [...tags, tag]);
    tagsList.splice(tagsList.indexOf(tag), 1);
  };

  const handleDelete = (tag: TagData) => () => {
    setTags((tags) => tags.filter((t) => t.id !== tag.id));
    tagsList.push(tag);
  };

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <FilterAltOutlined
            sx={{
              fontSize: 16,
              color: '#ccc',
              mr: 1,
            }}
          />
          <Typography variant="h6">Filter</Typography>
        </Stack>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
          }}
          color="secondary"
        >
          Apply
        </Button>
      </Stack>

      <Divider sx={{ mt: 1, mb: 1 }} />

      <Box>
        <Typography fontSize={14} variant="h6">
          Room area (m2)
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <Typography fontSize={12} variant="h6" fontWeight={400}>
              Min
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography fontSize={12} variant="h6" fontWeight={400}>
              Max
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Input type="number" size="small" />
          </Grid>
          <Grid item xs={2}>
            <Typography textAlign="center" fontSize={16} variant="h6">
              ~
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Input type="number" size="small" />
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Typography fontSize={14} variant="h6">
          Price (VND)
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <Typography fontSize={12} variant="h6" fontWeight={400}>
              Min
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography fontSize={12} variant="h6" fontWeight={400}>
              Max
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Input type="number" size="small" />
          </Grid>
          <Grid item xs={2}>
            <Typography textAlign="center" fontSize={16} variant="h6">
              ~
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Input type="number" size="small" />
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Typography fontSize={14} variant="h6">
          Location
        </Typography>
        <Typography fontSize={12} variant="h6" fontWeight={400}>
          District
        </Typography>
        <Input fullWidth select size="small">
          <MenuItem
            sx={{
              fontSize: 12,
            }}
          >
            All
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: 12,
            }}
          >
            Hai Ba Trung
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: 12,
            }}
          >
            Cau Giay
          </MenuItem>
        </Input>
      </Box>

      <Box mt={2}>
        <Typography fontSize={14} variant="h6">
          University
        </Typography>
        <Input fullWidth select size="small">
          <MenuItem
            sx={{
              fontSize: 12,
            }}
          >
            All
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: 12,
            }}
          >
            Hanoi University of Science and Technology
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: 12,
            }}
          >
            Vietnam National University - Hanoi
          </MenuItem>
        </Input>
      </Box>

      <Box mt={2}>
        <Typography fontSize={14} variant="h6">
          Tags
        </Typography>
        <Paper
          sx={{
            display: tags.length ? 'flex' : 'none',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            border: '1px solid #e2e8f0',
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {tags.map((tag) => {
            return (
              <ListItem key={tag.id}>
                <Chip
                  label={tag.label}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onDelete={handleDelete(tag)}
                />
              </ListItem>
            );
          })}
        </Paper>
        <Stack direction="row" flexWrap="wrap" mt={1}>
          {tagsList.map((tag) => (
            <Button
              onClick={handleAdd(tag)}
              key={tag.id}
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontSize: 12,
                mr: 1,
                mb: 1,
              }}
              color="secondary"
            >
              {tag.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default FilterMenu;
