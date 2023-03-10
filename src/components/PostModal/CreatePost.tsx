import { CancelOutlined } from '@mui/icons-material';
import {
  Button,
  Chip,
  Dialog,
  Grid,
  IconButton,
  ListItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createPost, getAllTags } from '../../api/post';
import { Input, Label } from '../../pages/LoginPage/styled';
import { getAllTag, selectTags, Tag } from '../../redux/slices/postSlice';
import {
  addPendingPost,
  endLoading,
  startLoading,
} from '../../redux/slices/sellerSlice';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  title: string;
  price: number;
  area: number;
  address: string;
  image: FileList;
  CMND: FileList;
  imgApart: FileList;
  'land-use': FileList;
  room_count: number;
  district: string;
  university: string;
  detail: string;
}

export const Required: React.FC = () => {
  return (
    <Typography
      component="span"
      sx={{
        color: '#d32f2f',
        fontSize: '12px',
        fontWeight: 'bold',
        ml: 0.5,
      }}
    >
      *
    </Typography>
  );
};

const CreatePostModal: React.FC<Props> = ({ open, onClose }) => {
  const tagsList = useSelector(selectTags);
  const [tags, setTags] = React.useState<Tag[]>(tagsList);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const dispatch = useDispatch();
  const [errorTag, setErrorTag] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleAdd = (tag: Tag) => () => {
    setSelectedTags((prev: Tag[]) => [...prev, tag]);
    setTags((tags: Tag[]) => tags.filter((t) => t.id !== tag.id));
  };

  const handleDelete = (tag: Tag) => () => {
    setSelectedTags((tags: Tag[]) => tags.filter((t) => t.id !== tag.id));
    setTags((prev: Tag[]) => [...prev, tag]);
  };

  const loadAllTags = async () => {
    try {
      const { data } = await getAllTags();
      dispatch(getAllTag(data));
    } catch (error: any) {}
  };

  const submitPost = async (data: FormValues) => {
    if (selectedTags.length === 0) {
      setErrorTag(true);
      return;
    }

    const postData = new FormData();
    postData.append('title', data.title);
    postData.append('detail', data.detail);
    postData.append('price', data.price.toString());
    postData.append('room_count', data.room_count.toString());
    postData.append('district', 'Hai Ba Trung');
    postData.append('university', 'HUST');
    postData.append('address', data.address);
    postData.append('area', data.area.toString());
    for (let i = 0; i < data.image.length; i++) {
      postData.append('file', data.image[i]);
    }
    postData.append('file', data.CMND[0]);
    postData.append('file', data.imgApart[0]);
    postData.append('file', data['land-use'][0]);
    for (let i = 0; i < selectedTags.length; i++) {
      postData.append('tags', selectedTags[i].id.toString());
    }

    try {
      dispatch(startLoading());
      const { data } = await createPost(postData);
      dispatch(addPendingPost(data));
      toast.success('????ng t???i th??nh c??ng!');
      reset();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadAllTags();
  }, []);

  useEffect(() => {
    setTags(tagsList);
  }, [tagsList]);

  useEffect(() => {
    setErrorTag(false);
  }, [selectedTags]);

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 1000,
          bgcolor: '#fff',
          borderRadius: 5,
          padding: '32px 47px 34px 59px',
        },
      }}
      scroll="paper"
      open={open}
      onClose={onClose}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
        size="small"
        onClick={onClose}
      >
        <CancelOutlined />
      </IconButton>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        Y??u c???u ????ng t???i m???i
      </Typography>

      <form onSubmit={handleSubmit(submitPost)}>
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={6}>
            <Label>
              Ti??u ?????
              <Required />
            </Label>
            <Input
              size="small"
              type="text"
              fullWidth
              {...register('title', {
                required: true,
              })}
              error={!!errors.title}
              helperText={errors.title && 'Ban ch??a nh???p ti??u ?????'}
            />
            <Label>
              ?????a ch???
              <Required />
            </Label>
            <Input
              size="small"
              type="text"
              fullWidth
              {...register('address', {
                required: true,
              })}
              error={!!errors.address}
              helperText={errors.address && 'B???n ch??a nh???p ?????a ch???'}
            />
            <Label>
              Di???n t??ch
              <Required />
            </Label>
            <Input
              size="small"
              type="number"
              fullWidth
              {...register('area', {
                required: true,
              })}
              error={!!errors.area}
              helperText={errors.area && 'B???n ch??a nh???p di???n t??ch'}
            />
            <Label>
              S??? ph??ng
              <Required />
            </Label>
            <Input
              size="small"
              type="number"
              fullWidth
              {...register('room_count', {
                required: true,
              })}
              error={!!errors.room_count}
              helperText={errors.room_count && 'B???n ch??a nh???p s??? ph??ng'}
            />
            <Label>
              Gi?? thu??
              <Required />
            </Label>
            <Input
              size="small"
              type="number"
              fullWidth
              {...register('price', {
                required: true,
              })}
              error={!!errors.price}
              helperText={errors.price && 'B???n ch??a nh???p gi?? thu??'}
            />
          </Grid>
          <Grid item xs={6}>
            <Label>
              ???nh ch???p gi???i thi???u ph??ng
              <Required />
            </Label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register('image')}
            />
            <Label>
              Tags
              <Required />
            </Label>
            <Paper
              sx={{
                display: selectedTags.length ? 'flex' : 'none',
                flexWrap: 'wrap',
                listStyle: 'none',
                border: '1px solid #e2e8f0',
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {selectedTags.map((tag) => {
                return (
                  <ListItem
                    key={tag.id}
                    sx={{
                      width: 'fit-content',
                      p: 1,
                    }}
                  >
                    <Chip
                      label={tag.tag_name}
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
              {tags.map((tag) => (
                <Button
                  onClick={handleAdd(tag)}
                  key={tag.id}
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    fontSize: 12,
                    mr: 1,
                    mb: 1,
                  }}
                  color="secondary"
                >
                  {tag.tag_name}
                </Button>
              ))}
            </Stack>
            {errorTag && (
              <Typography
                sx={{
                  color: '#d32f2f',
                  fontStyle: 'italic',
                  fontSize: 12,
                }}
              >
                B???n ch??a ch???n tag
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Label>
              M?? t???
              <Required />
            </Label>
            <Input
              size="small"
              type="text"
              multiline
              minRows={3}
              maxRows={4}
              fullWidth
              {...register('detail', {
                required: true,
              })}
              error={!!errors.detail}
              helperText={errors.detail && 'B???n ch??a nh???p m?? t???'}
            />
          </Grid>
          <Grid item xs={12}>
            <Label
              sx={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Minh ch???ng
            </Label>
            <Typography
              sx={{
                textAlign: 'center',
                fontStyle: 'italic',
                fontSize: 14,
              }}
            >
              ????? x??c th???c th??ng tin ph??ng b???n ????ng t???i l?? ch??nh x??c, vui l??ng
              cung c???p ???nh ch???p c??c lo???i gi???y t??? sau
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Label>
              Ch???ng minh nh??n d??n
              <Required />
            </Label>
            <input type="file" accept="image/*" {...register('CMND')} />
          </Grid>
          <Grid item xs={4}>
            <Label>
              M???t ti???n c??n nh??, k??m bi???n ?????a ch???
              <Required />
            </Label>
            <input type="file" accept="image/*" {...register('imgApart')} />
          </Grid>
          <Grid item xs={4}>
            <Label>
              Gi???y s??? h???u nh?? ?????t
              <Required />
            </Label>
            <input type="file" accept="image/*" {...register('land-use')} />
          </Grid>

          <Grid item xs={4} mx="auto">
            <Stack mt={2} direction="row" spacing={4} justifyContent="center">
              <Button
                sx={{ textTransform: 'none' }}
                variant="outlined"
                color="error"
                fullWidth
                onClick={onClose}
              >
                H???y
              </Button>
              <Button
                sx={{ textTransform: 'none' }}
                type="submit"
                variant="outlined"
                fullWidth
              >
                G???i y??u c???u
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default CreatePostModal;
